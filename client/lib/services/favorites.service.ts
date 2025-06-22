import { apiRequest } from '../api-client';
import { Favorite, Pet } from '../types';

export const favoritesService = {
  // Obtener favoritos del usuario
  getFavorites: async (): Promise<Favorite[]> => {
    const response = await apiRequest.get<Favorite[]>('/favorites');
    return response.data.data;
  },

  // Agregar mascota a favoritos
  addToFavorites: async (petId: string): Promise<Favorite> => {
    const response = await apiRequest.post<Favorite>('/favorites', { petId });
    return response.data.data;
  },

  // Remover mascota de favoritos
  removeFromFavorites: async (petId: string): Promise<void> => {
    await apiRequest.delete(`/favorites/${petId}`);
  },

  // Verificar si una mascota está en favoritos
  isFavorite: async (petId: string): Promise<boolean> => {
    try {
      const response = await apiRequest.get<{ isFavorite: boolean }>(`/favorites/${petId}/check`);
      return response.data.data.isFavorite;
    } catch {
      return false;
    }
  },

  // Obtener mascotas favoritas con detalles completos
  getFavoritePets: async (): Promise<Pet[]> => {
    const response = await apiRequest.get<Pet[]>('/favorites/pets');
    return response.data.data;
  },

  // Limpiar todos los favoritos
  clearFavorites: async (): Promise<void> => {
    await apiRequest.delete('/favorites/clear');
  },
}; 