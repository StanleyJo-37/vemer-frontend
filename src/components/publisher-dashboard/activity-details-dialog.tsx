"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Search,
  UserMinus,
  Flag,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  XCircle,
  UserCheck,
} from "lucide-react"

// Import the useToast hook
import { useToast } from "@/hooks/useToast"

interface ActivityDetailsDialogProps {
  activity: any
  onClose: () => void
  onRemoveParticipant: (activityId: string, participantId: string) => void
}

export function ActivityDetailsDialog({ activity, onClose, onRemoveParticipant }: ActivityDetailsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [reportingParticipant, setReportingParticipant] = useState<any>(null)
  const [reportReason, setReportReason] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [participants, setParticipants] = useState(activity.participants || [])

  // Add the toast hook
  const { toast } = useToast()

  const filteredParticipants = participants.filter((participant: any) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || participant.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleRemoveParticipant = (participantId: string, participantName: string) => {
    if (confirm(`Are you sure you want to remove ${participantName} from this activity?`)) {
      onRemoveParticipant(activity.id, participantId)
      setParticipants(participants.filter((p: any) => p.id !== participantId))
    }
  }

  // Update the handleApproveParticipant function to show a toast notification
  const handleApproveParticipant = (participantId: string, participantName: string) => {
    if (confirm(`Approve ${participantName} for this activity?`)) {
      setParticipants(participants.map((p: any) => (p.id === participantId ? { ...p, status: "confirmed" } : p)))

      // Show a toast notification
      toast({
        title: "Participant Approved",
        description: `${participantName} has been approved for this activity.`,
        duration: 3000,
      })
    }
  }

  // Update the handleRejectParticipant function to show a toast notification
  const handleRejectParticipant = (participantId: string, participantName: string) => {
    if (confirm(`Reject ${participantName}'s registration for this activity?`)) {
      setParticipants(participants.map((p: any) => (p.id === participantId ? { ...p, status: "rejected" } : p)))

      // Show a toast notification
      toast({
        title: "Participant Rejected",
        description: `${participantName}'s registration has been rejected.`,
        duration: 3000,
      })
    }
  }

  const handleReportParticipant = (participant: any) => {
    setReportingParticipant(participant)
    setReportReason("")
    setReportDescription("")
  }

  const submitReport = () => {
    if (!reportReason || !reportDescription) {
      alert("Please fill in all report fields")
      return
    }

    // Here you would typically send the report to your backend
    alert(`Report submitted for ${reportingParticipant.name}`)
    setReportingParticipant(null)
    setReportReason("")
    setReportDescription("")
  }

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 hover:text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800"
      default:
        return "bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-100 hover:text-sky-800"
    }
  }

  // Update the getParticipantStatusColor function to include a distinct color for pending status
  const getParticipantStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 hover:text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100 hover:text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "cancelled":
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-600" />
    }
  }

  const pendingParticipants = participants.filter((p: any) => p.status === "pending")
  const isPaidActivity = !activity.isFree

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-sky-100">
          <DialogHeader className="border-b border-sky-100 pb-4">
            <DialogTitle className="text-sky-900 text-xl">{activity.title}</DialogTitle>
            <DialogDescription>Activity details and participant management</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Activity Details */}
            <div className="lg:col-span-1 h-full flex flex-col space-y-4">
              <Card className="flex-1 flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-lg">Activity Information</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col space-y-3">
                    <p className="text-sm text-gray-700 flex-shrink-0">{activity.description}</p>

                    <div className="space-y-2 text-sm flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-sky-600" />
                        <span>
                          {new Date(activity.date).toLocaleDateString()} at {activity.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sky-600" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-sky-600" />
                        <span>
                          {participants.filter((p: any) => p.status === "confirmed").length}/{activity.maxParticipants}{" "}
                          participants
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-sky-600" />
                        <span>{activity.isFree ? "Free" : `$${activity.price}`}</span>
                      </div>
                    </div>

                    <Badge className={`${getActivityStatusColor(activity.status)} w-fit cursor-default flex-shrink-0`}>
                      {activity.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals for Paid Activities */}
              {isPaidActivity && pendingParticipants.length > 0 && (
                <Card className="border-yellow-200 flex-shrink-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Pending Approvals ({pendingParticipants.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {pendingParticipants.map((participant: any) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-2 border border-yellow-200 rounded-lg bg-yellow-50"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-xs truncate">{participant.name}</p>
                              <p className="text-xs text-gray-600 truncate">{participant.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveParticipant(participant.id, participant.name)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 h-6 px-1"
                            >
                              <UserCheck className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectParticipant(participant.id, participant.name)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-6 px-1"
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Participants List */}
            <div className="lg:col-span-2 h-full">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      All Participants ({participants.filter((p: any) => p.status !== "rejected").length})
                    </CardTitle>
                  </div>
                  {/* Add a section for pending applications at the top of the participants list */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-800">Pending Applications</h3>
                    </div>

                    {pendingParticipants.length > 0 ? (
                      <div className="space-y-2">
                        {pendingParticipants.map((participant: any) => (
                          <div
                            key={participant.id}
                            className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-white"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <Avatar>
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900">{participant.name}</p>
                                <p className="text-sm text-gray-600 truncate">{participant.email}</p>
                                <p className="text-xs text-gray-500">
                                  Applied: {new Date(participant.joinedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveParticipant(participant.id, participant.name)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                              >
                                <UserCheck className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectParticipant(participant.id, participant.name)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No pending applications at this time.</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search participants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-sky-200 focus:border-sky-400 focus:ring-sky-400"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-48 border-sky-200 focus:border-sky-400 focus:ring-sky-400">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {filteredParticipants.map((participant: any) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-sky-200 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar>
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900 truncate">{participant.name}</p>
                              <Badge
                                className={`${getParticipantStatusColor(participant.status)} text-xs cursor-default`}
                              >
                                {getStatusIcon(participant.status)}
                                <span className="ml-1">{participant.status}</span>
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{participant.email}</span>
                              </div>
                              {participant.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span>{participant.phone}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Joined: {new Date(participant.joinedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {participant.status === "pending" && isPaidActivity && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveParticipant(participant.id, participant.name)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectParticipant(participant.id, participant.name)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportParticipant(participant)}
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                          >
                            <Flag className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveParticipant(participant.id, participant.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredParticipants.length === 0 && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No participants found</h3>
                        <p className="text-gray-600">
                          {searchQuery || filterStatus !== "all"
                            ? "Try adjusting your search or filter criteria"
                            : "No participants have joined this activity yet"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-sky-100">
            <Button onClick={onClose} className="bg-sky-600 hover:bg-sky-700 text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Participant Dialog */}
      {reportingParticipant && (
        <Dialog open={true} onOpenChange={() => setReportingParticipant(null)}>
          <DialogContent className="max-w-md border-orange-100">
            <DialogHeader className="border-b border-orange-100 pb-4">
              <DialogTitle className="text-orange-900 flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Report Participant
              </DialogTitle>
              <DialogDescription>Report {reportingParticipant.name} for inappropriate behavior</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Reason for Report</label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger className="border-gray-200 focus:border-orange-400 focus:ring-orange-400">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inappropriate-behavior">Inappropriate Behavior</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="spam">Spam or Promotional Content</SelectItem>
                    <SelectItem value="fake-profile">Fake Profile</SelectItem>
                    <SelectItem value="no-show">Repeated No-Shows</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Please provide details about the issue..."
                  rows={4}
                  className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-orange-100">
              <Button variant="outline" onClick={() => setReportingParticipant(null)} className="border-gray-300">
                Cancel
              </Button>
              <Button onClick={submitReport} className="bg-orange-600 hover:bg-orange-700 text-white">
                Submit Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
