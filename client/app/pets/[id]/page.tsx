"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { SocialShare } from "@/components/social-share"
import {
  ArrowLeft,
  Heart,
  MapPin,
  Calendar,
  Weight,
  Ruler,
  Shield,
  MessageCircle,
  Phone,
  Star,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { usePet } from "@/hooks/use-pets"
import { useIsFavorite, useToggleFavorite } from "@/hooks/use-favorites"
import { useTranslations } from "@/lib/i18n"

export default function PetDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const params = useParams()
  const petId = params.id as string
  const { t, formatMessage } = useTranslations()

  // TanStack Query hooks
  const { data: petResponse, isLoading, error } = usePet(petId)
  const { data: isFavorite = false } = useIsFavorite(petId)
  const toggleFavorite = useToggleFavorite()

  // La respuesta del API viene envuelta en { data: Pet, ... }.
  // Extraemos el objeto real de la mascota.
  const petData = (petResponse as any)?.data || petResponse || null

  // Normalizar imágenes: obtener el `url` cuando sea un objeto o usar la cadena directamente
  const images: string[] = petData && Array.isArray(petData.images) && petData.images.length > 0
    ? petData.images.map((img: any) => typeof img === 'string' ? img : img.url)
    : ["/placeholder.svg"]

  // Extraer los años de edad (puede venir como número o como objeto { years, months })
  const petAgeYears = (() => {
    if (!petData) return 0
    // El backend puede enviar age como número o como objeto { years, months }
    if (typeof petData.age === 'number') return petData.age
    if (petData.age && typeof petData.age.years === 'number') return petData.age.years
    return 0
  })()

  // Asegurar personalidad sea un arreglo
  const personality: string[] = Array.isArray(petData?.personality) ? petData.personality : []

  // Corregir el índice si se queda fuera de rango (puede pasar al cambiar de mascota)
  const safeImageIndex = Math.min(currentImageIndex, images.length - 1)

  const handleToggleFavorite = () => {
    toggleFavorite.mutate({ petId, isFavorite })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.pets.loadingPets}</p>
        </div>
      </div>
    )
  }

  if (error || !petData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{t.pets.errorLoadingPets}</p>
          <Link href="/">
            <Button>{t.navigation.home}</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Generate the current URL for sharing
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://petmatch.com/pets/${petId}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.common.back}
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleToggleFavorite}
                disabled={toggleFavorite.isPending}
                title={isFavorite ? t.pets.removeFromFavorites : t.pets.addToFavorites}
              >
                <Heart 
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`} 
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Pet Images */}
        <Card className="mb-6 overflow-hidden">
          <div className="relative">
            <img
              src={images[safeImageIndex]}
              alt={petData.name}
              className="w-full h-80 object-cover"
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === safeImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
            {petData.featured && (
              <Badge className="absolute top-4 left-4 bg-yellow-500">
                {t.pets.featured}
              </Badge>
            )}
          </div>
        </Card>

        {/* Pet Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{petData.name}</h1>
              <span className="text-2xl font-bold text-purple-600">
                ${petData.adoptionFee}
              </span>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                {petData.location?.city
                  ? `${petData.location.city}${petData.location.state ? ", " + petData.location.state : ""}`
                  : t.pets.locationNotSpecified}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-gray-700">{t.pets.age}</div>
                <div className="text-xs text-gray-500">
                  {petAgeYears} {t.pets.years}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Ruler className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-sm font-medium text-gray-700">{t.pets.size}</div>
                <div className="text-xs text-gray-500">
                  {t.pets[petData.size as keyof typeof t.pets] || petData.size}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Weight className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-sm font-medium text-gray-700">{t.pets.gender}</div>
                <div className="text-xs text-gray-500">
                  {t.pets[petData.gender as keyof typeof t.pets] || petData.gender}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                {formatMessage(t.pets.aboutPet, { name: petData.name })}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{petData.description}</p>
            </div>

            {personality.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">{t.pets.personality}</h3>
                <div className="flex flex-wrap gap-2">
                  {personality.map((trait: string) => (
                    <Badge 
                      key={trait} 
                      variant="outline" 
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              {t.pets.healthInfo}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    petData.healthInfo.vaccinated ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-600">{t.pets.vaccinated}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    petData.healthInfo.spayedNeutered ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-600">{t.pets.spayedNeutered}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    petData.healthInfo.microchipped ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-600">{t.pets.microchipped}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">{t.pets.recentCheckup}</span>
              </div>
            </div>
            {petData.healthInfo.medicalHistory && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">{petData.healthInfo.medicalHistory}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shelter Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={petData.shelter?.profileImage?.url || "/placeholder.svg"} />
                  <AvatarFallback>
                    {petData.shelter?.firstName?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">
                      {petData.shelter ? `${petData.shelter.firstName} ${petData.shelter.lastName}` : "Shelter"}
                    </h3>
                    {petData.shelter?.role === 'shelter' && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {t.shelters.verified}
                      </Badge>
                    )}
                  </div>
                  {petData.shelter?.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{petData.shelter.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{petData.shelter?.phone || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{petData.shelter?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{petData.shelter?.address?.street || ""} {petData.shelter?.address?.city || ""} {petData.shelter?.address?.state || ""}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href={`/adopt/${petId}`} className="block">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              {t.pets.requestAdoption}
            </Button>
          </Link>
          <Button variant="outline" className="w-full">
            {t.pets.contactShelter}
          </Button>
        </div>
      </div>
    </div>
  )
}

