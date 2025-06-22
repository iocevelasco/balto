// Admin-related TypeScript interfaces
export interface AdminStats {
  totalPets: number;
  pendingApplications: number;
  adoptionsThisMonth: number;
  revenue: number;
  totalUsers: number;
  activeShelters: number;
  happyFamilies: number;
}

export interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'shelter' | 'adopter';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin?: string;
  profileImage?: {
    url: string;
  };
  shelterInfo?: {
    name: string;
    license: string;
  };
}

export interface Application {
  _id: string;
  pet: {
    _id: string;
    name: string;
    breed: string;
    type: string;
    images: Array<{ url: string; isPrimary: boolean }>;
  };
  adopter: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  applicationDate: string;
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Activity {
  _id: string;
  type: 'adoption' | 'application' | 'pet_added' | 'user_registered' | 'inventory';
  message: string;
  timestamp: string;
  user: {
    firstName: string;
    lastName: string;
  };
  metadata?: any;
}

export interface InventoryItem {
  _id: string;
  name: string;
  category: 'food' | 'medicine' | 'supplies' | 'toys' | 'equipment';
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  cost: number;
  supplier?: string;
  expiryDate?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
  lastUpdated: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
} 