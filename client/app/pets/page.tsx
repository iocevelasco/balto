"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePets, useToggleFavorite, useIsFavorite } from '@/hooks/use-pets'

function PetCard({ pet, onToggleFavorite }: { pet: any, onToggleFavorite: (id: string) => void }) {
  const { data: favoriteStatus } = useIsFavorite(pet._id);
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img src={pet.images?.[0]?.url || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={e => {
            e.preventDefault();
            onToggleFavorite(pet._id);
          }}
        >
          <Heart
            className={`w-4 h-4 ${favoriteStatus?.data?.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </Button>
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-white/90">
            <MapPin className="w-3 h-3 mr-1" />
            {pet.location?.city}, {pet.location?.state}
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
          <span className="text-lg font-bold text-purple-600">
            {pet.adoptionFee ? `$${pet.adoptionFee}` : ''}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{pet.breed}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <span>{pet.age?.years}y {pet.age?.months}m</span>
          <span>{pet.gender}</span>
          <span>{pet.size}</span>
          {/* Add energy/personality if available */}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {pet.personality?.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {pet.personality?.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{pet.personality.length - 2} more
            </Badge>
          )}
        </div>
        <Link href={`/pets/${pet._id}`}>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function PetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [energyFilter, setEnergyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // API integration
  const { data, isLoading, isError } = usePets({
    search: searchQuery || undefined,
    type: typeFilter !== 'all' ? typeFilter : undefined,
    size: sizeFilter !== 'all' ? sizeFilter : undefined,
    sortBy: sortBy === 'newest' ? 'createdAt' : sortBy === 'name' ? 'name' : sortBy === 'age' ? 'age.years' : sortBy.includes('price') ? 'adoptionFee' : undefined,
    sortOrder: sortBy === 'price-high' ? 'desc' : 'asc',
    // Add more filters as needed
  })
  const toggleFavorite = useToggleFavorite()

  // Use API data
  const pets = data?.data || []

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
            <h1 className="font-semibold text-lg">Browse Pets</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dog">🐕 Dogs</SelectItem>
                  <SelectItem value="cat">🐱 Cats</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>

              <Select value={energyFilter} onValueChange={setEnergyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Energy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Energy</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="very-high">Very High</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {pets.length} of {data?.total || 0} pets
          </p>
        </div>

        {/* Pet Grid */}
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} onToggleFavorite={(id) => toggleFavorite.mutate({ petId: id })} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No pets found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setTypeFilter("all")
                  setSizeFilter("all")
                  setEnergyFilter("all")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
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
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-purple-600">Search</span>
            </Button>
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <Heart className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">Favorites</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <span className="text-xs text-gray-400">Chat</span>
            </Button>
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
