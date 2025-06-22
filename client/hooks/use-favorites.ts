import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '@/lib/services/favorites.service';
import { invalidateQueries } from '@/lib/query-client';

// Hook para obtener favoritos del usuario
export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: favoritesService.getFavorites,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

// Hook para obtener mascotas favoritas con detalles completos
export const useFavoritePets = () => {
  return useQuery({
    queryKey: ['favorites', 'pets'],
    queryFn: favoritesService.getFavoritePets,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

// Hook para verificar si una mascota está en favoritos
export const useIsFavorite = (petId: string) => {
  return useQuery({
    queryKey: ['favorites', 'check', petId],
    queryFn: () => favoritesService.isFavorite(petId),
    enabled: !!petId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para agregar a favoritos
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: string) => favoritesService.addToFavorites(petId),
    onSuccess: (_, petId) => {
      // Actualizar cache de verificación
      queryClient.setQueryData(['favorites', 'check', petId], true);
      // Invalidar queries relacionadas
      invalidateQueries.favorites();
    },
    onError: (error) => {
      console.error('Error al agregar a favoritos:', error);
    },
  });
};

// Hook para remover de favoritos
export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: string) => favoritesService.removeFromFavorites(petId),
    onSuccess: (_, petId) => {
      // Actualizar cache de verificación
      queryClient.setQueryData(['favorites', 'check', petId], false);
      // Invalidar queries relacionadas
      invalidateQueries.favorites();
    },
    onError: (error) => {
      console.error('Error al remover de favoritos:', error);
    },
  });
};

// Hook para toggle favorito (agregar/remover)
export const useToggleFavorite = () => {
  const addToFavorites = useAddToFavorites();
  const removeFromFavorites = useRemoveFromFavorites();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ petId, isFavorite }: { petId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        await favoritesService.removeFromFavorites(petId);
        return false;
      } else {
        await favoritesService.addToFavorites(petId);
        return true;
      }
    },
    onSuccess: (newFavoriteStatus, { petId }) => {
      // Actualizar cache de verificación
      queryClient.setQueryData(['favorites', 'check', petId], newFavoriteStatus);
      // Invalidar queries relacionadas
      invalidateQueries.favorites();
    },
    onError: (error) => {
      console.error('Error al cambiar estado de favorito:', error);
    },
  });
};

// Hook para limpiar todos los favoritos
export const useClearFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesService.clearFavorites,
    onSuccess: () => {
      // Limpiar cache de favoritos
      queryClient.removeQueries({ queryKey: ['favorites'] });
      // Invalidar queries relacionadas
      invalidateQueries.favorites();
    },
    onError: (error) => {
      console.error('Error al limpiar favoritos:', error);
    },
  });
}; 