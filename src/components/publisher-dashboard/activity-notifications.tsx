"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Search, Send, Clock, CheckCircle } from "lucide-react"

// Mock notification history
const mockNotifications = [
  {
    id: "1",
    activityTitle: "Community Garden Cleanup",
    subject: "Reminder: Event Tomorrow",
    message: "Don't forget about our community garden cleanup tomorrow at 9 AM!",
    type: "reminder",
    sentAt: "2025-06-14T10:30:00Z",
    recipients: 18,
    status: "sent",
  },
  {
    id: "2",
    activityTitle: "Beach Cleanup Drive",
    subject: "Location Update",
    message: "The meeting point has been changed to the north parking lot.",
    type: "update",
    sentAt: "2025-06-13T14:15:00Z",
    recipients: 32,
    status: "sent",
  },
  {
    id: "3",
    activityTitle: "Food Bank Volunteer Day",
    subject: "Thank You!",
    message: "Thank you all for your amazing participation in today's volunteer event!",
    type: "general",
    sentAt: "2025-06-10T16:45:00Z",
    recipients: 15,
    status: "sent",
  },
]

export function ActivityNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.activityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || notification.type === filterType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reminder":
        return "bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-100 hover:text-sky-800"
      case "update":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-800"
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Send className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sky-900">Notification History</h2>
          <p className="text-gray-600">View and manage notifications sent to participants</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-sky-200 focus:border-sky-400 focus:ring-sky-400"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48 border-sky-200 focus:border-sky-400 focus:ring-sky-400">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="reminder">Reminder</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card key={notification.id} className="border-sky-100 hover:border-sky-200 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg text-sky-900">{notification.subject}</CardTitle>
                    <Badge className={`${getTypeColor(notification.type)} cursor-default`}>{notification.type}</Badge>
                    {getStatusIcon(notification.status)}
                  </div>
                  <CardDescription className="text-sm">Activity: {notification.activityTitle}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-700">{notification.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-sky-50 text-sky-700 px-2 py-1 rounded-full">
                    Sent to {notification.recipients} participants
                  </span>
                  <span>
                    {new Date(notification.sentAt).toLocaleDateString()} at{" "}
                    {new Date(notification.sentAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-sky-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Bell className="h-8 w-8 text-sky-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-600">
            {searchQuery || filterType !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Start sending notifications to your activity participants"}
          </p>
        </div>
      )}
    </div>
  )
}
