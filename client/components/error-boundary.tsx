"use client"

import { useEffect } from 'react'
import { setupGoogleAuthErrorInterceptor, setupWindowErrorHandler } from '@/lib/error-handlers'

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configurar interceptores de errores para Google Auth
    const cleanupConsoleInterceptor = setupGoogleAuthErrorInterceptor()
    const cleanupWindowHandler = setupWindowErrorHandler()

    // Función de limpieza
    return () => {
      cleanupConsoleInterceptor?.()
      cleanupWindowHandler?.()
    }
  }, [])

  return <>{children}</>
} 