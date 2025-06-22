"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { PetManagement } from "@/components/admin/pet-management"
import { ApplicationManagement } from "@/components/admin/application-management"
import { InventoryManagement } from "@/components/admin/inventory-management"
import { UserManagement } from "@/components/admin/user-management"
import { Analytics } from "@/components/admin/analytics"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/components/providers/auth-provider"
import {
  LayoutDashboard,
  Heart,
  Users,
  Package,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

// Mock admin user data
const adminUser = {
  id: "admin_123",
  name: "Sarah Johnson",
  email: "sarah@happypaws.org",
  role: "Super Admin",
  shelter: "Happy Paws Rescue",
  avatar: "/placeholder.svg?height=40&width=40",
  permissions: ["all"],
}

function AdminContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pets", label: "Pet Management", icon: Heart },
    { id: "applications", label: "Applications", icon: Users },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "users", label: "User Management", icon: UserCog },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />
      case "pets":
        return <PetManagement />
      case "applications":
        return <ApplicationManagement />
      case "inventory":
        return <InventoryManagement />
      case "users":
        return <UserManagement />
      case "analytics":
        return <Analytics />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐾</span>
            </div>
            <span className="font-bold text-lg text-gray-800">Admin Panel</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar>
              <AvatarImage src={adminUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-800">{adminUser.name}</div>
              <div className="text-sm text-gray-500">{adminUser.role}</div>
              <Badge variant="outline" className="text-xs mt-1">
                {adminUser.shelter}
              </Badge>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-600">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700" onClick={logout}>
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab === "dashboard" ? "Dashboard" : navigationItems.find((item) => item.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm">
                View Site
              </Button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{renderContent()}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default function AdminPage() {
  return (
    <AuthGuard requireAuth={true}>
      <AdminContent />
    </AuthGuard>
  )
}
