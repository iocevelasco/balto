"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search, MapPin, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/components/providers/auth-provider"

const favoritePets = [
  {
    id: 2,
    name: "Whiskers",
    breed: "Maine Coon",
    age: "3 Years",
    gender: "Male",
    weight: "6 kg",
    location: "1.8 km Away",
    price: "$80",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Feline Friends Rescue",
    description: "A gentle giant Maine Coon with a loving personality.",
    tags: ["Indoor cat", "Gentle", "Vaccinated", "Neutered"],
    type: "cat",
    size: "Large",
    energy: "Low",
    addedDate: "2024-01-15",
  },
  {
    id: 5,
    name: "Charlie",
    breed: "Golden Retriever",
    age: "4 Years",
    gender: "Male",
    weight: "28 kg",
    location: "3.2 km Away",
    price: "$150",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Golden Hearts Shelter",
    description: "A friendly Golden Retriever who loves playing fetch and swimming.",
    tags: ["Family-friendly", "Trained", "Vaccinated", "Neutered"],
    type: "dog",
    size: "Large",
    energy: "High",
    addedDate: "2024-01-12",
  },
  {
    id: 7,
    name: "Shadow",
    breed: "Domestic Shorthair",
    age: "2 Years",
    gender: "Male",
    weight: "5 kg",
    location: "1.1 km Away",
    price: "$60",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "City Cat Sanctuary",
    description: "A playful black cat who loves interactive toys and sunny windows.",
    tags: ["Playful", "Indoor/Outdoor", "Vaccinated", "Neutered"],
    type: "cat",
    size: "Medium",
    energy: "Medium",
    addedDate: "2024-01-10",
  },
]

function FavoritesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all") // all, cats, dogs
  const [likedPets, setLikedPets] = useState<number[]>([2, 5, 7])
  const { user } = useAuth()

  const toggleLike = (petId: number) => {
    setLikedPets((prev) => prev.filter((id) => id !== petId))
  }

  const filteredPets = favoritePets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || pet.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="font-semibold text-lg">My Favorites</h1>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Favorite Pets</h2>
          <p className="text-gray-600">You have {likedPets.length} pets saved to your favorites</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search your favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                  className={filterType === "all" ? "bg-purple-500 hover:bg-purple-600" : ""}
                >
                  All
                </Button>
                <Button
                  variant={filterType === "cat" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("cat")}
                  className={filterType === "cat" ? "bg-purple-500 hover:bg-purple-600" : ""}
                >
                  🐱 Cats
                </Button>
                <Button
                  variant={filterType === "dog" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("dog")}
                  className={filterType === "dog" ? "bg-purple-500 hover:bg-purple-600" : ""}
                >
                  🐕 Dogs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredPets.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {searchQuery || filterType !== "all" ? "No pets found" : "No favorites yet"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterType !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start browsing pets and tap the heart icon to add them to your favorites"}
              </p>
              {!searchQuery && filterType === "all" && (
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Browse Pets
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {/* Favorites Grid */}
        {filteredPets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleLike(pet.id)
                    }}
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </Button>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-white/90">
                      <MapPin className="w-3 h-3 mr-1" />
                      {pet.location}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={pet.type === "cat" ? "bg-orange-500" : "bg-blue-500"}>
                      {pet.type === "cat" ? "🐱 Cat" : "🐕 Dog"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{pet.name}</h3>
                    <span className="text-lg font-bold text-purple-600">{pet.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pet.breed}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <span>{pet.age}</span>
                    <span>{pet.gender}</span>
                    <span>{pet.size}</span>
                    <span>{pet.energy} energy</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pet.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {pet.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{pet.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mb-3">Added {new Date(pet.addedDate).toLocaleDateString()}</div>
                  <Link href={`/pets/${pet.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">🏠</span>
                </div>
                <span className="text-xs text-gray-400">Home</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
              <Search className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Search</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xs text-purple-600">Favorites</span>
            </Button>
            <Link href="/chat">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <span className="text-xs text-gray-400">Chat</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <span className="text-xs text-gray-400">Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <AuthGuard requireAuth={true}>
      <FavoritesContent />
    </AuthGuard>
  )
}
