const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile management
 */

// Apply authentication to all user routes
router.use(authenticate);

// User profile routes
router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile - TODO: Implement' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile - TODO: Implement' });
});

router.post('/change-password', (req, res) => {
  res.json({ message: 'Change password - TODO: Implement' });
});

router.post('/upload-avatar', (req, res) => {
  res.json({ message: 'Upload avatar - TODO: Implement' });
});

// Admin only routes
router.get('/', authorize('admin'), (req, res) => {
  res.json({ message: 'Get all users - TODO: Implement' });
});

router.get('/:id', authorize('admin'), (req, res) => {
  res.json({ message: 'Get user by ID - TODO: Implement' });
});

router.put('/:id/status', authorize('admin'), (req, res) => {
  res.json({ message: 'Update user status - TODO: Implement' });
});

module.exports = router; 