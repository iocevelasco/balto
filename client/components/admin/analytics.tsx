"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, TrendingDown, Users, Heart, DollarSign, Download } from "lucide-react"
import { useState } from "react"

// Mock data for charts (in a real app, this would come from your analytics service)
const mockAnalyticsData = {
  adoptionStats: {
    thisMonth: 34,
    lastMonth: 26,
    thisYear: 287,
    lastYear: 245,
  },
  petStats: {
    totalPets: 156,
    available: 89,
    pending: 23,
    adopted: 44,
  },
  applicationStats: {
    total: 145,
    approved: 78,
    pending: 23,
    rejected: 44,
  },
  revenueStats: {
    thisMonth: 4280,
    lastMonth: 3720,
    thisYear: 42800,
    lastYear: 38500,
  },
  monthlyAdoptions: [
    { month: "Jan", adoptions: 28, applications: 45 },
    { month: "Feb", adoptions: 32, applications: 52 },
    { month: "Mar", adoptions: 25, applications: 38 },
    { month: "Apr", adoptions: 29, applications: 41 },
    { month: "May", adoptions: 35, applications: 48 },
    { month: "Jun", adoptions: 31, applications: 44 },
    { month: "Jul", adoptions: 38, applications: 55 },
    { month: "Aug", adoptions: 42, applications: 58 },
    { month: "Sep", adoptions: 36, applications: 49 },
    { month: "Oct", adoptions: 33, applications: 46 },
    { month: "Nov", adoptions: 29, applications: 42 },
    { month: "Dec", adoptions: 34, applications: 47 },
  ],
  petBreakdown: [
    { type: "Dogs", count: 89, percentage: 57 },
    { type: "Cats", count: 52, percentage: 33 },
    { type: "Rabbits", count: 12, percentage: 8 },
    { type: "Birds", count: 3, percentage: 2 },
  ],
  ageBreakdown: [
    { range: "0-1 years", count: 45, percentage: 29 },
    { range: "1-3 years", count: 62, percentage: 40 },
    { range: "3-7 years", count: 38, percentage: 24 },
    { range: "7+ years", count: 11, percentage: 7 },
  ],
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState("month")
  const [reportType, setReportType] = useState("overview")

  const calculatePercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
    }
  }

  const adoptionChange = calculatePercentageChange(
    mockAnalyticsData.adoptionStats.thisMonth,
    mockAnalyticsData.adoptionStats.lastMonth,
  )
  const revenueChange = calculatePercentageChange(
    mockAnalyticsData.revenueStats.thisMonth,
    mockAnalyticsData.revenueStats.lastMonth,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>
          <p className="text-gray-600">Track shelter performance and generate insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Adoptions This Month</p>
                <p className="text-3xl font-bold text-gray-800">{mockAnalyticsData.adoptionStats.thisMonth}</p>
                <div className="flex items-center space-x-1 mt-1">
                  {adoptionChange.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ${adoptionChange.isPositive ? "text-green-600" : "text-red-600"}`}>
                    {adoptionChange.value}% vs last month
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-800">{mockAnalyticsData.applicationStats.total}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {mockAnalyticsData.applicationStats.pending} pending review
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue This Month</p>
                <p className="text-3xl font-bold text-gray-800">${mockAnalyticsData.revenueStats.thisMonth}</p>
                <div className="flex items-center space-x-1 mt-1">
                  {revenueChange.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ${revenueChange.isPositive ? "text-green-600" : "text-red-600"}`}>
                    {revenueChange.value}% vs last month
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Pets</p>
                <p className="text-3xl font-bold text-gray-800">{mockAnalyticsData.petStats.available}</p>
                <p className="text-sm text-gray-500 mt-1">of {mockAnalyticsData.petStats.totalPets} total pets</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <Tabs value={reportType} onValueChange={setReportType} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="adoptions">Adoptions</TabsTrigger>
          <TabsTrigger value="pets">Pet Demographics</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Adoption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {mockAnalyticsData.monthlyAdoptions.slice(-6).map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center space-y-2">
                      <div className="flex flex-col items-center space-y-1">
                        <div
                          className="w-8 bg-purple-500 rounded-t"
                          style={{ height: `${(data.adoptions / 50) * 200}px` }}
                        />
                        <div
                          className="w-8 bg-purple-300 rounded-t"
                          style={{ height: `${(data.applications / 60) * 200}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{data.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded" />
                    <span className="text-sm text-gray-600">Adoptions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-300 rounded" />
                    <span className="text-sm text-gray-600">Applications</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Application Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Approved</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{
                            width: `${(mockAnalyticsData.applicationStats.approved / mockAnalyticsData.applicationStats.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{mockAnalyticsData.applicationStats.approved}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pending</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-500 rounded-full"
                          style={{
                            width: `${(mockAnalyticsData.applicationStats.pending / mockAnalyticsData.applicationStats.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{mockAnalyticsData.applicationStats.pending}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rejected</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-red-500 rounded-full"
                          style={{
                            width: `${(mockAnalyticsData.applicationStats.rejected / mockAnalyticsData.applicationStats.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{mockAnalyticsData.applicationStats.rejected}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="adoptions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Adoption Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {Math.round(
                      (mockAnalyticsData.adoptionStats.thisYear / mockAnalyticsData.applicationStats.total) * 100,
                    )}
                    %
                  </div>
                  <p className="text-gray-600">Applications resulting in adoptions</p>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      {mockAnalyticsData.adoptionStats.thisYear} successful adoptions from{" "}
                      {mockAnalyticsData.applicationStats.total} applications this year
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Time to Adoption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dogs</span>
                    <Badge variant="outline">18 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cats</span>
                    <Badge variant="outline">24 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rabbits</span>
                    <Badge variant="outline">32 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Birds</span>
                    <Badge variant="outline">45 days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pet Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalyticsData.petBreakdown.map((pet) => (
                    <div key={pet.type} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{pet.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${pet.percentage}%` }} />
                        </div>
                        <span className="text-sm text-gray-600">{pet.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalyticsData.ageBreakdown.map((age) => (
                    <div key={age.range} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{age.range}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${age.percentage}%` }} />
                        </div>
                        <span className="text-sm text-gray-600">{age.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-medium">${mockAnalyticsData.revenueStats.thisMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Year</span>
                    <span className="font-medium">${mockAnalyticsData.revenueStats.thisYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average per Adoption</span>
                    <span className="font-medium">
                      ${Math.round(mockAnalyticsData.revenueStats.thisYear / mockAnalyticsData.adoptionStats.thisYear)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Medical Care</span>
                    <span className="font-medium">$12,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Food & Supplies</span>
                    <span className="font-medium">$8,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Facility Costs</span>
                    <span className="font-medium">$6,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Staff & Operations</span>
                    <span className="font-medium">$15,600</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Net Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">+$42,800</div>
                  <p className="text-sm text-gray-600 mb-4">Total revenue this year</p>
                  <div className="text-lg font-bold text-red-600 mb-2">-$43,000</div>
                  <p className="text-sm text-gray-600 mb-4">Total expenses this year</p>
                  <div className="border-t pt-4">
                    <div className="text-xl font-bold text-gray-800">-$200</div>
                    <p className="text-sm text-gray-600">Net result</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
