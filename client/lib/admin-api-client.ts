import { AdminStats, AdminUser, Application, Activity, InventoryItem } from '@/types/admin';

// Admin API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses with fallback to mock data
const handleResponse = async (response: Response, mockDataFallback?: any) => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      console.warn(`API request failed: ${response.status} ${response.statusText}`);
      if (mockDataFallback) {
        console.log('Falling back to mock data');
        return mockDataFallback;
      }
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.warn('API request error:', error);
    if (mockDataFallback) {
      console.log('Falling back to mock data due to error');
      return mockDataFallback;
    }
    throw error;
  }
};

// Admin API client
export const adminAPI = {
  // Dashboard Stats
  getStats: async (): Promise<AdminStats> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: getAuthHeaders(),
      });
      
      const data = await handleResponse(response, { success: true, data: adminAPI.getMockStats() });
      return data.data;
    } catch (error) {
      console.warn('Stats API failed, using mock data');
      return adminAPI.getMockStats();
    }
  },

  // User Management
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    search?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/admin/users?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, adminAPI.getMockUsers());
    } catch (error) {
      console.warn('Users API failed, using mock data');
      return adminAPI.getMockUsers();
    }
  },

  createUser: async (userData: Partial<AdminUser>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Create user API failed');
      throw error;
    }
  },

  updateUser: async (id: string, userData: Partial<AdminUser>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Update user API failed');
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Delete user API failed');
      throw error;
    }
  },

  updateUserStatus: async (id: string, status: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Update user status API failed');
      throw error;
    }
  },

  bulkUpdateUsers: async (userIds: string[], updates: Partial<AdminUser>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/bulk`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userIds, updates }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Bulk update users API failed');
      throw error;
    }
  },

  // Application Management
  getApplications: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    petType?: string;
    search?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/admin/applications?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, adminAPI.getMockApplications());
    } catch (error) {
      console.warn('Applications API failed, using mock data');
      return adminAPI.getMockApplications();
    }
  },

  updateApplicationStatus: async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/applications/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, notes }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Update application status API failed');
      throw error;
    }
  },

  bulkUpdateApplications: async (applicationIds: string[], status: string, notes?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/applications/bulk`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ applicationIds, status, notes }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Bulk update applications API failed');
      throw error;
    }
  },

  // Activity Feed
  getRecentActivities: async (limit?: number) => {
    try {
      const queryParams = limit ? `?limit=${limit}` : '';
      const response = await fetch(`${API_BASE_URL}/admin/activities${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, adminAPI.getMockActivities());
    } catch (error) {
      console.warn('Activities API failed, using mock data');
      return adminAPI.getMockActivities();
    }
  },

  // Inventory Management
  getInventory: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/admin/inventory?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, adminAPI.getMockInventory());
    } catch (error) {
      console.warn('Inventory API failed, using mock data');
      return adminAPI.getMockInventory();
    }
  },

  createInventoryItem: async (itemData: Partial<InventoryItem>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/inventory`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Create inventory item API failed');
      throw error;
    }
  },

  updateInventoryItem: async (id: string, itemData: Partial<InventoryItem>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/inventory/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Update inventory item API failed');
      throw error;
    }
  },

  deleteInventoryItem: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/inventory/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Delete inventory item API failed');
      throw error;
    }
  },

  updateInventoryStock: async (id: string, quantity: number, operation: 'add' | 'remove' | 'set') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/inventory/${id}/stock`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ quantity, operation }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Update inventory stock API failed');
      throw error;
    }
  },

  // Analytics
  getAnalyticsData: async (type: 'adoptions' | 'applications' | 'revenue' | 'pets', period?: string) => {
    try {
      const queryParams = period ? `?period=${period}` : '';
      const response = await fetch(`${API_BASE_URL}/admin/analytics/${type}${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, { success: true, data: [], period, type });
    } catch (error) {
      console.warn('Analytics API failed, using empty data');
      return { success: true, data: [], period, type };
    }
  },

  getAdoptionTrends: async (period: string = '30d') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/adoption-trends?period=${period}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, { success: true, data: [], period });
    } catch (error) {
      console.warn('Adoption trends API failed, using empty data');
      return { success: true, data: [], period };
    }
  },

  getPopularBreeds: async (period: string = '30d') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/popular-breeds?period=${period}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, { success: true, data: [] });
    } catch (error) {
      console.warn('Popular breeds API failed, using empty data');
      return { success: true, data: [] };
    }
  },

  getRevenueAnalytics: async (period: string = '30d') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/revenue?period=${period}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, { 
        success: true, 
        data: { totalRevenue: 0, averageFee: 0, count: 0 }, 
        period 
      });
    } catch (error) {
      console.warn('Revenue analytics API failed, using empty data');
      return { 
        success: true, 
        data: { totalRevenue: 0, averageFee: 0, count: 0 }, 
        period 
      };
    }
  },

  // Pet Management (Admin)
  getAllPets: async (params?: {
    page?: number;
    limit?: number;
    shelter?: string;
    status?: string;
    type?: string;
    search?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/admin/pets?${queryParams}`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, { success: true, data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } });
    } catch (error) {
      console.warn('Admin pets API failed, using empty data');
      return { success: true, data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } };
    }
  },

  updatePetStatus: async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/pets/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, notes }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Update pet status API failed');
      throw error;
    }
  },

  // Utility Functions
  exportData: async (type: string, format: 'csv' | 'xlsx', filters?: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/export/${type}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ format, filters }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.warn('Export data API failed');
      throw error;
    }
  },

  getSystemHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/system/health`, {
        headers: getAuthHeaders(),
      });
      
      return handleResponse(response, {
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date(),
          database: 'connected',
          uptime: 12345,
          memory: { used: 1234567, total: 9876543 },
          version: 'v16.0.0'
        }
      });
    } catch (error) {
      console.warn('System health API failed, using mock data');
      return {
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date(),
          database: 'connected',
          uptime: 12345,
          memory: { used: 1234567, total: 9876543 },
          version: 'v16.0.0'
        }
      };
    }
  },

  // Mock Data fallbacks (for development when API endpoints aren't ready)
  getMockStats: (): AdminStats => ({
    totalPets: 156,
    pendingApplications: 23,
    adoptionsThisMonth: 34,
    revenue: 4280,
    totalUsers: 1247,
    activeShelters: 15,
    happyFamilies: 890,
  }),

  getMockUsers: () => ({
    success: true,
    data: [
      {
        _id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@happypaws.org',
        phone: '+1 (555) 123-4567',
        role: 'admin' as const,
        status: 'active' as const,
        joinDate: '2023-06-15',
        lastLogin: '2024-01-22',
        profileImage: {
          url: '/placeholder.svg?height=40&width=40',
        },
      },
      {
        _id: '2',
        firstName: 'Mike',
        lastName: 'Chen',
        email: 'mike.c@happypaws.org',
        phone: '+1 (555) 234-5678',
        role: 'shelter' as const,
        status: 'active' as const,
        joinDate: '2023-08-20',
        lastLogin: '2024-01-22',
        shelterInfo: {
          name: 'Happy Paws Rescue',
          license: 'SPL-2023-001',
        },
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 25,
      totalPages: 3,
    },
  }),

  getMockApplications: () => ({
    success: true,
    data: [
      {
        _id: '1',
        pet: {
          _id: 'pet1',
          name: 'Luna',
          breed: 'Siberian Husky',
          type: 'dog',
          images: [{ url: '/placeholder.svg?height=100&width=100', isPrimary: true }],
        },
        adopter: {
          _id: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 987-6543',
        },
        status: 'pending' as const,
        applicationDate: '2024-01-20',
        notes: 'Experienced dog owner with large yard',
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 23,
      totalPages: 3,
    },
  }),

  getMockActivities: () => ({
    success: true,
    data: [
      {
        _id: '1',
        type: 'adoption' as const,
        message: 'Max (Golden Retriever) was adopted by the Johnson family',
        timestamp: '2024-01-22T14:30:00Z',
        user: {
          firstName: 'Sarah',
          lastName: 'Johnson',
        },
        metadata: {
          petId: 'pet123',
          adopterId: 'user456',
        },
      },
      {
        _id: '2',
        type: 'application' as const,
        message: 'New adoption application for Luna (Siberian Husky)',
        timestamp: '2024-01-22T10:15:00Z',
        user: {
          firstName: 'Mike',
          lastName: 'Chen',
        },
        metadata: {
          petId: 'pet789',
          applicationId: 'app123',
        },
      },
    ],
  }),

  getMockInventory: () => ({
    success: true,
    data: [
      {
        _id: '1',
        name: 'Premium Dog Food',
        category: 'food' as const,
        quantity: 45,
        unit: 'bags',
        minStock: 20,
        maxStock: 100,
        cost: 25.99,
        supplier: 'Pet Nutrition Co.',
        expiryDate: '2024-12-31',
        status: 'in_stock' as const,
        lastUpdated: '2024-01-20',
      },
      {
        _id: '2',
        name: 'Cat Litter',
        category: 'supplies' as const,
        quantity: 8,
        unit: 'boxes',
        minStock: 15,
        maxStock: 50,
        cost: 12.99,
        supplier: 'Clean Paws Inc.',
        status: 'low_stock' as const,
        lastUpdated: '2024-01-19',
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 85,
      totalPages: 9,
    },
  }),
}; 