"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/admin-api-client';
import { AdminStats, AdminUser, Application, Activity, InventoryItem } from '@/types/admin';

// Query Keys
export const adminKeys = {
  all: ['admin'] as const,
  stats: () => [...adminKeys.all, 'stats'] as const,
  users: () => [...adminKeys.all, 'users'] as const,
  usersList: (params?: any) => [...adminKeys.users(), 'list', params] as const,
  applications: () => [...adminKeys.all, 'applications'] as const,
  applicationsList: (params?: any) => [...adminKeys.applications(), 'list', params] as const,
  activities: () => [...adminKeys.all, 'activities'] as const,
  activitiesList: (params?: any) => [...adminKeys.activities(), 'list', params] as const,
  inventory: () => [...adminKeys.all, 'inventory'] as const,
  inventoryList: (params?: any) => [...adminKeys.inventory(), 'list', params] as const,
  analytics: () => [...adminKeys.all, 'analytics'] as const,
  analyticsData: (type: string, period?: string) => [...adminKeys.analytics(), type, period] as const,
};

// Dashboard Stats Hook
export const useAdminStats = () => {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: () => adminAPI.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};

// User Management Hooks
export const useAdminUsers = (params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: adminKeys.usersList(params),
    queryFn: () => adminAPI.getUsers(params),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminAPI.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdminUser> }) =>
      adminAPI.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminAPI.updateUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

// Application Management Hooks
export const useAdminApplications = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  petType?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: adminKeys.applicationsList(params),
    queryFn: () => adminAPI.getApplications(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: string; notes?: string }) =>
      adminAPI.updateApplicationStatus(id, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.applications() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
};

// Activity Feed Hooks
export const useRecentActivities = (limit?: number) => {
  return useQuery({
    queryKey: adminKeys.activitiesList({ limit }),
    queryFn: () => adminAPI.getRecentActivities(limit),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
  });
};

// Inventory Management Hooks
export const useInventory = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: adminKeys.inventoryList(params),
    queryFn: () => adminAPI.getInventory(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateInventoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminAPI.createInventoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.inventory() });
    },
  });
};

export const useUpdateInventoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InventoryItem> }) =>
      adminAPI.updateInventoryItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.inventory() });
    },
  });
};

export const useDeleteInventoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminAPI.deleteInventoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.inventory() });
    },
  });
};

export const useUpdateInventoryStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity, operation }: { id: string; quantity: number; operation: 'add' | 'remove' | 'set' }) =>
      adminAPI.updateInventoryStock(id, quantity, operation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.inventory() });
    },
  });
};

// Analytics Hooks
export const useAnalyticsData = (type: 'adoptions' | 'applications' | 'revenue' | 'pets', period?: string) => {
  return useQuery({
    queryKey: adminKeys.analyticsData(type, period),
    queryFn: () => adminAPI.getAnalyticsData(type, period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAdoptionTrends = (period: string = '30d') => {
  return useQuery({
    queryKey: [...adminKeys.analytics(), 'adoption-trends', period],
    queryFn: () => adminAPI.getAdoptionTrends(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePopularBreeds = (period: string = '30d') => {
  return useQuery({
    queryKey: [...adminKeys.analytics(), 'popular-breeds', period],
    queryFn: () => adminAPI.getPopularBreeds(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRevenueAnalytics = (period: string = '30d') => {
  return useQuery({
    queryKey: [...adminKeys.analytics(), 'revenue', period],
    queryFn: () => adminAPI.getRevenueAnalytics(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Pet Management (Admin perspective)
export const useAdminPets = (params?: {
  page?: number;
  limit?: number;
  shelter?: string;
  status?: string;
  type?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: [...adminKeys.all, 'admin-pets', params],
    queryFn: () => adminAPI.getAllPets(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdatePetStatusAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: string; notes?: string }) =>
      adminAPI.updatePetStatus(id, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
};

// Bulk Operations
export const useBulkUpdateUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userIds, updates }: { userIds: string[]; updates: Partial<AdminUser> }) =>
      adminAPI.bulkUpdateUsers(userIds, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

export const useBulkUpdateApplications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationIds, status, notes }: { applicationIds: string[]; status: string; notes?: string }) =>
      adminAPI.bulkUpdateApplications(applicationIds, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.applications() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
};

// Utility Hooks
export const useExportData = () => {
  return useMutation({
    mutationFn: ({ type, format, filters }: { type: string; format: 'csv' | 'xlsx'; filters?: any }) =>
      adminAPI.exportData(type, format, filters),
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: [...adminKeys.all, 'system-health'],
    queryFn: () => adminAPI.getSystemHealth(),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};

// Re-export types for convenience
export type { AdminStats, AdminUser, Application, Activity, InventoryItem }; 