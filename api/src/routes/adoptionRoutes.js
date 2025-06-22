const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Adoption application management
 */

// Apply authentication to all adoption routes
router.use(authenticate);

// User routes for adoption applications
router.post('/', (req, res) => {
  res.json({ message: 'Submit adoption application - TODO: Implement' });
});

router.get('/my-applications', (req, res) => {
  res.json({ message: 'Get my adoption applications - TODO: Implement' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get adoption application by ID - TODO: Implement' });
});

router.put('/:id/cancel', (req, res) => {
  res.json({ message: 'Cancel adoption application - TODO: Implement' });
});

// Shelter routes for managing applications
router.get('/shelter/applications', authorize('shelter', 'admin'), (req, res) => {
  res.json({ message: 'Get shelter adoption applications - TODO: Implement' });
});

router.put('/:id/status', authorize('shelter', 'admin'), (req, res) => {
  res.json({ message: 'Update adoption status - TODO: Implement' });
});

router.post('/:id/schedule-meeting', authorize('shelter', 'admin'), (req, res) => {
  res.json({ message: 'Schedule meeting - TODO: Implement' });
});

router.post('/:id/home-visit', authorize('shelter', 'admin'), (req, res) => {
  res.json({ message: 'Schedule home visit - TODO: Implement' });
});

// Admin routes
router.get('/', authorize('admin'), (req, res) => {
  res.json({ message: 'Get all adoptions - TODO: Implement' });
});

router.get('/statistics', authorize('admin'), (req, res) => {
  res.json({ message: 'Get adoption statistics - TODO: Implement' });
});

module.exports = router; 