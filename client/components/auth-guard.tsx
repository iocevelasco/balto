"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { User } from "lucide-react"
import { useAuth as useGoogleAuth } from "@/components/providers/auth-provider"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  fallback?: React.ReactNode
}

export function AuthGuard({ children, requireAuth = false, fallback }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useGoogleAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Inicia Sesión Requerido</h2>
              <p className="text-gray-600 mb-6">
                Por favor inicia sesión con Google para acceder a esta función y comenzar tu viaje de adopción de mascotas.
              </p>
              <div className="space-y-3">
                <Link href="/auth">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Iniciar Sesión con Google
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Explorar Mascotas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
