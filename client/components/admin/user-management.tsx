"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, UserPlus, Shield, Mail, Phone, Calendar, Edit, Trash2, MoreHorizontal, Key } from "lucide-react"

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@happypaws.org",
    phone: "+1 (555) 123-4567",
    role: "Super Admin",
    department: "Administration",
    status: "Active",
    lastLogin: "2024-01-22",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.c@happypaws.org",
    phone: "+1 (555) 234-5678",
    role: "Shelter Manager",
    department: "Operations",
    status: "Active",
    lastLogin: "2024-01-22",
    joinDate: "2023-08-20",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["pets", "applications", "inventory"],
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@happypaws.org",
    phone: "+1 (555) 345-6789",
    role: "Veterinarian",
    department: "Medical",
    status: "Active",
    lastLogin: "2024-01-21",
    joinDate: "2023-09-10",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["pets", "medical"],
  },
  {
    id: 4,
    name: "Robert Wilson",
    email: "robert.w@happypaws.org",
    phone: "+1 (555) 456-7890",
    role: "Volunteer",
    department: "Care",
    status: "Inactive",
    lastLogin: "2024-01-15",
    joinDate: "2023-11-05",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["pets"],
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@happypaws.org",
    phone: "+1 (555) 567-8901",
    role: "Adoption Coordinator",
    department: "Adoptions",
    status: "Active",
    lastLogin: "2024-01-22",
    joinDate: "2023-07-30",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["applications", "communication"],
  },
]

const roles = [
  {
    name: "Super Admin",
    description: "Full access to all system features",
    permissions: ["all"],
    color: "bg-red-100 text-red-800",
  },
  {
    name: "Shelter Manager",
    description: "Manage shelter operations and staff",
    permissions: ["pets", "applications", "inventory", "users"],
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Veterinarian",
    description: "Manage pet health and medical records",
    permissions: ["pets", "medical"],
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Adoption Coordinator",
    description: "Handle adoption applications and communications",
    permissions: ["applications", "communication"],
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Volunteer",
    description: "Basic pet care and limited access",
    permissions: ["pets"],
    color: "bg-yellow-100 text-yellow-800",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "Active",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase().replace(" ", "-") === roleFilter
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find((r) => r.name === role)
    return roleConfig ? roleConfig.color : "bg-gray-100 text-gray-800"
  }

  const handleAddUser = () => {
    const user = {
      ...newUser,
      id: users.length + 1,
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
      avatar: "/placeholder.svg?height=40&width=40",
      permissions: roles.find((r) => r.name === newUser.role)?.permissions || [],
    }
    setUsers([...users, user])
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "Active",
    })
    setIsAddDialogOpen(false)
  }

  const handleStatusToggle = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user,
      ),
    )
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600">Manage staff accounts, roles, and permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="user@happypaws.org"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newUser.department}
                  onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Adoptions">Adoptions</SelectItem>
                    <SelectItem value="Care">Care</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Add User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {users.filter((user) => user.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((user) => user.role.includes("Admin") || user.role.includes("Manager")).length}
            </div>
            <div className="text-sm text-gray-600">Administrators</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter((user) => user.role === "Volunteer").length}
            </div>
            <div className="text-sm text-gray-600">Volunteers</div>
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
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super-admin">Super Admin</SelectItem>
                <SelectItem value="shelter-manager">Shelter Manager</SelectItem>
                <SelectItem value="veterinarian">Veterinarian</SelectItem>
                <SelectItem value="adoption-coordinator">Adoption Coordinator</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Roles Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <span>Role Definitions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={role.color}>{role.name}</Badge>
                  <span className="text-sm text-gray-600">
                    ({users.filter((user) => user.role === role.name).length})
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                <div className="text-xs text-gray-500">Permissions: {role.permissions.join(", ")}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{user.phone}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Last login: {user.lastLogin}</span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Department: {user.department} • Joined: {user.joinDate}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`status-${user.id}`} className="text-sm">
                      Active
                    </Label>
                    <Switch
                      id={`status-${user.id}`}
                      checked={user.status === "Active"}
                      onCheckedChange={() => handleStatusToggle(user.id)}
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Key className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
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
