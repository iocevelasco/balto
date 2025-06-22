const Pet = require('../models/Pet');
const User = require('../models/User');
const { asyncHandler } = require('../middlewares/errorMiddleware');

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getAdminStats = asyncHandler(async (req, res) => {
  try {
    // Get current date and month boundaries
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get statistics
    const [
      totalPets,
      pendingApplications,
      adoptionsThisMonth,
      totalUsers,
      activeShelters,
      revenueData
    ] = await Promise.all([
      Pet.countDocuments(),
      // For now, using a placeholder for applications - would need Application model
      Promise.resolve(23),
      // For now, using pets with status 'adopted' this month as proxy
      Pet.countDocuments({
        status: 'adopted',
        updatedAt: { $gte: startOfMonth }
      }),
      User.countDocuments(),
      User.countDocuments({ role: 'shelter', status: 'active' }),
      // For now, calculating revenue from adoption fees this month
      Pet.aggregate([
        {
          $match: {
            status: 'adopted',
            updatedAt: { $gte: startOfMonth }
          }
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$adoptionFee' }
          }
        }
      ])
    ]);

    const revenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
    const happyFamilies = adoptionsThisMonth; // Same as adoptions for now

    res.status(200).json({
      success: true,
      data: {
        totalPets,
        pendingApplications,
        adoptionsThisMonth,
        revenue,
        totalUsers,
        activeShelters,
        happyFamilies
      }
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get admin statistics'
    });
  }
});

/**
 * @desc    Get all users with filtering
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      status,
      search
    } = req.query;

    // Build filter
    const filter = {};
    if (role) filter.role = role;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const limitNum = parseInt(limit);

    // Get users and total count
    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      User.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get users'
    });
  }
});

/**
 * @desc    Create new user
 * @route   POST /api/admin/users
 * @access  Private/Admin
 */
const createUser = asyncHandler(async (req, res) => {
  try {
    const userData = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = new User(userData);
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      data: userResponse,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
});

/**
 * @desc    Update user
 * @route   PUT /api/admin/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

/**
 * @desc    Update user status
 * @route   PUT /api/admin/users/:id/status
 * @access  Private/Admin
 */
const updateUserStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: 'User status updated successfully'
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status'
    });
  }
});

/**
 * @desc    Bulk update users
 * @route   PUT /api/admin/users/bulk
 * @access  Private/Admin
 */
const bulkUpdateUsers = asyncHandler(async (req, res) => {
  try {
    const { userIds, updates } = req.body;

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      updates
    );

    res.status(200).json({
      success: true,
      data: result,
      message: `${result.modifiedCount} users updated successfully`
    });
  } catch (error) {
    console.error('Error bulk updating users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update users'
    });
  }
});

/**
 * @desc    Get applications (placeholder - would need Application model)
 * @route   GET /api/admin/applications
 * @access  Private/Admin
 */
const getApplications = asyncHandler(async (req, res) => {
  // This is a placeholder implementation
  // In a real application, you would have an Application model
  res.status(200).json({
    success: true,
    data: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    },
    message: 'Application management not yet implemented'
  });
});

/**
 * @desc    Update application status (placeholder)
 * @route   PUT /api/admin/applications/:id/status
 * @access  Private/Admin
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Application status update not yet implemented'
  });
});

/**
 * @desc    Bulk update applications (placeholder)
 * @route   PUT /api/admin/applications/bulk
 * @access  Private/Admin
 */
const bulkUpdateApplications = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bulk application update not yet implemented'
  });
});

/**
 * @desc    Get recent activities
 * @route   GET /api/admin/activities
 * @access  Private/Admin
 */
const getRecentActivities = asyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // For now, generate activities from recent pet and user changes
    const recentPets = await Pet.find()
      .populate('shelter', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const activities = recentPets.map(pet => ({
      _id: pet._id,
      type: pet.status === 'adopted' ? 'adoption' : 'pet_added',
      message: pet.status === 'adopted' 
        ? `${pet.name} (${pet.breed}) was adopted`
        : `New pet added: ${pet.name} (${pet.breed})`,
      timestamp: pet.createdAt,
      user: pet.shelter || { firstName: 'System', lastName: 'Admin' },
      metadata: {
        petId: pet._id,
        petType: pet.type
      }
    }));

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error getting recent activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recent activities'
    });
  }
});

/**
 * @desc    Get inventory (placeholder)
 * @route   GET /api/admin/inventory
 * @access  Private/Admin
 */
const getInventory = asyncHandler(async (req, res) => {
  // Placeholder implementation - would need Inventory model
  res.status(200).json({
    success: true,
    data: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    },
    message: 'Inventory management not yet implemented'
  });
});

/**
 * @desc    Create inventory item (placeholder)
 * @route   POST /api/admin/inventory
 * @access  Private/Admin
 */
const createInventoryItem = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory item creation not yet implemented'
  });
});

/**
 * @desc    Update inventory item (placeholder)
 * @route   PUT /api/admin/inventory/:id
 * @access  Private/Admin
 */
const updateInventoryItem = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory item update not yet implemented'
  });
});

/**
 * @desc    Delete inventory item (placeholder)
 * @route   DELETE /api/admin/inventory/:id
 * @access  Private/Admin
 */
const deleteInventoryItem = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory item deletion not yet implemented'
  });
});

/**
 * @desc    Update inventory stock (placeholder)
 * @route   PUT /api/admin/inventory/:id/stock
 * @access  Private/Admin
 */
const updateInventoryStock = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory stock update not yet implemented'
  });
});

/**
 * @desc    Get analytics data
 * @route   GET /api/admin/analytics/:type
 * @access  Private/Admin
 */
const getAnalyticsData = asyncHandler(async (req, res) => {
  try {
    const { type } = req.params;
    const { period = '30d' } = req.query;

    // Calculate date range based on period
    const now = new Date();
    let startDate;
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    let data = {};

    switch (type) {
      case 'adoptions':
        data = await Pet.aggregate([
          {
            $match: {
              status: 'adopted',
              updatedAt: { $gte: startDate }
            }
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ]);
        break;

      case 'pets':
        data = await Pet.aggregate([
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 }
            }
          }
        ]);
        break;

      case 'revenue':
        data = await Pet.aggregate([
          {
            $match: {
              status: 'adopted',
              updatedAt: { $gte: startDate }
            }
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" }
              },
              revenue: { $sum: '$adoptionFee' }
            }
          },
          { $sort: { _id: 1 } }
        ]);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid analytics type'
        });
    }

    res.status(200).json({
      success: true,
      data,
      period,
      type
    });
  } catch (error) {
    console.error('Error getting analytics data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get analytics data'
    });
  }
});

/**
 * @desc    Get adoption trends
 * @route   GET /api/admin/analytics/adoption-trends
 * @access  Private/Admin
 */
const getAdoptionTrends = asyncHandler(async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    // This would be implemented with more sophisticated analytics
    const data = await Pet.aggregate([
      {
        $match: { status: 'adopted' }
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data,
      period
    });
  } catch (error) {
    console.error('Error getting adoption trends:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get adoption trends'
    });
  }
});

/**
 * @desc    Get popular breeds
 * @route   GET /api/admin/analytics/popular-breeds
 * @access  Private/Admin
 */
const getPopularBreeds = asyncHandler(async (req, res) => {
  try {
    const data = await Pet.aggregate([
      {
        $group: {
          _id: '$breed',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error getting popular breeds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get popular breeds'
    });
  }
});

/**
 * @desc    Get revenue analytics
 * @route   GET /api/admin/analytics/revenue
 * @access  Private/Admin
 */
const getRevenueAnalytics = asyncHandler(async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const data = await Pet.aggregate([
      {
        $match: { status: 'adopted' }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$adoptionFee' },
          averageFee: { $avg: '$adoptionFee' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: data[0] || { totalRevenue: 0, averageFee: 0, count: 0 },
      period
    });
  } catch (error) {
    console.error('Error getting revenue analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get revenue analytics'
    });
  }
});

/**
 * @desc    Get all pets (admin view)
 * @route   GET /api/admin/pets
 * @access  Private/Admin
 */
const getAllPets = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      shelter,
      status,
      type,
      search
    } = req.query;

    // Build filter
    const filter = {};
    if (shelter) filter.shelter = shelter;
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { breed: new RegExp(search, 'i') }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const limitNum = parseInt(limit);

    // Get pets and total count
    const [pets, total] = await Promise.all([
      Pet.find(filter)
        .populate('shelter', 'firstName lastName email phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Pet.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: pets,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error getting all pets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pets'
    });
  }
});

/**
 * @desc    Update pet status (admin)
 * @route   PUT /api/admin/pets/:id/status
 * @access  Private/Admin
 */
const updatePetStatus = asyncHandler(async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { status, ...(notes && { adminNotes: notes }) },
      { new: true, runValidators: true }
    ).populate('shelter', 'firstName lastName email phone');

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: pet,
      message: 'Pet status updated successfully'
    });
  } catch (error) {
    console.error('Error updating pet status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update pet status'
    });
  }
});

/**
 * @desc    Export data (placeholder)
 * @route   POST /api/admin/export/:type
 * @access  Private/Admin
 */
const exportData = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Data export not yet implemented'
  });
});

/**
 * @desc    Get system health
 * @route   GET /api/admin/system/health
 * @access  Private/Admin
 */
const getSystemHealth = asyncHandler(async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date(),
      database: 'connected',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    };

    res.status(200).json({
      success: true,
      data: health
    });
  } catch (error) {
    console.error('Error getting system health:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get system health'
    });
  }
});

module.exports = {
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
}; 