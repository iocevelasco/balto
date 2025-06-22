"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/lib/i18n"
import { useAuth } from "@/components/providers/auth-provider"
import { GoogleLoginButton } from "@/components/google-login-button"

export default function AuthPage() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { t } = useTranslations()
  
  // Usar el hook de auth simplificado
  const { loginWithGoogle, isLoading } = useAuth()

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        setError("")
        await loginWithGoogle(credentialResponse.credential)
        setSuccess(t.auth.loginSuccess)
        // Redirigir después de login exitoso
        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
      } catch (err: any) {
        setError(err.message || t.auth.loginFailed)
      }
    }
  }

  const handleGoogleError = () => {
    setError("Error al iniciar sesión con Google")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐾</span>
              </div>
              <span className="font-bold text-xl text-gray-800">PetMatch</span>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.auth.welcomeTitle}</h1>
          <p className="text-gray-600">{t.auth.welcomeSubtitle}</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t.auth.signIn}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Login */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Inicia sesión con tu cuenta de Google para acceder a todas las funciones
              </p>
              <GoogleLoginButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                disabled={isLoading}
              />
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-center">
                {t.home.whyCreateAccount}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t.home.saveFavorites}</li>
                <li>• {t.home.trackApplications}</li>
                <li>• {t.home.getRecommendations}</li>
                <li>• {t.home.communicateWithShelters}</li>
              </ul>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center text-xs text-gray-500">
              {t.auth.byContining}{" "}
              <Link href="/terms" className="text-purple-600 hover:underline">
                {t.auth.termsOfService}
              </Link>{" "}
              {t.common.and}{" "}
              <Link href="/privacy" className="text-purple-600 hover:underline">
                {t.auth.privacyPolicy}
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Continue without account */}
        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Continuar sin cuenta
            </Button>
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            Puedes explorar mascotas sin crear una cuenta
          </p>
        </div>
      </div>
    </div>
  )
}
