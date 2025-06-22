"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { petsService } from '@/lib/services/pets.service';
import { PetFormData, SearchParams } from '@/lib/types';
import { invalidateQueries } from '@/lib/query-client';
import { petAPI, favoritesAPI } from '@/lib/api-client';

// Types
export interface Pet {
  _id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'fish' | 'reptile' | 'other';
  breed: string;
  age: {
    years: number;
    months: number;
  };
  ageString: string;
  gender: 'male' | 'female' | 'unknown';
  size: 'small' | 'medium' | 'large' | 'extra-large';
  weight?: number;
  color: string[];
  description: string;
  personality: string[];
  goodWith: {
    children: boolean;
    dogs: boolean;
    cats: boolean;
  };
  healthInfo: {
    vaccinated: boolean;
    spayedNeutered: boolean;
    microchipped: boolean;
    specialNeeds?: string;
    medications: string[];
  };
  images: Array<{
    url: string;
    publicId: string;
    isPrimary: boolean;
    caption?: string;
  }>;
  shelter: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    profileImage?: {
      url: string;
    };
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  status: 'available' | 'pending' | 'adopted' | 'unavailable';
  adoptionFee: number;
  location?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  views: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PetSearchParams {
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
}

export interface PetsResponse {
  success: boolean;
  data: Pet[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: any;
}

export interface Category {
  id: string;
  type: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

// Pet Query Keys
export const petKeys = {
  all: ['pets'] as const,
  lists: () => [...petKeys.all, 'list'] as const,
  list: (params: PetSearchParams) => [...petKeys.lists(), params] as const,
  details: () => [...petKeys.all, 'detail'] as const,
  detail: (id: string) => [...petKeys.details(), id] as const,
  featured: () => [...petKeys.all, 'featured'] as const,
  categories: () => [...petKeys.all, 'categories'] as const,
  myPets: () => [...petKeys.all, 'myPets'] as const,
};

// Favorite Query Keys
export const favoriteKeys = {
  all: ['favorites'] as const,
  lists: () => [...favoriteKeys.all, 'list'] as const,
  list: (params?: any) => [...favoriteKeys.lists(), params] as const,
  status: (petId: string) => [...favoriteKeys.all, 'status', petId] as const,
  stats: () => [...favoriteKeys.all, 'stats'] as const,
};

// Hook para obtener mascotas con filtros y paginación
export const usePets = (params?: PetSearchParams) => {
  return useQuery({
    queryKey: petKeys.list(params || {}),
    queryFn: () => petAPI.getPets(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook para obtener mascotas destacadas
export const useFeaturedPets = (limit?: number) => {
  return useQuery({
    queryKey: [...petKeys.featured(), limit],
    queryFn: () => petAPI.getFeaturedPets(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook para obtener una mascota por ID
export const usePet = (id: string) => {
  return useQuery({
    queryKey: petKeys.detail(id),
    queryFn: () => petAPI.getPetById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook para obtener categorías de mascotas
export const usePetCategories = () => {
  return useQuery({
    queryKey: petKeys.categories(),
    queryFn: () => petAPI.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook para obtener mis mascotas (para refugios)
export const useMyPets = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: [...petKeys.myPets(), params],
    queryFn: () => petAPI.getMyPets(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook para crear una mascota
export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: petAPI.createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petKeys.all });
    },
  });
};

// Hook para actualizar una mascota
export const useUpdatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      petAPI.updatePet(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: petKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: petKeys.all });
    },
  });
};

// Hook para eliminar una mascota
export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: petAPI.deletePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petKeys.all });
    },
  });
};

// Hook para subir imágenes de mascota
export const useUploadPetImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, images }: { id: string; images: FormData }) =>
      petsService.uploadPetImages(id, images),
    onSuccess: (updatedPet) => {
      // Actualizar cache específico de la mascota
      queryClient.setQueryData(['pets', updatedPet._id], updatedPet);
      // Invalidar queries relacionadas
      invalidateQueries.pet(updatedPet._id);
    },
    onError: (error) => {
      console.error('Error al subir imágenes:', error);
    },
  });
};

// Hook para actualizar estado de mascota
export const useUpdatePetStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      petAPI.updatePetStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: petKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: petKeys.all });
    },
  });
};

// Hook para buscar mascotas
export const useSearchPets = (query: string, filters?: SearchParams['filters']) => {
  return useQuery({
    queryKey: ['pets', 'search', query, filters],
    queryFn: () => petsService.searchPets(query, filters),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
};

// Hook para obtener mascotas similares
export const useSimilarPets = (id: string) => {
  return useQuery({
    queryKey: ['pets', id, 'similar'],
    queryFn: () => petsService.getSimilarPets(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para reportar mascota
export const useReportPet = () => {
  return useMutation({
    mutationFn: ({ id, reason, description }: { id: string; reason: string; description?: string }) =>
      petsService.reportPet(id, reason, description),
    onError: (error) => {
      console.error('Error al reportar mascota:', error);
    },
  });
};

// Favorite Hooks
export const useFavorites = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  return useQuery({
    queryKey: favoriteKeys.list(params),
    queryFn: () => favoritesAPI.getFavorites(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useIsFavorite = (petId: string) => {
  return useQuery({
    queryKey: favoriteKeys.status(petId),
    queryFn: () => favoritesAPI.checkFavoriteStatus(petId),
    enabled: !!petId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFavoriteStats = () => {
  return useQuery({
    queryKey: favoriteKeys.stats(),
    queryFn: () => favoritesAPI.getFavoriteStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Favorite Mutations
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ petId }: { petId: string; isFavorite?: boolean }) => 
      favoritesAPI.toggleFavorite(petId),
    onSuccess: (_, { petId }) => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.status(petId) });
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
    },
  });
};

export const useUpdateFavoriteNotes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ favoriteId, notes }: { favoriteId: string; notes: string }) => 
      favoritesAPI.updateFavoriteNotes(favoriteId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
    },
  });
};

export const useToggleFavoriteAlerts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ favoriteId, alertsEnabled }: { favoriteId: string; alertsEnabled: boolean }) => 
      favoritesAPI.toggleFavoriteAlerts(favoriteId, alertsEnabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: favoritesAPI.removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
    },
  });
}; 