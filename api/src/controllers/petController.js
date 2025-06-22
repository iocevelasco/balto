const Pet = require('../models/Pet');
const User = require('../models/User');
const { asyncHandler } = require('../middlewares/errorMiddleware');
const { validateRequest } = require('../utils/validation');
const { 
  createPetSchema, 
  updatePetSchema, 
  petSearchSchema 
} = require('../validations/petValidation');

/**
 * @desc    Get all pets with search and filtering
 * @route   GET /api/pets
 * @access  Public
 */
const getPets = asyncHandler(async (req, res) => {
  const validatedQuery = validateRequest(petSearchSchema, req.query);
  
  const {
    page,
    limit,
    type,
    breed,
    size,
    gender,
    status = 'available',
    minAge,
    maxAge,
    goodWithChildren,
    goodWithDogs,
    goodWithCats,
    vaccinated,
    spayedNeutered,
    microchipped,
    maxFee,
    personality,
    search,
    featured,
    shelter,
    latitude,
    longitude,
    radius,
    sortBy,
    sortOrder
  } = validatedQuery;

  // Build filter object
  const filter = { status };

  if (type) filter.type = type;
  if (breed) filter.breed = new RegExp(breed, 'i');
  if (size) filter.size = size;
  if (gender) filter.gender = gender;
  if (featured !== undefined) filter.featured = featured;
  if (shelter) filter.shelter = shelter;

  // Age filtering
  if (minAge !== undefined || maxAge !== undefined) {
    filter.$or = [];
    if (minAge !== undefined) {
      filter.$or.push({ 'age.years': { $gte: minAge } });
    }
    if (maxAge !== undefined) {
      filter.$or.push({ 'age.years': { $lte: maxAge } });
    }
  }

  // Good with filtering
  if (goodWithChildren) filter['goodWith.children'] = true;
  if (goodWithDogs) filter['goodWith.dogs'] = true;
  if (goodWithCats) filter['goodWith.cats'] = true;

  // Health filtering
  if (vaccinated) filter['healthInfo.vaccinated'] = true;
  if (spayedNeutered) filter['healthInfo.spayedNeutered'] = true;
  if (microchipped) filter['healthInfo.microchipped'] = true;

  // Fee filtering
  if (maxFee !== undefined) filter.adoptionFee = { $lte: maxFee };

  // Personality filtering
  if (personality) {
    const personalityArray = personality.split(',').map(p => p.trim());
    filter.personality = { $in: personalityArray };
  }

  // Text search
  if (search) {
    filter.$text = { $search: search };
  }

  // Location-based filtering
  if (latitude && longitude) {
    filter['location.coordinates'] = {
      $near: {
        $geometry: { type: 'Point', coordinates: [longitude, latitude] },
        $maxDistance: radius * 1000 // Convert km to meters
      }
    };
  }

  // Build sort object
  const sort = {};
  if (search) {
    sort.score = { $meta: 'textScore' };
  }
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const [pets, total] = await Promise.all([
    Pet.find(filter)
      .populate('shelter', 'firstName lastName email phone profileImage address')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Pet.countDocuments(filter)
  ]);

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  res.status(200).json({
    success: true,
    data: pets,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev
    },
    filters: {
      type,
      breed,
      size,
      gender,
      status,
      featured,
      search
    }
  });
});

/**
 * @desc    Get featured pets
 * @route   GET /api/pets/featured
 * @access  Public
 */
const getFeaturedPets = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 6;
  
  const pets = await Pet.find({ 
    status: 'available', 
    featured: true 
  })
    .populate('shelter', 'firstName lastName email phone profileImage')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    data: pets,
    count: pets.length
  });
});

/**
 * @desc    Get pet by ID
 * @route   GET /api/pets/:id
 * @access  Public
 */
const getPetById = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id)
    .populate('shelter', 'firstName lastName email phone profileImage address role')
    .lean();

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  // Increment view count if user is not the shelter owner
  if (!req.user || req.user._id.toString() !== pet.shelter._id.toString()) {
    await Pet.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
  }

  res.status(200).json({
    success: true,
    data: pet
  });
});

/**
 * @desc    Create new pet
 * @route   POST /api/pets
 * @access  Private (Shelter/Admin)
 */
const createPet = asyncHandler(async (req, res) => {
  const validatedData = validateRequest(createPetSchema, req.body);

  const petData = {
    ...validatedData,
    shelter: req.user._id
  };

  const pet = await Pet.create(petData);
  
  await pet.populate('shelter', 'firstName lastName email phone');

  res.status(201).json({
    success: true,
    data: pet,
    message: 'Pet created successfully'
  });
});

/**
 * @desc    Update pet
 * @route   PUT /api/pets/:id
 * @access  Private (Shelter/Admin)
 */
const updatePet = asyncHandler(async (req, res) => {
  const validatedData = validateRequest(updatePetSchema, req.body);

  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  // Check ownership (unless admin)
  if (req.user.role !== 'admin' && pet.shelter.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this pet'
    });
  }

  const updatedPet = await Pet.findByIdAndUpdate(
    req.params.id,
    validatedData,
    { new: true, runValidators: true }
  ).populate('shelter', 'firstName lastName email phone');

  res.status(200).json({
    success: true,
    data: updatedPet,
    message: 'Pet updated successfully'
  });
});

/**
 * @desc    Delete pet
 * @route   DELETE /api/pets/:id
 * @access  Private (Shelter/Admin)
 */
const deletePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  // Check ownership (unless admin)
  if (req.user.role !== 'admin' && pet.shelter.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this pet'
    });
  }

  await Pet.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Pet deleted successfully'
  });
});

/**
 * @desc    Update pet status
 * @route   PUT /api/pets/:id/status
 * @access  Private (Shelter/Admin)
 */
const updatePetStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!['available', 'pending', 'adopted', 'unavailable'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }

  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }

  // Check ownership (unless admin)
  if (req.user.role !== 'admin' && pet.shelter.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this pet'
    });
  }

  pet.status = status;
  await pet.save();

  res.status(200).json({
    success: true,
    data: pet,
    message: 'Pet status updated successfully'
  });
});

/**
 * @desc    Get pets by shelter
 * @route   GET /api/pets/my/pets
 * @access  Private (Shelter)
 */
const getMyPets = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;
  const search = req.query.search;

  const filter = { shelter: req.user._id };
  
  if (status) filter.status = status;
  if (search) filter.$text = { $search: search };

  const skip = (page - 1) * limit;

  const [pets, total] = await Promise.all([
    Pet.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Pet.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    data: pets,
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
 * @desc    Get pet categories with counts
 * @route   GET /api/pets/categories
 * @access  Public
 */
const getPetCategories = asyncHandler(async (req, res) => {
  const categories = await Pet.aggregate([
    { $match: { status: 'available' } },
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const categoryMap = {
    dog: { name: 'Dogs', icon: '🐕', description: 'Find your loyal canine companion' },
    cat: { name: 'Cats', icon: '🐱', description: 'Discover your perfect feline friend' },
    bird: { name: 'Birds', icon: '🦜', description: 'Find your feathered companion' },
    rabbit: { name: 'Rabbits', icon: '🐰', description: 'Adopt your gentle hopping friend' },
    hamster: { name: 'Hamsters', icon: '🐹', description: 'Small and adorable companions' },
    fish: { name: 'Fish', icon: '🐠', description: 'Aquatic friends for your home' },
    reptile: { name: 'Reptiles', icon: '🦎', description: 'Unique scaled companions' },
    other: { name: 'Other Pets', icon: '🐾', description: 'Various other amazing pets' }
  };

  const formattedCategories = categories.map(cat => ({
    id: cat._id,
    type: cat._id,
    count: cat.count,
    ...categoryMap[cat._id]
  }));

  res.status(200).json({
    success: true,
    data: formattedCategories
  });
});

module.exports = {
  getPets,
  getFeaturedPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  updatePetStatus,
  getMyPets,
  getPetCategories
}; 