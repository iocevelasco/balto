"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Plus, Search, Package, Calendar, Edit, Trash2 } from "lucide-react"

const mockInventory = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Food",
    currentStock: 15,
    minStock: 20,
    maxStock: 100,
    unit: "bags",
    cost: 45.99,
    supplier: "Pet Nutrition Co.",
    lastRestocked: "2024-01-15",
    expiryDate: "2024-06-15",
    status: "Low Stock",
  },
  {
    id: 2,
    name: "Cat Litter",
    category: "Supplies",
    currentStock: 45,
    minStock: 30,
    maxStock: 80,
    unit: "bags",
    cost: 12.99,
    supplier: "Clean Paws Ltd.",
    lastRestocked: "2024-01-20",
    expiryDate: "2025-01-20",
    status: "In Stock",
  },
  {
    id: 3,
    name: "Vaccination Supplies",
    category: "Medical",
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: "units",
    cost: 89.99,
    supplier: "VetMed Supply",
    lastRestocked: "2024-01-10",
    expiryDate: "2024-03-10",
    status: "Critical",
  },
  {
    id: 4,
    name: "Dog Toys",
    category: "Supplies",
    currentStock: 25,
    minStock: 10,
    maxStock: 60,
    unit: "pieces",
    cost: 8.99,
    supplier: "Happy Pet Toys",
    lastRestocked: "2024-01-18",
    expiryDate: "N/A",
    status: "In Stock",
  },
]

export function InventoryManagement() {
  const [inventory, setInventory] = useState(mockInventory)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unit: "",
    cost: "",
    supplier: "",
    expiryDate: "",
  })

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Out of Stock":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return "Out of Stock"
    if (current <= min * 0.5) return "Critical"
    if (current <= min) return "Low Stock"
    return "In Stock"
  }

  const handleAddItem = () => {
    const item = {
      ...newItem,
      id: inventory.length + 1,
      currentStock: Number.parseInt(newItem.currentStock) || 0,
      minStock: Number.parseInt(newItem.minStock) || 0,
      maxStock: Number.parseInt(newItem.maxStock) || 0,
      cost: Number.parseFloat(newItem.cost) || 0,
      lastRestocked: new Date().toISOString().split("T")[0],
      status: getStockStatus(Number.parseInt(newItem.currentStock) || 0, Number.parseInt(newItem.minStock) || 0),
    }
    setInventory([...inventory, item])
    setNewItem({
      name: "",
      category: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unit: "",
      cost: "",
      supplier: "",
      expiryDate: "",
    })
    setIsAddDialogOpen(false)
  }

  const lowStockItems = inventory.filter((item) => item.status === "Low Stock" || item.status === "Critical")
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.cost, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
          <p className="text-gray-600">Track and manage shelter supplies and resources</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentStock">Current Stock *</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({ ...newItem, currentStock: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    placeholder="bags, pieces, etc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="maxStock">Max Stock</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) => setNewItem({ ...newItem, maxStock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cost">Cost per Unit ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={newItem.cost}
                  onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                  placeholder="Supplier name"
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Add Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-800">{lowStockItems.length} item(s) need attention</span>
            </div>
            <div className="mt-2 text-sm text-orange-700">
              {lowStockItems.map((item) => item.name).join(", ")} {lowStockItems.length === 1 ? "is" : "are"} running
              low
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{inventory.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {inventory.filter((item) => item.status === "In Stock").length}
            </div>
            <div className="text-sm text-gray-600">In Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <div className="text-sm text-gray-600">Low Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">${totalValue.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total Value</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search inventory items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInventory.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                      Stock: {item.currentStock} {item.unit}
                    </span>
                    <span>Min: {item.minStock}</span>
                    <span>Supplier: {item.supplier}</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Restocked: {item.lastRestocked}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">${item.cost}</div>
                  <div className="text-sm text-gray-500">per {item.unit}</div>
                  <div className="text-sm font-medium text-purple-600">
                    Total: ${(item.currentStock * item.cost).toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-500" />
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
