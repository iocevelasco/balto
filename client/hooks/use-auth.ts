import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/lib/services/auth.service';
import { LoginCredentials, RegisterData, User } from '@/lib/types';
import { clearAllQueries } from '@/lib/query-client';

// Hook para obtener el usuario actual
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: authService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('auth_token'),
  });
};

// Hook para login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Actualizar cache del usuario actual
      queryClient.setQueryData(['auth', 'currentUser'], data.user);
      // Invalidar todas las queries para refrescar datos
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Error en login:', error);
    },
  });
};

// Hook para login con Google
export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idToken: string) => authService.googleSignIn(idToken),
    onSuccess: (data) => {
      // Actualizar cache del usuario actual
      queryClient.setQueryData(['auth', 'currentUser'], data.user);
      // Invalidar todas las queries para refrescar datos
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Error en login con Google:', error);
    },
  });
};

// Hook para registro
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
    onSuccess: (data) => {
      // Actualizar cache del usuario actual
      queryClient.setQueryData(['auth', 'currentUser'], data.user);
      // Invalidar todas las queries para refrescar datos
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Error en registro:', error);
    },
  });
};

// Hook para logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Limpiar todas las queries del cache
      clearAllQueries();
      // Redirigir a la página de inicio
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('Error en logout:', error);
      // Limpiar cache incluso si hay error
      clearAllQueries();
    },
  });
};

// Hook para verificar token
export const useVerifyToken = () => {
  return useQuery({
    queryKey: ['auth', 'verifyToken'],
    queryFn: authService.verifyToken,
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: false,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('auth_token'),
  });
};

// Hook para solicitar reset de contraseña
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => authService.requestPasswordReset(email),
    onError: (error) => {
      console.error('Error al solicitar reset de contraseña:', error);
    },
  });
};

// Hook para reset de contraseña
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      authService.resetPassword(token, newPassword),
    onError: (error) => {
      console.error('Error al resetear contraseña:', error);
    },
  });
};

// Hook para cambiar contraseña
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(currentPassword, newPassword),
    onError: (error) => {
      console.error('Error al cambiar contraseña:', error);
    },
  });
};

// Hook para verificar email
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onError: (error) => {
      console.error('Error al verificar email:', error);
    },
  });
};

// Hook para reenviar email de verificación
export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: authService.resendVerificationEmail,
    onError: (error) => {
      console.error('Error al reenviar email de verificación:', error);
    },
  });
};

// Hook personalizado para verificar si el usuario está autenticado
export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useCurrentUser();
  return {
    isAuthenticated: !!user,
    user,
    isLoading,
  };
}; 