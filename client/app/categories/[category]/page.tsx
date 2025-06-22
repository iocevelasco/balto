"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { Heart, Search, MapPin, ArrowLeft, SlidersHorizontal, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

// Extended pet data with more categories
const allPets = [
  // Dogs
  {
    id: 1,
    name: "Brook",
    breed: "Pembroke Welsh Corgi",
    age: "2.5 Years",
    gender: "Female",
    weight: "10 kg",
    location: "1.2 km Away",
    price: "$120",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Happy Paws Rescue",
    whatsapp: "+15551234567",
    description: "Friendly and energetic Corgi, great with children and loves to play fetch.",
    tags: ["House-trained", "Good with kids", "Vaccinated", "Spayed"],
    category: "dogs",
    type: "dog",
    size: "Medium",
    energy: "High",
    goodWith: ["kids", "dogs"],
    specialNeeds: false,
  },
  {
    id: 3,
    name: "Luna",
    breed: "Siberian Husky",
    age: "2 Years",
    gender: "Female",
    weight: "25 kg",
    location: "0.8 km Away",
    price: "$200",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Arctic Rescue",
    whatsapp: "+15551234569",
    description: "An energetic Siberian Husky who loves outdoor adventures and needs an active family.",
    tags: ["Active", "Outdoor lover", "Trained", "Spayed"],
    category: "dogs",
    type: "dog",
    size: "Large",
    energy: "Very High",
    goodWith: ["dogs"],
    specialNeeds: false,
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
    whatsapp: "+15551234568",
    description: "A friendly Golden Retriever who loves playing fetch and swimming.",
    tags: ["Family-friendly", "Trained", "Vaccinated", "Neutered"],
    category: "dogs",
    type: "dog",
    size: "Large",
    energy: "High",
    goodWith: ["kids", "dogs", "cats"],
    specialNeeds: false,
  },
  {
    id: 8,
    name: "Buddy",
    breed: "Beagle Mix",
    age: "3 Years",
    gender: "Male",
    weight: "15 kg",
    location: "2.1 km Away",
    price: "$100",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Rescue Haven",
    whatsapp: "+15551234571",
    description: "A gentle Beagle mix who loves sniffing around and is great with families.",
    tags: ["Gentle", "Good with kids", "Vaccinated", "Neutered"],
    category: "dogs",
    type: "dog",
    size: "Medium",
    energy: "Medium",
    goodWith: ["kids", "dogs"],
    specialNeeds: false,
  },
  // Cats
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
    whatsapp: "+15551234568",
    description: "A gentle giant Maine Coon with a loving personality.",
    tags: ["Indoor cat", "Gentle", "Vaccinated", "Neutered"],
    category: "cats",
    type: "cat",
    size: "Large",
    energy: "Low",
    goodWith: ["cats"],
    specialNeeds: false,
  },
  {
    id: 4,
    name: "Mittens",
    breed: "British Shorthair",
    age: "1.5 Years",
    gender: "Female",
    weight: "4 kg",
    location: "2.3 km Away",
    price: "$100",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "City Cat Sanctuary",
    whatsapp: "+15551234570",
    description: "A calm and affectionate British Shorthair.",
    tags: ["Calm", "Affectionate", "Vaccinated", "Spayed"],
    category: "cats",
    type: "cat",
    size: "Medium",
    energy: "Low",
    goodWith: ["cats"],
    specialNeeds: false,
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
    whatsapp: "+15551234569",
    description: "A playful black cat who loves interactive toys.",
    tags: ["Playful", "Indoor/Outdoor", "Vaccinated", "Neutered"],
    category: "cats",
    type: "cat",
    size: "Medium",
    energy: "Medium",
    goodWith: ["cats"],
    specialNeeds: false,
  },
  {
    id: 9,
    name: "Princess",
    breed: "Persian",
    age: "4 Years",
    gender: "Female",
    weight: "4.5 kg",
    location: "1.5 km Away",
    price: "$120",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Feline Friends Rescue",
    whatsapp: "+15551234572",
    description: "A beautiful Persian cat who loves being pampered and quiet environments.",
    tags: ["Quiet", "Indoor only", "Vaccinated", "Spayed"],
    category: "cats",
    type: "cat",
    size: "Medium",
    energy: "Low",
    goodWith: ["cats"],
    specialNeeds: true,
  },
  // Birds
  {
    id: 10,
    name: "Sunny",
    breed: "Cockatiel",
    age: "2 Years",
    gender: "Male",
    weight: "0.1 kg",
    location: "1.9 km Away",
    price: "$80",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Feathered Friends Sanctuary",
    whatsapp: "+15551234573",
    description: "A cheerful Cockatiel who loves to whistle and interact with people.",
    tags: ["Social", "Talks", "Hand-tamed", "Healthy"],
    category: "birds",
    type: "bird",
    size: "Small",
    energy: "Medium",
    goodWith: ["birds"],
    specialNeeds: false,
  },
  {
    id: 11,
    name: "Rainbow",
    breed: "Lovebird",
    age: "1 Year",
    gender: "Female",
    weight: "0.05 kg",
    location: "2.7 km Away",
    price: "$60",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Feathered Friends Sanctuary",
    whatsapp: "+15551234574",
    description: "A colorful Lovebird who is very social and loves to play.",
    tags: ["Colorful", "Social", "Playful", "Healthy"],
    category: "birds",
    type: "bird",
    size: "Small",
    energy: "High",
    goodWith: ["birds"],
    specialNeeds: false,
  },
  // Rabbits
  {
    id: 12,
    name: "Snowball",
    breed: "Holland Lop",
    age: "1.5 Years",
    gender: "Female",
    weight: "1.5 kg",
    location: "1.3 km Away",
    price: "$70",
    image: "/placeholder.svg?height=300&width=300",
    shelter: "Small Pets Rescue",
    whatsapp: "+15551234575",
    description: "A gentle Holland Lop rabbit who loves to hop around and eat fresh vegetables.",
    tags: ["Gentle", "Litter trained", "Spayed", "Healthy"],
    category: "rabbits",
    type: "rabbit",
    size: "Small",
    energy: "Medium",
    goodWith: ["rabbits"],
    specialNeeds: false,
  },
]

const categoryInfo = {
  dogs: {
    title: "Dogs",
    icon: "🐕",
    description: "Find your loyal canine companion",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
  },
  cats: {
    title: "Cats",
    icon: "🐱",
    description: "Discover your perfect feline friend",
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
  },
  birds: {
    title: "Birds",
    icon: "🦜",
    description: "Find your feathered companion",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
  },
  rabbits: {
    title: "Rabbits",
    icon: "🐰",
    description: "Adopt your gentle hopping friend",
    color: "pink",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-700",
  },
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const { user } = useAuth()

  const [searchQuery, setSearchQuery] = useState("")
  const [ageFilter, setAgeFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [energyFilter, setEnergyFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [specialNeedsFilter, setSpecialNeedsFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [likedPets, setLikedPets] = useState<number[]>([2, 5])

  const toggleLike = (petId: number) => {
    if (!user) {
      window.location.href = "/auth"
      return
    }
    setLikedPets((prev) => (prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]))
  }

  const categoryData = categoryInfo[category as keyof typeof categoryInfo]

  const filteredPets = useMemo(() => {
    return allPets.filter((pet) => {
      const matchesCategory = pet.category === category
      const matchesSearch =
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesAge =
        ageFilter === "all" ||
        (ageFilter === "young" && Number.parseFloat(pet.age) <= 2) ||
        (ageFilter === "adult" && Number.parseFloat(pet.age) > 2 && Number.parseFloat(pet.age) <= 7) ||
        (ageFilter === "senior" && Number.parseFloat(pet.age) > 7)
      const matchesSize = sizeFilter === "all" || pet.size.toLowerCase() === sizeFilter
      const matchesEnergy = energyFilter === "all" || pet.energy.toLowerCase().replace(" ", "-") === energyFilter
      const matchesGender = genderFilter === "all" || pet.gender.toLowerCase() === genderFilter
      const matchesSpecialNeeds =
        specialNeedsFilter === "all" ||
        (specialNeedsFilter === "yes" && pet.specialNeeds) ||
        (specialNeedsFilter === "no" && !pet.specialNeeds)

      return (
        matchesCategory &&
        matchesSearch &&
        matchesAge &&
        matchesSize &&
        matchesEnergy &&
        matchesGender &&
        matchesSpecialNeeds
      )
    })
  }, [category, searchQuery, ageFilter, sizeFilter, energyFilter, genderFilter, specialNeedsFilter])

  const sortedPets = useMemo(() => {
    return [...filteredPets].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "age":
          return Number.parseFloat(a.age) - Number.parseFloat(b.age)
        case "price-low":
          return Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", ""))
        case "price-high":
          return Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", ""))
        case "distance":
          return Number.parseFloat(a.location) - Number.parseFloat(b.location)
        default:
          return 0
      }
    })
  }, [filteredPets, sortBy])

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Category Not Found</h1>
          <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    )
  }

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
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{categoryData.icon}</span>
              <h1 className="font-semibold text-lg">{categoryData.title}</h1>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Category Header */}
        <Card className={`mb-6 ${categoryData.bgColor} ${categoryData.borderColor} border-2`}>
          <CardContent className="p-6 text-center">
            <div className="text-6xl mb-4">{categoryData.icon}</div>
            <h2 className={`text-3xl font-bold ${categoryData.textColor} mb-2`}>{categoryData.title}</h2>
            <p className="text-gray-600 mb-4">{categoryData.description}</p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className={`text-2xl font-bold ${categoryData.textColor}`}>{filteredPets.length}</div>
                <div className="text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${categoryData.textColor}`}>
                  {new Set(filteredPets.map((pet) => pet.shelter)).size}
                </div>
                <div className="text-gray-500">Shelters</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${categoryData.textColor}`}>
                  {new Set(filteredPets.map((pet) => pet.breed)).size}
                </div>
                <div className="text-gray-500">Breeds</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-purple-600">
            Categories
          </Link>
          <span>/</span>
          <span className={categoryData.textColor}>{categoryData.title}</span>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={`Search ${categoryData.title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Row 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="young">Young (0-2 years)</SelectItem>
                  <SelectItem value="adult">Adult (2-7 years)</SelectItem>
                  <SelectItem value="senior">Senior (7+ years)</SelectItem>
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

              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Row 2 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Select value={specialNeedsFilter} onValueChange={setSpecialNeedsFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Special Needs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pets</SelectItem>
                  <SelectItem value="no">No Special Needs</SelectItem>
                  <SelectItem value="yes">Special Needs</SelectItem>
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
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setAgeFilter("all")
                  setSizeFilter("all")
                  setEnergyFilter("all")
                  setGenderFilter("all")
                  setSpecialNeedsFilter("all")
                  setSortBy("newest")
                }}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Clear Filters</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            Showing {sortedPets.length} of {filteredPets.length} {categoryData.title.toLowerCase()}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <Badge
            variant="outline"
            className={`${categoryData.bgColor} ${categoryData.textColor} ${categoryData.borderColor}`}
          >
            {categoryData.icon} {categoryData.title}
          </Badge>
        </div>

        {/* Pet Grid */}
        {sortedPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {sortedPets.map((pet) => (
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
                    <Heart
                      className={`w-4 h-4 ${
                        likedPets.includes(pet.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-white/90">
                      <MapPin className="w-3 h-3 mr-1" />
                      {pet.location}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={`${categoryData.bgColor} ${categoryData.textColor} border-0`}>
                      {categoryData.icon} {pet.breed}
                    </Badge>
                  </div>
                  {pet.specialNeeds && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Special Needs
                      </Badge>
                    </div>
                  )}
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
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pet.description}</p>
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
                  <div className="flex space-x-2">
                    <Link href={`/pets/${pet.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        View Details
                      </Button>
                    </Link>
                    <WhatsAppChat
                      phoneNumber={pet.whatsapp}
                      petName={pet.name}
                      shelterName={pet.shelter}
                      variant="outline"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </WhatsAppChat>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">{categoryData.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No {categoryData.title.toLowerCase()} found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ||
                ageFilter !== "all" ||
                sizeFilter !== "all" ||
                energyFilter !== "all" ||
                genderFilter !== "all" ||
                specialNeedsFilter !== "all"
                  ? "Try adjusting your search criteria or filters"
                  : `No ${categoryData.title.toLowerCase()} are currently available for adoption`}
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setAgeFilter("all")
                    setSizeFilter("all")
                    setEnergyFilter("all")
                    setGenderFilter("all")
                    setSpecialNeedsFilter("all")
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Browse All Pets
                  </Button>
                </Link>
              </div>
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
              <MessageCircle className="w-5 h-5 text-gray-400" />
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
