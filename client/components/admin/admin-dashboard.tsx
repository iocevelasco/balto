"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  UserPlus,
  Loader2,
  RefreshCw,
} from "lucide-react"
import { useAdminStats, useRecentActivities } from "@/hooks/use-admin"
import { useTranslations } from "@/lib/i18n"

const quickActions = [
  { label: "Add New Pet", action: "pets", icon: Heart },
  { label: "Review Applications", action: "applications", icon: Users },
  { label: "Update Inventory", action: "inventory", icon: Package },
  { label: "View Analytics", action: "analytics", icon: TrendingUp },
]

const urgentTasks = [
  {
    id: 1,
    title: "Review adoption application for Luna",
    priority: "High",
    dueDate: "Today",
    type: "application",
  },
  {
    id: 2,
    title: "Schedule vet appointment for Brook",
    priority: "Medium",
    dueDate: "Tomorrow",
    type: "health",
  },
  {
    id: 3,
    title: "Update inventory - Dog food running low",
    priority: "High",
    dueDate: "Today",
    type: "inventory",
  },
  {
    id: 4,
    title: "Follow up with pending adopters",
    priority: "Medium",
    dueDate: "This week",
    type: "communication",
  },
]

export function AdminDashboard() {
  const { t } = useTranslations()
  
  // API calls
  const { data: statsData, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useAdminStats()
  const { data: activitiesData, isLoading: activitiesLoading, error: activitiesError } = useRecentActivities(5)

  // Process stats data
  const dashboardStats = statsData ? [
    {
      title: "Total Pets",
      value: statsData.totalPets.toString(),
      change: "+12 this month",
      trend: "up",
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending Applications",
      value: statsData.pendingApplications.toString(),
      change: "+5 today",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Adoptions This Month",
      value: statsData.adoptionsThisMonth.toString(),
      change: "+8 vs last month",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Revenue",
      value: `$${statsData.revenue.toLocaleString()}`,
      change: "+15% vs last month",
      trend: "up",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ] : []

  // Process activities data
  const recentActivities = activitiesData?.data || []

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'adoption':
        return CheckCircle
      case 'application':
        return Users
      case 'pet_added':
        return Heart
      case 'inventory':
        return AlertTriangle
      case 'user_registered':
        return UserPlus
      default:
        return Clock
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'adoption':
        return 'text-green-600'
      case 'application':
        return 'text-blue-600'
      case 'pet_added':
        return 'text-purple-600'
      case 'inventory':
        return 'text-orange-600'
      case 'user_registered':
        return 'text-indigo-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMs = now.getTime() - time.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
            <p className="text-purple-100">
              Here's what's happening at Happy Paws Rescue today. You have 3 urgent tasks requiring attention.
            </p>
          </div>
          {statsError && (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => refetchStats()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          )}
        </div>
      </div>

      {/* Error States */}
      {statsError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            Failed to load dashboard statistics. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          dashboardStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                      <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activities
              {activitiesLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesError ? (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  Failed to load recent activities.
                </AlertDescription>
              </Alert>
            ) : activitiesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity: any) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity._id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{activity.message}</p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent activities to show.</p>
            )}
          </CardContent>
        </Card>

        {/* Urgent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Urgent Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentTasks.map((task) => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-800">{task.title}</h4>
                    <Badge
                      variant={task.priority === "High" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button key={action.action} variant="outline" className="h-auto p-4 flex flex-col space-y-2">
                  <Icon className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
