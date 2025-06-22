"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Users, Heart, Calendar, TrendingUp } from "lucide-react"

const mockPets = [
  {
    id: 1,
    name: "Brook",
    breed: "Pembroke Welsh Corgi",
    age: "2.5 Years",
    status: "Available",
    applications: 5,
    views: 124,
    image: "/placeholder.svg?height=80&width=80",
    type: "dog",
    size: "Medium",
    energy: "High",
  },
  {
    id: 2,
    name: "Whiskers",
    breed: "Maine Coon",
    age: "3 Years",
    status: "Pending",
    applications: 8,
    views: 89,
    image: "/placeholder.svg?height=80&width=80",
    type: "cat",
    size: "Large",
    energy: "Low",
  },
  {
    id: 3,
    name: "Luna",
    breed: "Siberian Husky",
    age: "2 Years",
    status: "Adopted",
    applications: 12,
    views: 156,
    image: "/placeholder.svg?height=80&width=80",
    type: "dog",
    size: "Large",
    energy: "Very High",
  },
  {
    id: 4,
    name: "Shadow",
    breed: "Domestic Shorthair",
    age: "1.5 Years",
    status: "Available",
    applications: 3,
    views: 67,
    image: "/placeholder.svg?height=80&width=80",
    type: "cat",
    size: "Medium",
    energy: "Medium",
  },
  {
    id: 5,
    name: "Charlie",
    breed: "Golden Retriever",
    age: "4 Years",
    status: "Available",
    applications: 7,
    views: 203,
    image: "/placeholder.svg?height=80&width=80",
    type: "dog",
    size: "Large",
    energy: "High",
  },
]

const mockApplications = [
  {
    id: 1,
    petName: "Brook",
    applicantName: "Sarah Johnson",
    email: "sarah.j@email.com",
    status: "Under Review",
    submittedDate: "2024-01-15",
    score: 85,
  },
  {
    id: 2,
    petName: "Shelly",
    applicantName: "Mike Chen",
    email: "mike.chen@email.com",
    status: "Approved",
    submittedDate: "2024-01-14",
    score: 92,
  },
  {
    id: 3,
    petName: "Brook",
    applicantName: "Emily Davis",
    email: "emily.d@email.com",
    status: "Pending",
    submittedDate: "2024-01-13",
    score: 78,
  },
]

export default function ShelterDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Adopted":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-orange-100 text-orange-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Shelter Dashboard</h1>
              <p className="text-gray-600">Happy Paws Rescue</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Pet
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pets</p>
                  <p className="text-3xl font-bold text-gray-800">24</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+2 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-3xl font-bold text-gray-800">47</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+8 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Adoptions</p>
                  <p className="text-3xl font-bold text-gray-800">156</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+3 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-800">87%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">+5% this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-400">
            <TabsTrigger value="pets">Pet Management</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="pets" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search pets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pets Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pet Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPets.map((pet) => (
                    <div
                      key={pet.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={pet.image || "/placeholder.svg"}
                          alt={pet.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                            <Badge
                              className={
                                pet.type === "cat" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                              }
                            >
                              {pet.type === "cat" ? "🐱 Cat" : "🐕 Dog"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{pet.breed}</p>
                          <p className="text-xs text-gray-500">
                            {pet.age} • {pet.size} • {pet.energy} energy
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-800">{pet.applications}</p>
                          <p className="text-xs text-gray-500">Applications</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-800">{pet.views}</p>
                          <p className="text-xs text-gray-500">Views</p>
                        </div>
                        <Badge className={getStatusColor(pet.status)}>{pet.status}</Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            {/* Applications Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {application.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{application.applicantName}</h3>
                          <p className="text-sm text-gray-600">{application.email}</p>
                          <p className="text-xs text-gray-500">Applied for {application.petName}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-800">{application.score}%</p>
                          <p className="text-xs text-gray-500">Match Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-800">{application.submittedDate}</p>
                          <p className="text-xs text-gray-500">Submitted</p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
