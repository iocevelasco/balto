"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WhatsAppChat, WhatsAppFloatingButton } from "@/components/whatsapp-chat"
import { Heart, Search, MapPin, Filter, MessageCircle, User, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { useFeaturedPets, usePetCategories } from "@/hooks/use-pets"
import { useTranslations } from "@/lib/i18n"
import { PetCard } from "@/components/pet-card"

// Helper function to format pet data from API to UI format
const formatPetForUI = (pet: any, t: any) => {
  const primaryImage = pet.images?.find((img: any) => img.isPrimary) || pet.images?.[0]
  
  // Generate tags from pet data with translations
  const tags = []
  if (pet.healthInfo?.vaccinated) tags.push(t.pets.vaccinated)
  if (pet.healthInfo?.spayedNeutered) tags.push(pet.gender === 'male' ? t.pets.neutered : t.pets.spayed)
  if (pet.goodWith?.children) tags.push(t.pets.goodWithKids)
  if (pet.personality?.includes('house-trained') || pet.personality?.includes('trained')) tags.push(t.pets.houseTrained)
  
  // Format age
  const ageString = pet.ageString || `${pet.age?.years || 0} ${t.pets.years}`
  
  // Format location
  const location = pet.location?.city 
    ? `${pet.location.city}, ${pet.location.state || ''}`
    : t.pets.locationNotSpecified

  return {
    id: pet._id,
    name: pet.name,
    breed: pet.breed,
    age: ageString,
    gender: pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1),
    weight: pet.weight ? `${pet.weight} lbs` : t.pets.weightNotSpecified,
    location: location,
    price: pet.adoptionFee ? `$${pet.adoptionFee}` : t.pets.free,
    image: primaryImage?.url || "/placeholder.svg?height=300&width=300",
    shelter: pet.shelter ? `${pet.shelter.firstName} ${pet.shelter.lastName}` : t.pets.unknownShelter,
    whatsapp: pet.shelter?.phone || "+15551234567", // Fallback number
    description: pet.description,
    isLiked: false, // This will be managed by favorites API
    tags: tags.slice(0, 4), // Limit to 4 tags for UI
    type: pet.type,
    size: pet.size.charAt(0).toUpperCase() + pet.size.slice(1),
    energy: pet.personality?.includes('energetic') ? "High" : 
           pet.personality?.includes('calm') ? "Low" : "Medium",
  }
}

// Helper function to get color class for categories
const getCategoryColor = (type: string) => {
  const colorMap: { [key: string]: string } = {
    dog: "blue",
    cat: "orange", 
    bird: "green",
    rabbit: "pink",
    hamster: "yellow",
    fish: "cyan",
    reptile: "emerald",
    other: "gray"
  }
  return colorMap[type] || "gray"
}

export default function HomePage() {

  const [likedPets, setLikedPets] = useState<number[]>([])
  const { user } = useAuth()
  const { t, formatMessage } = useTranslations()

  // API calls using hooks
  const { data: featuredPetsData, isLoading: loadingPets, error: petsError } = useFeaturedPets(6)
  const { data: categoriesData, isLoading: loadingCategories, error: categoriesError } = usePetCategories()

  // Process API data
  const featuredPets = featuredPetsData?.data ? featuredPetsData.data.map((pet: any) => formatPetForUI(pet, t)) : []
  const categories = categoriesData?.data ? categoriesData.data.map((cat: any) => ({
    id: cat.id || cat.type,
    name: cat.name,
    icon: cat.icon,
    count: cat.count,
    description: cat.description,
    color: getCategoryColor(cat.type || cat.id),
  })) : []

  const toggleLike = (petId: number) => {
    setLikedPets((prev) => (prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐾</span>
              </div>
              <span className="font-bold text-xl text-gray-800">PetMatch</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  <span className="text-sm font-medium">Admin</span>
                </Button>
              </Link>
              {user ? (
                <Link href="/profile">
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={user.profile?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.firstName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t.home.findYourPerfectPet.split(' ').slice(0, -3).join(' ')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {t.home.findYourPerfectPet.split(' ').slice(-3).join(' ')}
            </span>
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            {user ? formatMessage(t.home.welcomeBack + ", {name}! ", { name: user.firstName || 'User' }) : ""}
            {t.home.welcomeMessage}
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t.home.categories}</h2>
            <Link href="/categories" className="text-purple-600 text-sm font-medium">
              {t.home.viewAll}
            </Link>
          </div>
          
          {loadingCategories ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            </div>
          ) : categoriesError ? (
            <div className="text-center py-8">
              <p className="text-red-500 text-sm">{t.home.errorLoading} {t.home.categories.toLowerCase()}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category: any) => (
                <Link key={category.id} href={`/categories/${category.id}`}>
                  <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">{category.icon}</div>
                      <div className="text-lg font-medium text-gray-700 mb-1">{category.name}</div>
                      <div className="text-sm text-gray-500 mb-2">{category.count} {t.common.available}</div>
                      <div className="text-xs text-gray-400">{category.description}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Donation Banner */}
        <Card className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">{t.home.helpPets}</h3>
              <p className="text-sm opacity-90">{t.home.supportMission}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🐕</span>
              </div>
              <Link href="/donations">
                <Button variant="secondary" size="sm">
                  {t.home.donateNow}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Featured Pets */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t.home.featuredPets}</h2>
            <Link href="/pets" className="text-purple-600 text-sm font-medium">
              {t.home.viewAll}
            </Link>
          </div>
          
          {loadingPets ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            </div>
          ) : petsError ? (
            <div className="text-center py-8">
              <p className="text-red-500 text-sm">{t.home.errorLoading} pets</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => window.location.reload()}
              >
                {t.home.tryAgain}
              </Button>
            </div>
          ) : featuredPets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t.home.noFeaturedPets}</p>
              <Link href="/pets">
                <Button variant="outline" size="sm" className="mt-2">
                  {t.home.viewAll} {t.pets.pets}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPets.map((pet: any) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isLiked={likedPets.includes(parseInt(pet.id))}
                  onToggleLike={(id) => {
                    if (!user) {
                      window.location.href = "/auth"
                      return
                    }
                    toggleLike(typeof id === 'number' ? id : parseInt(id as string))
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppFloatingButton
        phoneNumber="+15551234567"
        message={formatMessage("Hi! I'm interested in adopting a pet from PetMatch. Can you help me?", {})}
      />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🏠</span>
              </div>
              <span className="text-xs text-purple-600">{t.navigation.home}</span>
            </Button>
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">{t.home.categories}</span>
              </Button>
            </Link>
            <Link href={user ? "/favorites" : "/auth"}>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <Heart className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">{t.navigation.favorites}</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Chat</span>
            </Button>
            <Link href={user ? "/profile" : "/auth"}>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                {user ? (
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={(user as any)?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{(user as any)?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                )}
                <span className="text-xs text-gray-400">{t.navigation.profile}</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Additional Info */}
      <div className="container mx-auto px-4 pb-24">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border">
          <h3 className="font-semibold text-gray-800 mb-2">{t.home.whyCreateAccount}</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• {t.home.saveFavorites}</li>
            <li>• {t.home.trackApplications}</li>
            <li>• {t.home.getRecommendations}</li>
            <li>• {t.home.communicateWithShelters}</li>
          </ul>
        </div>
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-20"></div>
    </div>
  )
}