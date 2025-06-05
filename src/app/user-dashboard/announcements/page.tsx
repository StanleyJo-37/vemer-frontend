"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Clock, AlertCircle, Info, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const allAnnouncements = [
  {
    id: "1",
    title: "Beach Cleanup Drive - Location Update",
    message:
      "The meeting point has been changed to the north parking lot due to construction. Please arrive 15 minutes early for check-in.",
    type: "update",
    activityTitle: "Beach Cleanup Drive",
    publishedAt: "2025-06-13T14:15:00Z",
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
    priority: "low",
  },
  {
    id: "4",
    title: "Senior Center Reading Program - New Books Available",
    message:
      "We've received a donation of new books for our reading program! There are some wonderful new titles to share with our senior friends.",
    type: "info",
    activityTitle: "Senior Center Reading Program",
    publishedAt: "2025-06-11T09:20:00Z",
    priority: "low",
  },
  {
    id: "5",
    title: "Community Art Mural - Weather Update",
    message:
      "Due to expected rain this weekend, we're moving the mural painting session to next Saturday. Same time, same location!",
    type: "update",
    activityTitle: "Community Art Mural Project",
    publishedAt: "2025-06-10T15:30:00Z",
    priority: "high",
  },
]

export default function AnnouncementsPage() {
  const router = useRouter()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "update":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "info":
        return <Info className="h-5 w-5 text-green-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "update":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "reminder":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "info":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 hover:bg-sky-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Announcements</h1>
        <p className="text-gray-600 mt-2">Latest updates from event organizers</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {allAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`border-l-4 hover:shadow-md transition-all duration-200 ${getPriorityColor(announcement.priority)}`}
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  {getTypeIcon(announcement.type)}
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">{announcement.title}</CardTitle>
                    <CardDescription className="mt-1">
                      <Badge className={`${getTypeColor(announcement.type)} text-xs mr-2`}>{announcement.type}</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(announcement.publishedAt).toLocaleDateString()} at{" "}
                        {new Date(announcement.publishedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">{announcement.message}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
                  {announcement.activityTitle}
                </Badge>
                <Badge
                  className={`text-xs ${
                    announcement.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : announcement.priority === "normal"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {announcement.priority} priority
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {allAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No announcements</h3>
          <p className="text-gray-600">You'll see updates from event organizers here</p>
        </div>
      )}
    </div>
  )
}
