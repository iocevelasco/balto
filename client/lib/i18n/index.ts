"use client"

import { useState, useEffect } from "react"

// Export types
export type { Locale, Translations } from './types'

// Import translations from separate files
import { es } from './ES'
import { en } from './ENG'
import { pt } from './PT'
import type { Locale } from './types'

// All translations
export const translations = {
  es,
  en,
  pt,
}

// Default locale (Spanish)
export const defaultLocale = "es" as const

// Function to detect browser locale with Spanish as fallback
function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  const browserLang = navigator.language.slice(0, 2)
  const supportedLocales = Object.keys(translations) as Locale[]
  
  return supportedLocales.includes(browserLang as Locale) 
    ? (browserLang as Locale) 
    : defaultLocale
}

// Hook for translations
export function useTranslations() {
  // Initialize with default locale and its translations immediately
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  
  useEffect(() => {
    // Only run locale detection on client side
    if (typeof window !== 'undefined') {
      const browserLocale = detectBrowserLocale()
      
      // Also check for saved locale preference
      const savedLocale = localStorage.getItem('locale') as Locale
      const finalLocale = savedLocale && savedLocale in translations ? savedLocale : browserLocale
      
      if (finalLocale !== defaultLocale) {
        setLocale(finalLocale)
      }
    }
  }, [])

  const t = translations[locale] // Return the translation object directly

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  return { 
    t, // Return the translation object directly
    locale, 
    setLocale: changeLocale,
    availableLocales: Object.keys(translations) as Locale[],
    formatMessage // Export the formatMessage function
  }
}

// Format message with variables
export function formatMessage(message: string, variables: Record<string, string | number>): string {
  return Object.entries(variables).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{${key}}`, "g"), String(value))
  }, message)
}

// Helper function to get available locales
export function getAvailableLocales(): { code: Locale; name: string; flag: string }[] {
  return [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
  ]
}
