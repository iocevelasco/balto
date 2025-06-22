"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "dogs",
    name: "Dogs",
    icon: "🐕",
    count: 78,
    description: "Find your loyal canine companion",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    features: ["Family-friendly", "Active companions", "Loyal & protective"],
  },
  {
    id: "cats",
    name: "Cats",
    icon: "🐱",
    count: 45,
    description: "Discover your perfect feline friend",
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    features: ["Independent", "Affectionate", "Low maintenance"],
  },
  {
    id: "birds",
    name: "Birds",
    icon: "🦜",
    count: 12,
    description: "Find your feathered companion",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    features: ["Social & talkative", "Colorful", "Intelligent"],
  },
  {
    id: "rabbits",
    name: "Rabbits",
    icon: "🐰",
    count: 8,
    description: "Adopt your gentle hopping friend",
    color: "pink",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-700",
    features: ["Gentle & quiet", "Litter trainable", "Great for apartments"],
  },
]

export default function CategoriesPage() {
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
            <h1 className="font-semibold text-lg">Pet Categories</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Choose Your Perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Pet Category
            </span>
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Browse through different types of pets to find your ideal companion. Each category offers unique and loving
            animals waiting for their forever home.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card
                className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 ${category.bgColor} ${category.borderColor} border-2`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-6xl">{category.icon}</div>
                    <Badge
                      variant="outline"
                      className={`${category.bgColor} ${category.textColor} ${category.borderColor}`}
                    >
                      {category.count} available
                    </Badge>
                  </div>

                  <h3 className={`text-2xl font-bold ${category.textColor} mb-2`}>{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="space-y-2 mb-4">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-${category.color}-500`}></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 hover:from-${category.color}-600 hover:to-${category.color}-700 text-white`}
                  >
                    Browse {category.name}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">Pet Adoption Statistics</h3>
              <p className="text-white/90">Making a difference, one adoption at a time</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.count, 0)}</div>
                <div className="text-sm text-white/80">Total Pets</div>
              </div>
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-white/80">Adopted This Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-white/80">Partner Shelters</div>
              </div>
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Can't Find What You're Looking For?</h3>
            <p className="text-gray-600 mb-4">
              Contact our team and we'll help you find the perfect pet that matches your lifestyle and preferences.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Browse All Pets
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
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
              <span className="text-xs text-purple-600">Categories</span>
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

      {/* Spacer for bottom navigation */}
      <div className="h-20"></div>
    </div>
  )
}
