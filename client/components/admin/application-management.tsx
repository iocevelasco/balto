"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  User,
  Calendar,
  Star,
  TagIcon as Label,
  TextIcon as Textarea,
} from "lucide-react"

const mockApplications = [
  {
    id: 1,
    applicantName: "Sarah Johnson",
    applicantEmail: "sarah.j@email.com",
    applicantPhone: "+1 (555) 123-4567",
    applicantAvatar: "/placeholder.svg?height=40&width=40",
    petName: "Brook",
    petBreed: "Pembroke Welsh Corgi",
    petImage: "/placeholder.svg?height=60&width=60",
    status: "Under Review",
    submittedDate: "2024-01-20",
    score: 85,
    experience: "First-time pet owner",
    housingType: "House with yard",
    familySize: "2 adults, 1 child",
    references: 2,
    notes: "Very enthusiastic about adopting. Has done research on the breed.",
    timeline: [
      { date: "2024-01-20", action: "Application submitted", status: "completed" },
      { date: "2024-01-21", action: "Initial review", status: "completed" },
      { date: "2024-01-22", action: "Reference check", status: "in-progress" },
      { date: "", action: "Home visit", status: "pending" },
      { date: "", action: "Final approval", status: "pending" },
    ],
  },
  {
    id: 2,
    applicantName: "Mike Chen",
    applicantEmail: "mike.chen@email.com",
    applicantPhone: "+1 (555) 234-5678",
    applicantAvatar: "/placeholder.svg?height=40&width=40",
    petName: "Whiskers",
    petBreed: "Maine Coon",
    petImage: "/placeholder.svg?height=60&width=60",
    status: "Approved",
    submittedDate: "2024-01-18",
    score: 92,
    experience: "Has owned cats for 10+ years",
    housingType: "Apartment",
    familySize: "2 adults",
    references: 2,
    notes: "Excellent references. Previous cat lived to 18 years old.",
    timeline: [
      { date: "2024-01-18", action: "Application submitted", status: "completed" },
      { date: "2024-01-19", action: "Initial review", status: "completed" },
      { date: "2024-01-20", action: "Reference check", status: "completed" },
      { date: "2024-01-21", action: "Home visit", status: "completed" },
      { date: "2024-01-22", action: "Final approval", status: "completed" },
    ],
  },
  {
    id: 3,
    applicantName: "Emily Davis",
    applicantEmail: "emily.d@email.com",
    applicantPhone: "+1 (555) 345-6789",
    applicantAvatar: "/placeholder.svg?height=40&width=40",
    petName: "Luna",
    petBreed: "Siberian Husky",
    petImage: "/placeholder.svg?height=60&width=60",
    status: "Pending",
    submittedDate: "2024-01-22",
    score: 78,
    experience: "Had dogs in childhood",
    housingType: "House with large yard",
    familySize: "1 adult",
    references: 1,
    notes: "Lives alone but has flexible work schedule. Very active lifestyle.",
    timeline: [
      { date: "2024-01-22", action: "Application submitted", status: "completed" },
      { date: "", action: "Initial review", status: "pending" },
      { date: "", action: "Reference check", status: "pending" },
      { date: "", action: "Home visit", status: "pending" },
      { date: "", action: "Final approval", status: "pending" },
    ],
  },
  {
    id: 4,
    applicantName: "Robert Wilson",
    applicantEmail: "robert.w@email.com",
    applicantPhone: "+1 (555) 456-7890",
    applicantAvatar: "/placeholder.svg?height=40&width=40",
    petName: "Charlie",
    petBreed: "Golden Retriever",
    petImage: "/placeholder.svg?height=60&width=60",
    status: "Rejected",
    submittedDate: "2024-01-15",
    score: 45,
    experience: "No previous pet experience",
    housingType: "Small apartment",
    familySize: "1 adult",
    references: 0,
    notes: "Insufficient space for large breed. No references provided.",
    timeline: [
      { date: "2024-01-15", action: "Application submitted", status: "completed" },
      { date: "2024-01-16", action: "Initial review", status: "completed" },
      { date: "2024-01-17", action: "Application rejected", status: "completed" },
    ],
  },
]

export function ApplicationManagement() {
  const [applications, setApplications] = useState(mockApplications)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.petName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))
  }

  const openApplicationDetail = (application: any) => {
    setSelectedApplication(application)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Application Management</h2>
          <p className="text-gray-600">Review and manage adoption applications</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by applicant name or pet name..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter((a) => a.status === "Pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {applications.filter((a) => a.status === "Under Review").length}
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter((a) => a.status === "Approved").length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{applications.length}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => openApplicationDetail(application)}
              >
                <Avatar>
                  <AvatarImage src={application.applicantAvatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {application.applicantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{application.applicantName}</h3>
                    <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Applying for {application.petName} ({application.petBreed})
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{application.submittedDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span className={getScoreColor(application.score)}>Score: {application.score}%</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{application.familySize}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  {application.status === "Under Review" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(application.id, "Approved")
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(application.id, "Rejected")
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedApplication.applicantAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedApplication.applicantName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedApplication.applicantName}</div>
                    <div className="text-sm font-normal text-gray-600">
                      Application for {selectedApplication.petName}
                    </div>
                  </div>
                  <Badge className={getStatusColor(selectedApplication.status)}>{selectedApplication.status}</Badge>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Applicant Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedApplication.applicantEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedApplication.applicantPhone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedApplication.familySize}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-gray-500" />
                          <span className={`text-sm font-medium ${getScoreColor(selectedApplication.score)}`}>
                            Match Score: {selectedApplication.score}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Pet Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedApplication.petImage || "/placeholder.svg"}
                            alt={selectedApplication.petName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{selectedApplication.petName}</h3>
                            <p className="text-sm text-gray-600">{selectedApplication.petBreed}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Application Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Experience:</span>
                          <p className="text-sm">{selectedApplication.experience}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Housing:</span>
                          <p className="text-sm">{selectedApplication.housingType}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">References:</span>
                          <p className="text-sm">{selectedApplication.references} provided</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Submitted:</span>
                          <p className="text-sm">{selectedApplication.submittedDate}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Notes:</span>
                        <p className="text-sm mt-1">{selectedApplication.notes}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Application</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Full application details would be displayed here, including all form responses, uploaded
                        documents, and reference information.
                      </p>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">Living Situation</h4>
                          <p className="text-sm text-gray-600">
                            Detailed information about the applicant's living situation, including home type, yard
                            space, other pets, and household members.
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">Pet Experience</h4>
                          <p className="text-sm text-gray-600">
                            Information about previous pet ownership, training experience, and understanding of pet care
                            responsibilities.
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">References</h4>
                          <p className="text-sm text-gray-600">
                            Contact information and notes from personal and veterinary references.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedApplication.timeline.map((step, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step.status === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : step.status === "in-progress"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {step.status === "completed" ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : step.status === "in-progress" ? (
                                <Clock className="w-4 h-4" />
                              ) : (
                                <div className="w-2 h-2 bg-current rounded-full" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{step.action}</h4>
                              {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Communication History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Application confirmation sent</p>
                            <p className="text-xs text-gray-500">Jan 20, 2024 at 2:30 PM</p>
                            <p className="text-sm text-gray-600 mt-1">Automated email confirming application receipt</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Reference check completed</p>
                            <p className="text-xs text-gray-500">Jan 21, 2024 at 10:15 AM</p>
                            <p className="text-sm text-gray-600 mt-1">Spoke with veterinarian - positive reference</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Send Communication</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="messageType">Message Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select message type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approval">Approval Notification</SelectItem>
                            <SelectItem value="rejection">Rejection Notice</SelectItem>
                            <SelectItem value="request-info">Request Additional Information</SelectItem>
                            <SelectItem value="schedule-visit">Schedule Home Visit</SelectItem>
                            <SelectItem value="custom">Custom Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Email subject line" />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Type your message here..." rows={4} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Schedule Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Application Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve Application
                        </Button>
                        <Button variant="destructive">
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Application
                        </Button>
                        <Button variant="outline">
                          <Clock className="w-4 h-4 mr-2" />
                          Put on Hold
                        </Button>
                        <Button variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Meet & Greet
                        </Button>
                      </div>
                      <div className="pt-4 border-t">
                        <Label htmlFor="adminNotes">Admin Notes</Label>
                        <Textarea id="adminNotes" placeholder="Add internal notes about this application..." rows={3} />
                        <Button variant="outline" className="mt-2">
                          Save Notes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
