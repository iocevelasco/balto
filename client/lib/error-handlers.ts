// Manejadores de errores específicos para Google Auth y FedCM

// Lista de errores de Google Auth que son seguros de ignorar
const IGNORABLE_GOOGLE_ERRORS = [
  'FedCM get() rejects with AbortError: signal is aborted without reason',
  'AbortError: signal is aborted without reason',
  'The operation was aborted',
  'FedCM',
  'GSI_LOGGER',
]

// Función para verificar si un error es ignorable
export const isIgnorableGoogleError = (error: string | Error): boolean => {
  const errorMessage = typeof error === 'string' ? error : error.message || error.toString()
  
  return IGNORABLE_GOOGLE_ERRORS.some(ignorableError => 
    errorMessage.includes(ignorableError)
  )
}

// Interceptor de errores de consola para Google Auth
export const setupGoogleAuthErrorInterceptor = () => {
  if (typeof window === 'undefined') return

  // Guardar la función original de console.error
  const originalConsoleError = window.console.error

  // Sobrescribir console.error para filtrar errores de Google Auth
  window.console.error = (...args) => {
    const errorMessage = args.join(' ')
    
    // Si es un error ignorable de Google Auth, no lo mostramos
    if (isIgnorableGoogleError(errorMessage)) {
      console.debug('Ignorando error de Google Auth:', errorMessage)
      return
    }
    
    // Para otros errores, usar la función original
    originalConsoleError.apply(window.console, args)
  }

  // Retornar función para restaurar console.error original
  return () => {
    window.console.error = originalConsoleError
  }
}

// Manejador de errores de ventana para Google Auth
export const setupWindowErrorHandler = () => {
  if (typeof window === 'undefined') return

  const errorHandler = (event: ErrorEvent) => {
    if (isIgnorableGoogleError(event.message)) {
      event.preventDefault()
      event.stopPropagation()
      console.debug('Ignorando error de ventana de Google Auth:', event.message)
      return false
    }
    return true
  }

  const promiseRejectionHandler = (event: PromiseRejectionEvent) => {
    const reason = event.reason?.message || event.reason?.toString() || 'Unknown error'
    if (isIgnorableGoogleError(reason)) {
      event.preventDefault()
      console.debug('Ignorando promesa rechazada de Google Auth:', reason)
      return
    }
  }

  window.addEventListener('error', errorHandler)
  window.addEventListener('unhandledrejection', promiseRejectionHandler)

  // Retornar función de limpieza
  return () => {
    window.removeEventListener('error', errorHandler)
    window.removeEventListener('unhandledrejection', promiseRejectionHandler)
  }
} 