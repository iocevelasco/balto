import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/providers/query-provider"
import { LanguageSelector } from "@/components/language-selector"
import { AuthProvider } from "@/components/providers/auth-provider"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PetMatch - Adopción Responsable",
  description: "Encuentra tu compañero perfecto y dale un hogar a una mascota que lo necesita",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <QueryProvider>
              {/* Navigation with Language Selector */}
              <nav className="fixed top-4 right-4 z-50">
                <LanguageSelector showText />
              </nav>
              {children}
              <Toaster />
            </QueryProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
