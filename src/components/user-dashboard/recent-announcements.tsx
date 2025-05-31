"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Clock, AlertCircle, Info, CheckCircle, ArrowRight } from "lucide-react"

interface RecentAnnouncementsProps {
  newCount: number
}

const announcements = [
  {
    id: "1",
    title: "Beach Cleanup Drive - Location Update",
    message:
      "The meeting point has been changed to the north parking lot due to construction. Please arrive 15 minutes early for check-in.",
    type: "update",
    activityTitle: "Beach Cleanup Drive",
    publishedAt: "2025-06-13T14:15:00Z",
    isNew: true,
    priority: "high",
  },
  {
    id: "2",
    title: "Community Garden Cleanup - Reminder",
    message:
      "Don't forget about our community garden cleanup tomorrow at 9 AM! Please bring gloves and water. Tools will be provided.",
    type: "reminder",
    activityTitle: "Community Garden Cleanup",
    publishedAt: "2025-06-14T10:30:00Z",
    isNew: true,
    priority: "normal",
  },
  {
    id: "3",
    title: "Youth Coding Workshop - Materials Ready",
    message:
      "All laptops and learning materials are ready for next week's coding workshop. We're excited to see you there!",
    type: "info",
    activityTitle: "Youth Coding Workshop",
    publishedAt: "2025-06-12T16:45:00Z",
    isNew: false,
    priority: "low",
  },
]

export function RecentAnnouncements({ newCount }: RecentAnnouncementsProps) {
  const [readAnnouncements, setReadAnnouncements] = useState<string[]>([])

  const markAsRead = (announcementId: string) => {
    setReadAnnouncements((prev) => [...prev, announcementId])
  }

  const markAllAsRead = () => {
    setReadAnnouncements(announcements.map((a) => a.id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "update":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "reminder":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "info":
        return <Info className="h-4 w-4 text-green-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "update":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 pointer-events-none transition-none hover:animate-none"
      case "reminder":
        return "bg-blue-100 text-blue-800 border-blue-200 pointer-events-none transition-none hover:animate-none"
      case "info":
        return "bg-green-100 text-green-800 border-green-200 pointer-events-none transition-none hover:animate-none"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 pointer-events-none transition-none hover:animate-none"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "normal":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  const unreadCount = announcements.filter((a) => a.isNew && !readAnnouncements.includes(a.id)).length

  return (
    <Card className="border-sky-100 h-full">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-sky-600" />
              Recent Announcements
              {unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs px-2 py-1">{unreadCount} new</Badge>}
            </CardTitle>
            <CardDescription>Latest updates from event organizers</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="border-sky-200 text-sky-700 hover:bg-sky-50"
            >
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const isUnread = announcement.isNew && !readAnnouncements.includes(announcement.id)
            return (
              <div
                key={announcement.id}
                className={`p-4 border-l-4 rounded-lg border border-gray-200 hover:border-sky-200 transition-colors ${getPriorityColor(announcement.priority)} ${
                  isUnread ? "bg-blue-50" : "bg-white"
                }`}
                onClick={() => markAsRead(announcement.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(announcement.type)}
                    <h3 className={`font-semibold ${isUnread ? "text-gray-900" : "text-gray-700"}`}>
                      {announcement.title}
                    </h3>
                    {isUnread && <Badge className="bg-blue-500 text-white text-xs px-2 py-1 cursor-default">New</Badge>}
                  </div>
                  <Badge className={`${getTypeColor(announcement.type)} text-xs cursor-default`}>
                    {announcement.type}
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{announcement.message}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-sky-50 text-sky-700 px-2 py-1 rounded-full cursor-default">
                    {announcement.activityTitle}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(announcement.publishedAt).toLocaleDateString()} at{" "}
                      {new Date(announcement.publishedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {isUnread && (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        markAsRead(announcement.id)
                      }}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark as read
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements</h3>
            <p className="text-gray-600">You'll see updates from event organizers here</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button variant="outline" className="w-full border-sky-200 text-sky-700 hover:bg-sky-50">
            View All Notifications
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
