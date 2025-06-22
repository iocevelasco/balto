"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/components/providers/auth-provider"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import {
  ArrowLeft,
  Edit,
  Heart,
  Mail,
  Users,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  Star,
  Calendar,
  Search,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  MessageCircle,
  Settings,
  Award,
  Home,
} from "lucide-react"
import Link from "next/link"

const userProfile = {
  joinDate: "January 2024",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  address: "123 Pet Lover Street, San Francisco, CA 94102",
  bio: "Animal lover looking for a furry companion to share adventures with. I have experience with both cats and dogs and live in a pet-friendly apartment with a small balcony.",
  verified: true,
  preferences: {
    animalType: "Both cats and dogs",
    size: "Medium to Large",
    age: "Young Adult (1-5 years)",
    energy: "Medium to High",
    goodWithKids: true,
    goodWithPets: true,
    maxBudget: "$200",
    livingSpace: "Apartment with balcony",
  },
  stats: {
    favoritePets: 8,
    applications: 3,
    adoptions: 1,
    sheltersFollowed: 5,
    adoptionScore: 92,
    profileViews: 45,
  },
  adoptionHistory: [
    {
      id: 1,
      petName: "Max",
      petType: "dog",
      breed: "Labrador Mix",
      status: "Adopted",
      date: "2023-12-15",
      shelter: "Happy Paws Rescue",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      petName: "Luna",
      petType: "dog",
      breed: "Siberian Husky",
      status: "Application Pending",
      date: "2024-01-20",
      shelter: "Arctic Rescue",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      petName: "Whiskers",
      petType: "cat",
      breed: "Maine Coon",
      status: "Under Review",
      date: "2024-01-18",
      shelter: "Feline Friends Rescue",
      image: "/placeholder.svg?height=60&width=60",
    },
  ],
  recentActivity: [
    { type: "favorite", petName: "Charlie", date: "2 days ago", icon: Heart },
    { type: "application", petName: "Luna", date: "1 week ago", icon: Users },
    { type: "favorite", petName: "Whiskers", date: "1 week ago", icon: Heart },
    { type: "adoption", petName: "Max", date: "2 weeks ago", icon: CheckCircle },
  ],
  favoritePets: [
    {
      id: 2,
      name: "Whiskers",
      breed: "Maine Coon",
      image: "/placeholder.svg?height=60&width=60",
      type: "cat",
      addedDate: "2024-01-15",
      shelter: "Feline Friends Rescue",
      whatsapp: "+15551234567",
    },
    {
      id: 5,
      name: "Charlie",
      breed: "Golden Retriever",
      image: "/placeholder.svg?height=60&width=60",
      type: "dog",
      addedDate: "2024-01-12",
      shelter: "Golden Hearts Shelter",
      whatsapp: "+15551234568",
    },
    {
      id: 7,
      name: "Shadow",
      breed: "Domestic Shorthair",
      image: "/placeholder.svg?height=60&width=60",
      type: "cat",
      addedDate: "2024-01-10",
      shelter: "City Cat Sanctuary",
      whatsapp: "+15551234569",
    },
  ],
}

function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false)
  const [editSection, setEditSection] = useState<string | null>(null)
  const [notifications, setNotifications] = useState({
    newPets: true,
    applicationUpdates: true,
    messages: true,
    newsletter: false,
  })
  const { user, logout } = useAuth()

  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Adopted":
        return "bg-green-100 text-green-800"
      case "Application Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Adopted":
        return CheckCircle
      case "Application Pending":
        return Clock
      case "Under Review":
        return Users
      default:
        return Clock
    }
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
            <h1 className="font-semibold text-lg">My Profile</h1>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.profile?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                {userProfile.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input defaultValue={`${user.firstName} ${user.lastName}`} placeholder="Full name" />
                    <Input defaultValue={user.email} placeholder="Email" type="email" />
                    <Input defaultValue={userProfile.phone} placeholder="Phone number" type="tel" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 mb-1">
                      <h2 className="text-xl font-bold text-gray-800">{`${user.firstName} ${user.lastName}`}</h2>
                      {userProfile.verified && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{userProfile.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{userProfile.location}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {userProfile.joinDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Adoption Score: {userProfile.stats.adoptionScore}%</span>
              </div>
            </div>

            {isEditing ? (
              <Textarea
                defaultValue={userProfile.bio}
                placeholder="Tell us about yourself and what kind of pet you're looking for..."
                rows={3}
              />
            ) : (
              <p className="text-gray-600 text-sm">{userProfile.bio}</p>
            )}

            {isEditing && (
              <div className="flex space-x-2 mt-4">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{userProfile.stats.favoritePets}</div>
              <div className="text-xs text-gray-500">Favorite Pets</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{userProfile.stats.applications}</div>
              <div className="text-xs text-gray-500">Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{userProfile.stats.adoptions}</div>
              <div className="text-xs text-gray-500">Adoptions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{userProfile.stats.sheltersFollowed}</div>
              <div className="text-xs text-gray-500">Shelters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{userProfile.stats.adoptionScore}%</div>
              <div className="text-xs text-gray-500">Match Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{userProfile.stats.profileViews}</div>
              <div className="text-xs text-gray-500">Profile Views</div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span>Contact Information</span>
              </span>
              <Button variant="outline" size="sm" onClick={() => setEditSection("contact")}>
                <Edit className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Phone Number</Label>
                <p className="text-sm">{userProfile.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Location</Label>
                <p className="text-sm">{userProfile.location}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Full Address</Label>
              <p className="text-sm">{userProfile.address}</p>
            </div>
            <div className="flex items-center space-x-2">
              <WhatsAppChat
                phoneNumber={userProfile.phone}
                message="Hi! I'm interested in connecting about pet adoption."
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact via WhatsApp
              </WhatsAppChat>
            </div>
          </CardContent>
        </Card>

        {/* Adoption History */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Adoption History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.adoptionHistory.length > 0 ? (
              <div className="space-y-4">
                {userProfile.adoptionHistory.map((adoption) => {
                  const StatusIcon = getStatusIcon(adoption.status)
                  return (
                    <div key={adoption.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <img
                        src={adoption.image || "/placeholder.svg"}
                        alt={adoption.petName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-800">{adoption.petName}</h4>
                          <Badge
                            className={
                              adoption.petType === "cat" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                            }
                          >
                            {adoption.petType === "cat" ? "🐱" : "🐕"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{adoption.breed}</p>
                        <p className="text-xs text-gray-500">{adoption.shelter}</p>
                        <p className="text-xs text-gray-400">{new Date(adoption.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(adoption.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {adoption.status}
                        </Badge>
                        {adoption.status !== "Adopted" && (
                          <WhatsAppChat
                            phoneNumber="+15551234567"
                            petName={adoption.petName}
                            shelterName={adoption.shelter}
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </WhatsAppChat>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No adoption history yet</p>
                <Link href="/">
                  <Button variant="outline" size="sm" className="mt-2">
                    Start Browsing Pets
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pet Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-purple-600" />
                <span>Pet Preferences</span>
              </span>
              <Button variant="outline" size="sm" onClick={() => setEditSection("preferences")}>
                <Edit className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Animal Type</Label>
                <p className="text-sm">{userProfile.preferences.animalType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Preferred Size</Label>
                <p className="text-sm">{userProfile.preferences.size}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Age Range</Label>
                <p className="text-sm">{userProfile.preferences.age}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Energy Level</Label>
                <p className="text-sm">{userProfile.preferences.energy}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Budget Range</Label>
                <p className="text-sm">{userProfile.preferences.maxBudget}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Living Space</Label>
                <p className="text-sm">{userProfile.preferences.livingSpace}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.preferences.goodWithKids && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Good with kids
                </Badge>
              )}
              {userProfile.preferences.goodWithPets && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Good with other pets
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Favorite Pets */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Favorite Pets</span>
              </span>
              <Link href="/favorites">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.favoritePets.length > 0 ? (
              <div className="space-y-3">
                {userProfile.favoritePets.slice(0, 3).map((pet) => (
                  <div key={pet.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <img
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-800">{pet.name}</h4>
                        <Badge
                          className={pet.type === "cat" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}
                        >
                          {pet.type === "cat" ? "🐱" : "🐕"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{pet.breed}</p>
                      <p className="text-xs text-gray-500">{pet.shelter}</p>
                      <p className="text-xs text-gray-400">Added {new Date(pet.addedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link href={`/pets/${pet.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <WhatsAppChat
                        phoneNumber={pet.whatsapp}
                        petName={pet.name}
                        shelterName={pet.shelter}
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <MessageCircle className="w-3 h-3" />
                      </WhatsAppChat>
                    </div>
                  </div>
                ))}
                {userProfile.favoritePets.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{userProfile.favoritePets.length - 3} more favorites
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No favorite pets yet</p>
                <Link href="/">
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Pets
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProfile.recentActivity.map((activity, index) => {
                const ActivityIcon = activity.icon
                return (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "favorite"
                          ? "bg-red-100"
                          : activity.type === "adoption"
                            ? "bg-green-100"
                            : "bg-blue-100"
                      }`}
                    >
                      <ActivityIcon
                        className={`w-4 h-4 ${
                          activity.type === "favorite"
                            ? "text-red-600"
                            : activity.type === "adoption"
                              ? "text-green-600"
                              : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">
                        {activity.type === "favorite"
                          ? "Added to favorites"
                          : activity.type === "adoption"
                            ? "Successfully adopted"
                            : "Applied for"}{" "}
                        <span className="font-medium">{activity.petName}</span>
                      </p>
                      <p className="text-gray-500 text-xs">{activity.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-purple-600" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">New Pet Alerts</Label>
                <p className="text-xs text-gray-500">Get notified when new pets match your preferences</p>
              </div>
              <Switch
                checked={notifications.newPets}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newPets: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Application Updates</Label>
                <p className="text-xs text-gray-500">Updates on your adoption applications</p>
              </div>
              <Switch
                checked={notifications.applicationUpdates}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, applicationUpdates: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Messages</Label>
                <p className="text-xs text-gray-500">Messages from shelters and rescue organizations</p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, messages: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Newsletter</Label>
                <p className="text-xs text-gray-500">Monthly newsletter with pet care tips</p>
              </div>
              <Switch
                checked={notifications.newsletter}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newsletter: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3 mb-20">
          <Link href="/donations">
            <Button variant="outline" className="w-full justify-start">
              <Heart className="w-4 h-4 mr-3 text-red-500" />
              Make a Donation
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3 text-gray-500" />
            Account Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-3 text-green-500" />
            Privacy & Security
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="w-4 h-4 mr-3 text-blue-500" />
            Help & Support
          </Button>
          <WhatsAppChat
            phoneNumber="+15551234567"
            message="Hi! I need help with my PetMatch account and adoption process."
            variant="outline"
            className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50"
          >
            <MessageCircle className="w-4 h-4 mr-3" />
            Contact Support via WhatsApp
          </WhatsAppChat>
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" onClick={logout}>
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <Home className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">Home</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
              <Search className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Search</span>
            </Button>
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <Heart className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">Favorites</span>
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">Chat</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-purple-600">Profile</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard requireAuth={true}>
      <ProfileContent />
    </AuthGuard>
  )
}
