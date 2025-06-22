const Favorite = require('../models/Favorite');
const Pet = require('../models/Pet');
const { asyncHandler } = require('../middlewares/errorMiddleware');

/**
 * @desc    Get user's favorite pets
 * @route   GET /api/favorites
 * @access  Private
 */
const getUserFavorites = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status || 'available';

  const favorites = await Favorite.getUserFavoritesWithPets(req.user._id, {
    page,
    limit,
    status
  });

  const total = await Favorite.countDocuments({ user: req.user._id });
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    data: favorites,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
});

/**
 * @desc    Toggle favorite status for a pet
 * @route   POST /api/favorites/:petId
 * @access  Private
 */
const toggleFavorite = asyncHandler(async (req, res) => {
  const petId = req.params.petId;
  const userId = req.user._id;

  // Check if pet exists
  const pet = await Pet.findById(petId);
  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  const result = await Favorite.toggleFavorite(userId, petId);

  res.status(200).json({
    success: true,
    data: result.favorite,
    message: result.action === 'added' ? 'Pet added to favorites' : 'Pet removed from favorites',
    action: result.action
  });
});

/**
 * @desc    Check if pet is favorited by user
 * @route   GET /api/favorites/:petId/check
 * @access  Private
 */
const checkFavoriteStatus = asyncHandler(async (req, res) => {
  const petId = req.params.petId;
  const userId = req.user._id;

  const favorite = await Favorite.findOne({ user: userId, pet: petId });
  const isFavorite = !!favorite;

  res.status(200).json({
    success: true,
    data: {
      isFavorite,
      favoriteId: favorite ? favorite._id : null
    }
  });
});

/**
 * @desc    Update favorite notes
 * @route   PUT /api/favorites/:favoriteId/notes
 * @access  Private
 */
const updateFavoriteNotes = asyncHandler(async (req, res) => {
  const { notes } = req.body;
  const favoriteId = req.params.favoriteId;

  const favorite = await Favorite.findOne({ 
    _id: favoriteId, 
    user: req.user._id 
  });

  if (!favorite) {
    return res.status(404).json({
      success: false,
      message: 'Favorite not found'
    });
  }

  favorite.notes = notes;
  await favorite.save();

  res.status(200).json({
    success: true,
    data: favorite,
    message: 'Notes updated successfully'
  });
});

/**
 * @desc    Toggle favorite alerts
 * @route   PUT /api/favorites/:favoriteId/alerts
 * @access  Private
 */
const toggleFavoriteAlerts = asyncHandler(async (req, res) => {
  const { alertsEnabled } = req.body;
  const favoriteId = req.params.favoriteId;

  const favorite = await Favorite.findOne({ 
    _id: favoriteId, 
    user: req.user._id 
  });

  if (!favorite) {
    return res.status(404).json({
      success: false,
      message: 'Favorite not found'
    });
  }

  favorite.alertsEnabled = alertsEnabled;
  await favorite.save();

  res.status(200).json({
    success: true,
    data: favorite,
    message: `Alerts ${alertsEnabled ? 'enabled' : 'disabled'} for this pet`
  });
});

/**
 * @desc    Remove favorite
 * @route   DELETE /api/favorites/:favoriteId
 * @access  Private
 */
const removeFavorite = asyncHandler(async (req, res) => {
  const favoriteId = req.params.favoriteId;

  const favorite = await Favorite.findOneAndDelete({ 
    _id: favoriteId, 
    user: req.user._id 
  });

  if (!favorite) {
    return res.status(404).json({
      success: false,
      message: 'Favorite not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Pet removed from favorites'
  });
});

/**
 * @desc    Get favorite statistics
 * @route   GET /api/favorites/stats
 * @access  Private
 */
const getFavoriteStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const stats = await Favorite.aggregate([
    { $match: { user: userId } },
    {
      $lookup: {
        from: 'pets',
        localField: 'pet',
        foreignField: '_id',
        as: 'petDetails'
      }
    },
    { $unwind: '$petDetails' },
    {
      $group: {
        _id: '$petDetails.type',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  const totalFavorites = await Favorite.countDocuments({ user: userId });

  res.status(200).json({
    success: true,
    data: {
      total: totalFavorites,
      byType: stats
    }
  });
});

module.exports = {
  getUserFavorites,
  toggleFavorite,
  checkFavoriteStatus,
  updateFavoriteNotes,
  toggleFavoriteAlerts,
  removeFavorite,
  getFavoriteStats
}; 