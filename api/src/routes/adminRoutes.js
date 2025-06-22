const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Import controllers
const {
  getAdminStats,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  bulkUpdateUsers,
  getApplications,
  updateApplicationStatus,
  bulkUpdateApplications,
  getRecentActivities,
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateInventoryStock,
  getAnalyticsData,
  getAdoptionTrends,
  getPopularBreeds,
  getRevenueAnalytics,
  getAllPets,
  updatePetStatus,
  exportData,
  getSystemHealth
} = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin panel functionality
 */

// Apply authentication and admin authorization to all routes
router.use(authenticate);
router.use(authorize('admin'));

// Dashboard & Stats
router.get('/stats', getAdminStats);
router.get('/activities', getRecentActivities);
router.get('/system/health', getSystemHealth);

// User Management
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/status', updateUserStatus);
router.put('/users/bulk', bulkUpdateUsers);

// Application Management
router.get('/applications', getApplications);
router.put('/applications/:id/status', updateApplicationStatus);
router.put('/applications/bulk', bulkUpdateApplications);

// Inventory Management
router.get('/inventory', getInventory);
router.post('/inventory', createInventoryItem);
router.put('/inventory/:id', updateInventoryItem);
router.delete('/inventory/:id', deleteInventoryItem);
router.put('/inventory/:id/stock', updateInventoryStock);

// Analytics
router.get('/analytics/:type', getAnalyticsData);
router.get('/analytics/adoption-trends', getAdoptionTrends);
router.get('/analytics/popular-breeds', getPopularBreeds);
router.get('/analytics/revenue', getRevenueAnalytics);

// Pet Management (Admin View)
router.get('/pets', getAllPets);
router.put('/pets/:id/status', updatePetStatus);

// Utility Routes
router.post('/export/:type', exportData);

module.exports = router; 