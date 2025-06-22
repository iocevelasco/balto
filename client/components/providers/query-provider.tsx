'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Crear una instancia única del QueryClient por componente
  const [queryClient] = useState(
    () =>
      new QueryClient({
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
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
} 