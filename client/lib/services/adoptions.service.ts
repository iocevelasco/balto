import { apiRequest, PaginatedResponse } from '../api-client';
import { Adoption } from '../types';

export interface AdoptionApplicationData {
  petId: string;
  experience: string;
  livingSpace: string;
  otherPets: boolean;
  children: boolean;
  workSchedule: string;
  reason: string;
  references?: {
    name: string;
    phone: string;
    relationship: string;
  }[];
}

export interface AdoptionStats {
  total: number;
  pending: number;
  approved: number;
  completed: number;
  rejected: number;
  cancelled: number;
}

export const adoptionsService = {
  // Crear solicitud de adopción
  createAdoptionApplication: async (applicationData: AdoptionApplicationData): Promise<Adoption> => {
    const response = await apiRequest.post<Adoption>('/adoptions', applicationData);
    return response.data.data;
  },

  // Obtener todas las adopciones (para refugios/admin)
  getAdoptions: async (params?: {
    status?: Adoption['status'];
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Adoption>> => {
    const response = await apiRequest.get<PaginatedResponse<Adoption>>('/adoptions', params);
    return response.data.data;
  },

  // Obtener adopción por ID
  getAdoptionById: async (id: string): Promise<Adoption> => {
    const response = await apiRequest.get<Adoption>(`/adoptions/${id}`);
    return response.data.data;
  },

  // Obtener mis solicitudes de adopción (para usuarios)
  getMyAdoptions: async (): Promise<Adoption[]> => {
    const response = await apiRequest.get<Adoption[]>('/adoptions/my');
    return response.data.data;
  },

  // Actualizar estado de adopción (para refugios)
  updateAdoptionStatus: async (
    id: string, 
    status: Adoption['status'], 
    notes?: string
  ): Promise<Adoption> => {
    const response = await apiRequest.put<Adoption>(`/adoptions/${id}/status`, {
      status,
      notes,
    });
    return response.data.data;
  },

  // Programar visita
  scheduleVisit: async (
    id: string,
    visitData: {
      date: string;
      time: string;
      location: string;
    }
  ): Promise<Adoption> => {
    const response = await apiRequest.put<Adoption>(`/adoptions/${id}/schedule-visit`, visitData);
    return response.data.data;
  },

  // Completar adopción
  completeAdoption: async (id: string, adoptionDate: string): Promise<Adoption> => {
    const response = await apiRequest.put<Adoption>(`/adoptions/${id}/complete`, {
      adoptionDate,
    });
    return response.data.data;
  },

  // Cancelar adopción
  cancelAdoption: async (id: string, reason: string): Promise<Adoption> => {
    const response = await apiRequest.put<Adoption>(`/adoptions/${id}/cancel`, {
      reason,
    });
    return response.data.data;
  },

  // Obtener estadísticas de adopción (para refugios)
  getAdoptionStats: async (): Promise<AdoptionStats> => {
    const response = await apiRequest.get<AdoptionStats>('/adoptions/stats');
    return response.data.data;
  },
}; 