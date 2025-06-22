"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, Edit, Trash2, Upload, MapPin, Calendar, Weight, Eye, MoreHorizontal } from "lucide-react"

const mockPets = [
  {
    id: 1,
    name: "Brook",
    breed: "Pembroke Welsh Corgi",
    age: "2.5 Years",
    gender: "Female",
    weight: "10 kg",
    status: "Available",
    location: "Main Kennel A1",
    image: "/placeholder.svg?height=100&width=100",
    dateAdded: "2024-01-15",
    adoptionFee: 120,
    vaccinated: true,
    spayed: true,
    microchipped: true,
    description: "Friendly and energetic Corgi, great with children.",
    medicalNotes: "Up to date on all vaccinations. No known health issues.",
    behaviorNotes: "House-trained, good with kids and other dogs.",
  },
  {
    id: 2,
    name: "Whiskers",
    breed: "Maine Coon",
    age: "3 Years",
    gender: "Male",
    weight: "6 kg",
    status: "Pending",
    location: "Cat Room B2",
    image: "/placeholder.svg?height=100&width=100",
    dateAdded: "2024-01-10",
    adoptionFee: 80,
    vaccinated: true,
    spayed: true,
    microchipped: true,
    description: "Gentle giant Maine Coon with a loving personality.",
    medicalNotes: "Recent dental cleaning. Healthy overall.",
    behaviorNotes: "Calm, indoor cat, good with other cats.",
  },
  {
    id: 3,
    name: "Luna",
    breed: "Siberian Husky",
    age: "2 Years",
    gender: "Female",
    weight: "25 kg",
    status: "Adopted",
    location: "Adopted",
    image: "/placeholder.svg?height=100&width=100",
    dateAdded: "2024-01-05",
    adoptionFee: 200,
    vaccinated: true,
    spayed: true,
    microchipped: true,
    description: "Energetic Husky who loves outdoor adventures.",
    medicalNotes: "Excellent health, all vaccinations current.",
    behaviorNotes: "High energy, needs active family, good with dogs.",
  },
]

export function PetManagement() {
  const [pets, setPets] = useState(mockPets)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPet, setSelectedPet] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    status: "Available",
    location: "",
    adoptionFee: "",
    description: "",
    medicalNotes: "",
    behaviorNotes: "",
    vaccinated: false,
    spayed: false,
    microchipped: false,
    healthConditions: "",
    lastVetVisit: "",
    nextVetVisit: "",
    medications: "",
    allergies: "",
  })

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || pet.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Adopted":
        return "bg-blue-100 text-blue-800"
      case "Medical Hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddPet = () => {
    const pet = {
      ...newPet,
      id: pets.length + 1,
      dateAdded: new Date().toISOString().split("T")[0],
      image: "/placeholder.svg?height=100&width=100",
      adoptionFee: Number.parseInt(newPet.adoptionFee) || 0,
    }
    setPets([...pets, pet])
    setNewPet({
      name: "",
      breed: "",
      age: "",
      gender: "",
      weight: "",
      status: "Available",
      location: "",
      adoptionFee: "",
      description: "",
      medicalNotes: "",
      behaviorNotes: "",
      vaccinated: false,
      spayed: false,
      microchipped: false,
      healthConditions: "",
      lastVetVisit: "",
      nextVetVisit: "",
      medications: "",
      allergies: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeletePet = (petId: number) => {
    setPets(pets.filter((pet) => pet.id !== petId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pet Management</h2>
          <p className="text-gray-600">Manage your shelter's pet listings and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Pet</DialogTitle>
              <DialogDescription>
                Enter the details for the new pet. All fields marked with * are required.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={newPet.name}
                      onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                      placeholder="Pet's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="breed">Breed *</Label>
                    <Input
                      id="breed"
                      value={newPet.breed}
                      onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                      placeholder="Pet's breed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      value={newPet.age}
                      onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                      placeholder="e.g., 2 Years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={newPet.gender} onValueChange={(value) => setNewPet({ ...newPet, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={newPet.weight}
                      onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                      placeholder="e.g., 10 kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="adoptionFee">Adoption Fee ($)</Label>
                    <Input
                      id="adoptionFee"
                      type="number"
                      value={newPet.adoptionFee}
                      onChange={(e) => setNewPet({ ...newPet, adoptionFee: e.target.value })}
                      placeholder="120"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Current Location</Label>
                  <Input
                    id="location"
                    value={newPet.location}
                    onChange={(e) => setNewPet({ ...newPet, location: e.target.value })}
                    placeholder="e.g., Kennel A1, Cat Room B2"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPet.description}
                    onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                    placeholder="Brief description of the pet's personality and characteristics"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Pet Photos & Videos</Label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4, MOV up to 10MB each</p>
                      <Button variant="outline" className="mt-2">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Files
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Preview uploaded files */}
                      <div className="relative group">
                        <img
                          src="/placeholder.svg?height=80&width=80"
                          alt="Preview"
                          className="w-full h-20 object-cover rounded"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="medical" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vaccinated">Vaccinated</Label>
                    <Switch
                      id="vaccinated"
                      checked={newPet.vaccinated}
                      onCheckedChange={(checked) => setNewPet({ ...newPet, vaccinated: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="spayed">Spayed/Neutered</Label>
                    <Switch
                      id="spayed"
                      checked={newPet.spayed}
                      onCheckedChange={(checked) => setNewPet({ ...newPet, spayed: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="microchipped">Microchipped</Label>
                    <Switch
                      id="microchipped"
                      checked={newPet.microchipped}
                      onCheckedChange={(checked) => setNewPet({ ...newPet, microchipped: checked })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="healthConditions">Health Conditions</Label>
                    <Textarea
                      id="healthConditions"
                      value={newPet.healthConditions || ""}
                      onChange={(e) => setNewPet({ ...newPet, healthConditions: e.target.value })}
                      placeholder="Any ongoing health conditions or special needs"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lastVetVisit">Last Vet Visit</Label>
                      <Input
                        id="lastVetVisit"
                        type="date"
                        value={newPet.lastVetVisit || ""}
                        onChange={(e) => setNewPet({ ...newPet, lastVetVisit: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nextVetVisit">Next Vet Visit</Label>
                      <Input
                        id="nextVetVisit"
                        type="date"
                        value={newPet.nextVetVisit || ""}
                        onChange={(e) => setNewPet({ ...newPet, nextVetVisit: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={newPet.medications || ""}
                      onChange={(e) => setNewPet({ ...newPet, medications: e.target.value })}
                      placeholder="List any current medications and dosages"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Input
                      id="allergies"
                      value={newPet.allergies || ""}
                      onChange={(e) => setNewPet({ ...newPet, allergies: e.target.value })}
                      placeholder="Food allergies, medication allergies, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicalNotes">Medical Notes</Label>
                    <Textarea
                      id="medicalNotes"
                      value={newPet.medicalNotes}
                      onChange={(e) => setNewPet({ ...newPet, medicalNotes: e.target.value })}
                      placeholder="Any medical conditions, treatments, or notes"
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="behavior" className="space-y-4">
                <div>
                  <Label htmlFor="behaviorNotes">Behavior Notes</Label>
                  <Textarea
                    id="behaviorNotes"
                    value={newPet.behaviorNotes}
                    onChange={(e) => setNewPet({ ...newPet, behaviorNotes: e.target.value })}
                    placeholder="Temperament, training status, compatibility with kids/pets, etc."
                    rows={4}
                  />
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4">
                <div>
                  <Label>Medical Records</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload vaccination records, medical history</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Upload Documents
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Intake Forms</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload intake forms and surrender documents</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Upload Forms
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPet} className="bg-gradient-to-r from-purple-500 to-pink-500">
                Add Pet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search pets by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="adopted">Adopted</SelectItem>
                <SelectItem value="medical hold">Medical Hold</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {pets.filter((p) => p.status === "Available").length}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {pets.filter((p) => p.status === "Pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{pets.filter((p) => p.status === "Adopted").length}</div>
            <div className="text-sm text-gray-600">Adopted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{pets.length}</div>
            <div className="text-sm text-gray-600">Total Pets</div>
          </CardContent>
        </Card>
      </div>

      {/* Pet List */}
      <Card>
        <CardHeader>
          <CardTitle>Pet Listings ({filteredPets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPets.map((pet) => (
              <div key={pet.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                    <Badge className={getStatusColor(pet.status)}>{pet.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{pet.breed}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{pet.age}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Weight className="w-3 h-3" />
                      <span>{pet.weight}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{pet.location}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">${pet.adoptionFee}</div>
                  <div className="text-xs text-gray-500">Added {pet.dateAdded}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeletePet(pet.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
