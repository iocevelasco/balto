const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate } = require('../middlewares/authMiddleware');

// Import controllers
const {
  getUserFavorites,
  toggleFavorite,
  checkFavoriteStatus,
  updateFavoriteNotes,
  toggleFavoriteAlerts,
  removeFavorite,
  getFavoriteStats
} = require('../controllers/favoriteController');

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User favorite pets management
 */

// All favorite routes require authentication
router.use(authenticate);

// Get user's favorites
router.get('/', getUserFavorites);

// Get favorite statistics
router.get('/stats', getFavoriteStats);

// Toggle favorite status for a pet
router.post('/:petId', toggleFavorite);

// Check if pet is favorited
router.get('/:petId/check', checkFavoriteStatus);

// Update favorite notes
router.put('/:favoriteId/notes', updateFavoriteNotes);

// Toggle favorite alerts
router.put('/:favoriteId/alerts', toggleFavoriteAlerts);

// Remove favorite
router.delete('/:favoriteId', removeFavorite);

module.exports = router; 