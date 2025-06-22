import { useAuth } from '@/components/providers/auth-provider'

// Hook simplificado que mantiene compatibilidad con el código existente
export function useAuthSimple() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  
  return {
    user,
    isAuthenticated,
    isLoading,
    signOut: logout,
  }
}

// Re-exportar el hook completo para uso avanzado
export { useAuth } from '@/components/providers/auth-provider' 