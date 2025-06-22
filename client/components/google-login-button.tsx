"use client"

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { GOOGLE_AUTH_CONFIG, cleanupGoogleAuth, isGoogleAuthAvailable } from '@/lib/google-auth-config'

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: any) => void
  onError: () => void
  disabled?: boolean
  text?: string
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, config: any) => void
          prompt: (callback?: (notification: any) => void) => void
          cancel: () => void
        }
      }
    }
  }
}

export function GoogleLoginButton({ 
  onSuccess, 
  onError, 
  disabled = false,
  text = "Continuar con Google"
}: GoogleLoginButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    const initializeGoogle = () => {
      if (!isGoogleAuthAvailable() || isInitialized.current) return

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      if (!clientId) {
        console.error('Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable')
        onError()
        return
      }

      try {
        // Limpiar cualquier inicialización previa
        cleanupGoogleAuth()

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) => {
            if (response.credential) {
              onSuccess(response)
            } else {
              onError()
            }
          },
          ...GOOGLE_AUTH_CONFIG,
        })

        if (buttonRef.current) {
          window.google.accounts.id.renderButton(buttonRef.current, GOOGLE_AUTH_CONFIG.button)
        }

        isInitialized.current = true
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error)
        onError()
      }
    }

    // Esperar a que el script de Google se cargue
    if (window.google) {
      initializeGoogle()
    } else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = initializeGoogle
      script.onerror = () => {
        console.error('Failed to load Google Sign-In script')
        onError()
      }
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }

    return () => {
      cleanupGoogleAuth()
    }
  }, [onSuccess, onError])

  if (disabled) {
    return (
      <Button disabled className="w-full">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          <span>Iniciando sesión...</span>
        </div>
      </Button>
    )
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div ref={buttonRef} className="w-full flex justify-center" />
      <p className="text-xs text-gray-500 text-center">
        Al continuar, aceptas nuestros términos de servicio y política de privacidad
      </p>
    </div>
  )
} 