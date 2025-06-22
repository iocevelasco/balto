const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - user
 *         - pet
 *       properties:
 *         _id:
 *           type: string
 *           description: Favorite ID
 *         user:
 *           type: string
 *           description: User ID
 *         pet:
 *           type: string
 *           description: Pet ID
 *         notes:
 *           type: string
 *           description: Personal notes about the pet
 *         alertsEnabled:
 *           type: boolean
 *           description: Whether to receive alerts about this pet
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: [true, 'Pet is required']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  alertsEnabled: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index to ensure unique user-pet combinations
favoriteSchema.index({ user: 1, pet: 1 }, { unique: true });

// Index for efficient queries
favoriteSchema.index({ user: 1, createdAt: -1 });
favoriteSchema.index({ pet: 1 });

// Static method to toggle favorite
favoriteSchema.statics.toggleFavorite = async function(userId, petId) {
  const existingFavorite = await this.findOne({ user: userId, pet: petId });
  
  if (existingFavorite) {
    await this.deleteOne({ _id: existingFavorite._id });
    return { action: 'removed', favorite: null };
  } else {
    const newFavorite = await this.create({ user: userId, pet: petId });
    return { action: 'added', favorite: newFavorite };
  }
};

// Static method to get user's favorites with pet details
favoriteSchema.statics.getUserFavoritesWithPets = function(userId, options = {}) {
  const { page = 1, limit = 10, status = 'available' } = options;
  const skip = (page - 1) * limit;
  
  return this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'pets',
        localField: 'pet',
        foreignField: '_id',
        as: 'petDetails'
      }
    },
    { $unwind: '$petDetails' },
    ...(status ? [{ $match: { 'petDetails.status': status } }] : []),
    {
      $lookup: {
        from: 'users',
        localField: 'petDetails.shelter',
        foreignField: '_id',
        as: 'shelterDetails'
      }
    },
    { $unwind: '$shelterDetails' },
    {
      $project: {
        _id: 1,
        notes: 1,
        alertsEnabled: 1,
        createdAt: 1,
        pet: '$petDetails',
        shelter: {
          _id: '$shelterDetails._id',
          firstName: '$shelterDetails.firstName',
          lastName: '$shelterDetails.lastName',
          email: '$shelterDetails.email',
          phone: '$shelterDetails.phone'
        }
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  ]);
};

module.exports = mongoose.model('Favorite', favoriteSchema); 