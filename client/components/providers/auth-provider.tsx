"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/lib/types'
import { authService } from '@/lib/services/auth.service'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  loginWithGoogle: (idToken: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderCore({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const restoreSession = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setIsLoading(false)
        return
      }

      const isValid = await authService.verifyToken()
      if (!isValid) {
        localStorage.removeItem('auth_token')
        setIsLoading(false)
        return
      }

      const userData = await authService.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Error al restaurar sesión:', error)
      localStorage.removeItem('auth_token')
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (idToken: string) => {
    try {
      setIsLoading(true)
      const authData = await authService.googleSignIn(idToken)
      setUser(authData.user)
    } catch (error) {
      console.error('Error en loginWithGoogle:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('auth_token')
    }
  }

  const refreshUser = async () => {
    try {
      if (!localStorage.getItem('auth_token')) return
      const userData = await authService.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Error al refrescar usuario:', error)
      logout()
    }
  }

  useEffect(() => {
    restoreSession()
  }, [])

  // Verificar token periódicamente (cada 15 minutos)
  useEffect(() => {
    if (!user) return

    const interval = setInterval(async () => {
      try {
        const isValid = await authService.verifyToken()
        if (!isValid) {
          logout()
        }
      } catch (error) {
        console.error('Error verificando token:', error)
        logout()
      }
    }, 15 * 60 * 1000) // 15 minutos

    return () => clearInterval(interval)
  }, [user])

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithGoogle,
    logout,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProviderCore>
      {children}
    </AuthProviderCore>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
} 