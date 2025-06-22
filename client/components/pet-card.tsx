import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, MessageCircle } from "lucide-react"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { useTranslations } from "@/lib/i18n"

// Types for the pet information expected by the card
export interface UIPet {
  id: string | number
  name: string
  image: string
  breed: string
  price: string
  age: string
  gender: string
  weight: string
  location: string
  shelter: string
  whatsapp: string
  tags: string[]
}

interface PetCardProps {
  pet: UIPet
  /**
   * Whether the current user has liked this pet.
   * This should come from the page‐level "favorites" state or API.
   */
  isLiked?: boolean
  /**
   * Callback fired when the like button is toggled.
   * Receives the pet id.
   */
  onToggleLike?: (petId: string | number) => void
  /**
   * Whether to hide the like / WhatsApp quick chat buttons.
   * Defaults to false.
   */
  hideActions?: boolean
}

/**
 * Reusable card used across the application to display a pet in grid views.
 *
 * NOTE: This component is UI‐only and does not manage any data fetching internally; that
 * responsibility stays at the page / hook level. It only receives the formatted `UIPet` data.
 */
export const PetCard: React.FC<PetCardProps> = ({
  pet,
  isLiked = false,
  onToggleLike,
  hideActions = false,
}) => {
  const { t } = useTranslations()

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (onToggleLike) {
      onToggleLike(pet.id)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        {/* Pet image */}
        <img
          src={pet.image || "/placeholder.svg"}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />

        {/* Like / favourite button */}
        {!hideActions && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={handleLike}
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </Button>
        )}

        {/* Location badge */}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-white/90">
            <MapPin className="w-3 h-3 mr-1" />
            {pet.location}
          </Badge>
        </div>

        {/* WhatsApp quick chat */}
        {!hideActions && (
          <div className="absolute bottom-2 right-2">
            <WhatsAppChat
              phoneNumber={pet.whatsapp}
              petName={pet.name}
              shelterName={pet.shelter}
              variant="ghost"
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 p-0 rounded-full"
            >
              <MessageCircle className="w-4 h-4" />
            </WhatsAppChat>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{pet.name}</h3>
          <span className="text-lg font-bold text-purple-600">{pet.price}</span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{pet.breed}</p>

        {/* Age, gender, weight */}
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <span>{pet.age}</span>
          <span>{pet.gender}</span>
          <span>{pet.weight}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {pet.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Call to actions */}
        <div className="flex space-x-2">
          <Link href={`/pets/${pet.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              {t.pets.petDetails}
            </Button>
          </Link>

          {/* Secondary WhatsApp button */}
          {!hideActions && (
            <WhatsAppChat
              phoneNumber={pet.whatsapp}
              petName={pet.name}
              shelterName={pet.shelter}
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              <MessageCircle className="w-4 h-4" />
            </WhatsAppChat>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 