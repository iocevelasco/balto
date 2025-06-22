// Configuración para Google Auth que evita errores de FedCM
export const GOOGLE_AUTH_CONFIG = {
  // Deshabilitar FedCM para evitar errores de AbortError
  use_fedcm_for_prompt: false,
  
  // Configuración del botón
  button: {
    theme: 'outline' as const,
    size: 'large' as const,
    width: '300',
    shape: 'rectangular' as const,
    logo_alignment: 'left' as const,
    text: 'continue_with' as const,
  },
  
  // Configuración de comportamiento
  auto_select: false,
  cancel_on_tap_outside: true,
  
  // Configuración de One Tap (deshabilitado para evitar errores)
  disable_one_tap: true,
  
  // Configuración de prompt
  prompt_parent_id: undefined, // No usar contenedor específico
  
  // Configuración de contexto
  context: 'signin' as const,
  
  // Configuración de itp_support
  itp_support: true,
}

// Función para limpiar listeners de Google Auth
export const cleanupGoogleAuth = () => {
  try {
    if (typeof window !== 'undefined' && window.google?.accounts?.id?.cancel) {
      window.google.accounts.id.cancel()
    }
  } catch (error) {
    // Ignorar errores de cleanup
    console.debug('Google Auth cleanup error (ignorable):', error)
  }
}

// Función para verificar si Google Auth está disponible
export const isGoogleAuthAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.google !== 'undefined' && 
         typeof window.google.accounts !== 'undefined' &&
         typeof window.google.accounts.id !== 'undefined'
} 