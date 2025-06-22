import { QueryClient } from '@tanstack/react-query';

// Configuración del QueryClient con opciones optimizadas
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo de vida de los datos en caché (5 minutos)
      staleTime: 5 * 60 * 1000,
      // Tiempo antes de que los datos se consideren obsoletos (10 minutos)
      gcTime: 10 * 60 * 1000,
      // Reintentos en caso de error
      retry: (failureCount, error: any) => {
        // No reintentar en errores 4xx (errores del cliente)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Máximo 3 reintentos para otros errores
        return failureCount < 3;
      },
      // Delay entre reintentos (exponencial)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch automático cuando la ventana vuelve a tener foco
      refetchOnWindowFocus: false,
      // Refetch automático cuando se reconecta a internet
      refetchOnReconnect: true,
    },
    mutations: {
      // Reintentos para mutaciones
      retry: 1,
      // Callback global para errores en mutaciones
      onError: (error: any) => {
        console.error('Error en mutación:', error);
        // Aquí puedes agregar notificaciones toast globales
      },
    },
  },
});

// Función para invalidar queries relacionadas con una entidad
export const invalidateQueries = {
  pets: () => queryClient.invalidateQueries({ queryKey: ['pets'] }),
  pet: (id: string) => queryClient.invalidateQueries({ queryKey: ['pets', id] }),
  users: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  user: (id: string) => queryClient.invalidateQueries({ queryKey: ['users', id] }),
  adoptions: () => queryClient.invalidateQueries({ queryKey: ['adoptions'] }),
  shelters: () => queryClient.invalidateQueries({ queryKey: ['shelters'] }),
  favorites: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  auth: () => queryClient.invalidateQueries({ queryKey: ['auth'] }),
};

// Función para limpiar todas las queries (útil para logout)
export const clearAllQueries = () => {
  queryClient.clear();
};

export default queryClient; 