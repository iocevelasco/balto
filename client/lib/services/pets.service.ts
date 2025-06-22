import { apiRequest, PaginatedResponse } from '../api-client';
import { Pet, PetFormData, SearchParams } from '../types';

export const petsService = {
  // Obtener todas las mascotas con filtros y paginación
  getPets: async (params?: SearchParams): Promise<PaginatedResponse<Pet>> => {
    const response = await apiRequest.get<PaginatedResponse<Pet>>('/pets', params);
    return response.data.data;
  },

  // Obtener mascotas destacadas
  getFeaturedPets: async (): Promise<Pet[]> => {
    const response = await apiRequest.get<Pet[]>('/pets/featured');
    return response.data.data;
  },

  // Obtener una mascota por ID
  getPetById: async (id: string): Promise<Pet> => {
    const response = await apiRequest.get<Pet>(`/pets/${id}`);
    return response.data.data;
  },

  // Crear una nueva mascota (solo refugios)
  createPet: async (petData: PetFormData): Promise<Pet> => {
    const response = await apiRequest.post<Pet>('/pets', petData);
    return response.data.data;
  },

  // Actualizar una mascota (solo refugios)
  updatePet: async (id: string, petData: Partial<PetFormData>): Promise<Pet> => {
    const response = await apiRequest.put<Pet>(`/pets/${id}`, petData);
    return response.data.data;
  },

  // Eliminar una mascota (solo refugios)
  deletePet: async (id: string): Promise<void> => {
    await apiRequest.delete(`/pets/${id}`);
  },

  // Subir imágenes de mascota
  uploadPetImages: async (id: string, images: FormData): Promise<Pet> => {
    // Para FormData, usamos el cliente axios directamente
    const response = await apiRequest.post<Pet>(`/pets/${id}/images`, images);
    return response.data.data;
  },

  // Actualizar estado de mascota
  updatePetStatus: async (id: string, status: Pet['status']): Promise<Pet> => {
    const response = await apiRequest.put<Pet>(`/pets/${id}/status`, { status });
    return response.data.data;
  },

  // Obtener mascotas del refugio actual
  getMyPets: async (): Promise<Pet[]> => {
    const response = await apiRequest.get<Pet[]>('/pets/my/pets');
    return response.data.data;
  },

  // Buscar mascotas por texto
  searchPets: async (query: string, filters?: SearchParams['filters']): Promise<Pet[]> => {
    const response = await apiRequest.get<Pet[]>('/pets/search', {
      q: query,
      ...filters,
    });
    return response.data.data;
  },

  // Obtener mascotas similares
  getSimilarPets: async (id: string): Promise<Pet[]> => {
    const response = await apiRequest.get<Pet[]>(`/pets/${id}/similar`);
    return response.data.data;
  },

  // Reportar mascota
  reportPet: async (id: string, reason: string, description?: string): Promise<void> => {
    await apiRequest.post(`/pets/${id}/report`, { reason, description });
  },
}; 