"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

// Mock data for recent activities with updates
const recentActivities = [
  {
    id: "1",
    title: "Community Garden Cleanup",
    description: "Join us for a morning of beautifying our local community garden.",
    category: "Environmental",
    location: "Central Park Community Garden",
    date: "2025-06-15",
    time: "09:00",
    price: "Free",
    isFree: true,
    maxParticipants: 25,
    currentParticipants: 18,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdate: "5 new participants joined",
    updateType: "participants",
    updatedAt: "2025-06-14T10:30:00Z",
  },
  {
    id: "2",
    title: "Beach Cleanup Drive",
    description: "Help us clean up the beach and protect marine life.",
    category: "Environmental",
    location: "Sunset Beach",
    date: "2025-06-20",
    time: "08:00",
    price: "Free",
    isFree: true,
    maxParticipants: 50,
    currentParticipants: 32,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdate: "Location updated",
    updateType: "location",
    updatedAt: "2025-06-13T14:15:00Z",
  },
]

export function RecentActivityCards() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-sky-100 text-sky-800 border-sky-200"
    }
  }

  const getUpdateColor = (updateType: string) => {
    switch (updateType) {
      case "participants":
        return "bg-green-50 text-green-700 border-green-200"
      case "location":
        return "bg-sky-50 text-sky-700 border-sky-200"
      case "messages":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="border-sky-100 hover:border-sky-200 transition-colors">
      <CardHeader>
        <CardTitle className="text-sky-900">Recent Activity</CardTitle>
        <CardDescription>Latest updates on your events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentActivities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden border-sky-100 hover:border-sky-200 hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(activity.status)}`}>{activity.status}</Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-sky-900 line-clamp-1">{activity.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{activity.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-sky-600" />
                    <span>
                      {new Date(activity.date).toLocaleDateString()} at {activity.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-sky-600" />
                    <span className="line-clamp-1">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-sky-600" />
                    <span>
                      {activity.currentParticipants}/{activity.maxParticipants} participants
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getUpdateColor(activity.updateType)}`}>
                      {activity.lastUpdate}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(activity.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
