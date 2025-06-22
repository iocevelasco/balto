import { apiRequest } from '../api-client';
import { AuthUser, LoginCredentials, RegisterData, User } from '../types';

export const authService = {
  // Login de usuario
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    const response = await apiRequest.post<AuthUser>('/auth/login', credentials);
    
    // Guardar token en localStorage
    if (response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
    }
    
    return response.data.data;
  },

  // Login con Google
  googleSignIn: async (idToken: string): Promise<AuthUser> => {
    const response = await apiRequest.post<AuthUser>('/auth/google', { idToken });
    
    // Guardar token en localStorage
    if (response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
    }
    
    return response.data.data;
  },

  // Registro de usuario
  register: async (userData: RegisterData): Promise<AuthUser> => {
    const response = await apiRequest.post<AuthUser>('/auth/register', userData);
    
    // Guardar token en localStorage
    if (response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
    }
    
    return response.data.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await apiRequest.post('/auth/logout');
    } finally {
      // Limpiar token del localStorage
      localStorage.removeItem('auth_token');
    }
  },

  // Obtener perfil del usuario actual
  getCurrentUser: async (): Promise<User> => {
    const response = await apiRequest.get<{ user: User }>('/auth/me');
    return response.data.data.user;
  },

  // Verificar token
  verifyToken: async (): Promise<boolean> => {
    try {
      await apiRequest.get('/auth/verify');
      return true;
    } catch {
      return false;
    }
  },

  // Solicitar reset de contraseña
  requestPasswordReset: async (email: string): Promise<void> => {
    await apiRequest.post('/auth/forgot-password', { email });
  },

  // Reset de contraseña
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiRequest.post('/auth/reset-password', { token, password: newPassword });
  },

  // Cambiar contraseña
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiRequest.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  // Verificar email
  verifyEmail: async (token: string): Promise<void> => {
    await apiRequest.post('/auth/verify-email', { token });
  },

  // Reenviar email de verificación
  resendVerificationEmail: async (): Promise<void> => {
    await apiRequest.post('/auth/resend-verification');
  },
}; 