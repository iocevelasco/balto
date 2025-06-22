"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Globe } from "lucide-react"
import { useTranslations, getAvailableLocales } from "@/lib/i18n"

interface LanguageSelectorProps {
  showText?: boolean
  variant?: "default" | "ghost" | "outline"
}

export function LanguageSelector({ showText = false, variant = "ghost" }: LanguageSelectorProps) {
  const { locale, changeLocale } = useTranslations()
  const availableLocales = getAvailableLocales()
  const currentLocale = availableLocales.find(l => l.code === locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="sm" className="flex items-center space-x-1">
          <Globe className="w-4 h-4" />
          {showText && currentLocale && (
            <>
              <span className="text-sm">{currentLocale.flag}</span>
              <span className="text-sm">{currentLocale.name}</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
          {!showText && currentLocale && (
            <span className="text-sm">{currentLocale.flag}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {availableLocales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption.code}
            onClick={() => changeLocale(localeOption.code)}
            className={`flex items-center space-x-2 cursor-pointer ${
              locale === localeOption.code ? "bg-purple-50 text-purple-600" : ""
            }`}
          >
            <span>{localeOption.flag}</span>
            <span className="flex-1">{localeOption.name}</span>
            {locale === localeOption.code && (
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 