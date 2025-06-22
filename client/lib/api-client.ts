import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage (solo en el cliente)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores de autenticación
    if (error.response?.status === 401) {
      // Limpiar token inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // Redirigir a la página de autenticación genérica
        window.location.href = '/auth';
      }
    }
    
    // Manejo de errores de red
    if (!error.response) {
      console.error('Error de red:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Tipos para las respuestas del API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Funciones helper para las peticiones
export const apiRequest = {
  get: <T>(url: string, params?: any) => 
    apiClient.get<ApiResponse<T>>(url, { params }),
  
  post: <T>(url: string, data?: any) => 
    apiClient.post<ApiResponse<T>>(url, data),
  
  put: <T>(url: string, data?: any) => 
    apiClient.put<ApiResponse<T>>(url, data),
  
  delete: <T>(url: string) => 
    apiClient.delete<ApiResponse<T>>(url),
  
  patch: <T>(url: string, data?: any) => 
    apiClient.patch<ApiResponse<T>>(url, data),
};

export default apiClient;

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  // Safely access localStorage only on client side - fix token name consistency
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Pet API endpoints
export const petAPI = {
  // Get all pets with filtering and pagination
  getPets: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    breed?: string;
    size?: string;
    gender?: string;
    status?: string;
    featured?: boolean;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(
      `${API_BASE_URL}/pets?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Get featured pets
  getFeaturedPets: async (limit?: number) => {
    const queryParams = limit ? `?limit=${limit}` : '';
    const response = await fetch(
      `${API_BASE_URL}/pets/featured${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Get pet by ID
  getPetById: async (id: string) => {
    const response = await fetch(
      `${API_BASE_URL}/pets/${id}`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Get pet categories
  getCategories: async () => {
    const response = await fetch(
      `${API_BASE_URL}/pets/categories`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Create new pet (shelter only)
  createPet: async (petData: any) => {
    const response = await fetch(
      `${API_BASE_URL}/pets`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(petData),
      }
    );
    
    return handleResponse(response);
  },

  // Update pet (shelter only)
  updatePet: async (id: string, petData: any) => {
    const response = await fetch(
      `${API_BASE_URL}/pets/${id}`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(petData),
      }
    );
    
    return handleResponse(response);
  },

  // Delete pet (shelter only)
  deletePet: async (id: string) => {
    const response = await fetch(
      `${API_BASE_URL}/pets/${id}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Update pet status (shelter only)
  updatePetStatus: async (id: string, status: string) => {
    const response = await fetch(
      `${API_BASE_URL}/pets/${id}/status`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );
    
    return handleResponse(response);
  },

  // Get shelter's pets
  getMyPets: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(
      `${API_BASE_URL}/pets/my/pets?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },
};

// Favorites API endpoints
export const favoritesAPI = {
  // Get user's favorites
  getFavorites: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(
      `${API_BASE_URL}/favorites?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Toggle favorite status
  toggleFavorite: async (petId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/${petId}`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Check if pet is favorited
  checkFavoriteStatus: async (petId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/${petId}/check`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Update favorite notes
  updateFavoriteNotes: async (favoriteId: string, notes: string) => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/${favoriteId}/notes`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ notes }),
      }
    );
    
    return handleResponse(response);
  },

  // Toggle favorite alerts
  toggleFavoriteAlerts: async (favoriteId: string, alertsEnabled: boolean) => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/${favoriteId}/alerts`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ alertsEnabled }),
      }
    );
    
    return handleResponse(response);
  },

  // Remove favorite
  removeFavorite: async (favoriteId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/${favoriteId}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },

  // Get favorite statistics
  getFavoriteStats: async () => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/stats`,
      {
        headers: getAuthHeaders(),
      }
    );
    
    return handleResponse(response);
  },
};

// Auth API endpoints
export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    return handleResponse(response);
  },

  // Register
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'user' | 'shelter';
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return handleResponse(response);
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Logout
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  googleSignIn: async (idToken: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    
    return handleResponse(response);
  },
};

// Export all APIs
export const api = {
  pets: petAPI,
  favorites: favoritesAPI,
  auth: authAPI,
}; 