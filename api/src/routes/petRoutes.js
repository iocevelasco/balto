const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate, authorize, optionalAuth } = require('../middlewares/authMiddleware');

// Import controllers
const {
  getPets,
  getFeaturedPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  updatePetStatus,
  getMyPets,
  getPetCategories
} = require('../controllers/petController');

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management and search
 */

// Public routes (no authentication required)
router.get('/', optionalAuth, getPets);
router.get('/featured', getFeaturedPets);
router.get('/categories', getPetCategories);
router.get('/:id', optionalAuth, getPetById);

// Protected routes
router.use(authenticate);

// Shelter routes for managing pets
router.post('/', authorize('shelter', 'admin'), createPet);
router.put('/:id', authorize('shelter', 'admin'), updatePet);
router.delete('/:id', authorize('shelter', 'admin'), deletePet);
router.put('/:id/status', authorize('shelter', 'admin'), updatePetStatus);

// User routes
router.get('/my/pets', authorize('shelter'), getMyPets);

module.exports = router; 