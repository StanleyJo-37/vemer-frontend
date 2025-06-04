"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Users, Calendar, MapPin, Search, Bell, Eye, CheckCircle } from "lucide-react"
import { EditActivityDialog } from "./edit-activity-dialog"
import { SendNotificationDialog } from "./send-notification-dialog"
import { ActivityDetailsDialog } from "./activity-details-dialog"
import { EndEventDialog } from "./end-event-dialog"

// Mock data for publisher's activities
const mockPublisherActivities = [
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
    points: 150,
    image: "/placeholder.svg?height=200&width=300",
    badge: {
      name: "Garden Guardian",
      description: "Participated in community garden cleanup",
      rarity: "Common",
      icon: "🌱",
    },
    participants: [
      {
        id: "p1",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        joinedAt: "2025-06-10T14:30:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "confirmed",
      },
      {
        id: "p2",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1 (555) 987-6543",
        joinedAt: "2025-06-11T09:15:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "confirmed",
      },
      {
        id: "p3",
        name: "Mike Chen",
        email: "mike.chen@email.com",
        phone: "+1 (555) 456-7890",
        joinedAt: "2025-06-12T16:45:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "pending",
      },
    ],
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
    points: 200,
    image: "/placeholder.svg?height=200&width=300",
    badge: {
      name: "Ocean Protector",
      description: "Helped protect marine life through beach cleanup",
      rarity: "Uncommon",
      icon: "🌊",
    },
    participants: [
      {
        id: "p4",
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 234-5678",
        joinedAt: "2025-06-09T11:20:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "confirmed",
      },
      {
        id: "p5",
        name: "David Wilson",
        email: "david.w@email.com",
        phone: "+1 (555) 345-6789",
        joinedAt: "2025-06-10T13:30:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "confirmed",
      },
    ],
  },
  {
    id: "3",
    title: "Food Bank Volunteer Day",
    description: "Volunteer at the local food bank to help those in need.",
    category: "Community Service",
    location: "Downtown Food Bank",
    date: "2025-06-10",
    time: "10:00",
    price: "Free",
    isFree: true,
    maxParticipants: 15,
    currentParticipants: 15,
    status: "completed",
    points: 180,
    image: "/placeholder.svg?height=200&width=300",
    participants: [
      {
        id: "p6",
        name: "Lisa Brown",
        email: "lisa.brown@email.com",
        phone: "+1 (555) 567-8901",
        joinedAt: "2025-06-05T10:00:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "completed",
      },
    ],
  },
]

export function MyActivities() {
  const [activities, setActivities] = useState(mockPublisherActivities)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingActivity, setEditingActivity] = useState<any>(null)
  const [notificationActivity, setNotificationActivity] = useState<any>(null)
  const [viewingActivity, setViewingActivity] = useState<any>(null)
  const [endingActivity, setEndingActivity] = useState<any>(null)

  const filteredActivities = activities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteActivity = (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      setActivities(activities.filter((activity) => activity.id !== id))
    }
  }

  const handleUpdateActivity = (updatedActivity: any) => {
    setActivities(activities.map((activity) => (activity.id === updatedActivity.id ? updatedActivity : activity)))
    setEditingActivity(null)
  }

  const handleRemoveParticipant = (activityId: string, participantId: string) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === activityId) {
          return {
            ...activity,
            participants: activity.participants.filter((p: any) => p.id !== participantId),
            currentParticipants: activity.currentParticipants - 1,
          }
        }
        return activity
      }),
    )
  }

  const handleEndEvent = (activityId: string, attendanceData: { [key: string]: boolean }) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === activityId) {
          return {
            ...activity,
            status: "completed",
          }
        }
        return activity
      }),
    )
    setEndingActivity(null)
  }

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

  const canEndEvent = (activity: any) => {
    const eventDate = new Date(activity.date)
    const today = new Date()
    return activity.status === "active" && eventDate <= today
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sky-900">My Activities</h2>
          <p className="text-gray-600">Manage and track your published activities</p>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card
            key={activity.id}
            className="overflow-hidden border-sky-100 hover:border-sky-200 hover:shadow-lg transition-all duration-200 h-[580px] flex flex-col"
          >
            <div className="aspect-video bg-gray-100 relative flex-shrink-0">
              <img
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <Badge className={`absolute top-2 right-2 ${getStatusColor(activity.status)}`}>{activity.status}</Badge>
            </div>
            <CardHeader className="flex-shrink-0 pb-3">
              <CardTitle className="text-lg text-sky-900 line-clamp-1">{activity.title}</CardTitle>
              <CardDescription className="line-clamp-2 h-10">{activity.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6 pt-0">
              <div className="space-y-2 text-sm text-gray-600 mb-4 px-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-sky-600 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {new Date(activity.date).toLocaleDateString()} at {activity.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-600 flex-shrink-0" />
                  <span className="line-clamp-1">{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-sky-600 flex-shrink-0" />
                  <span>
                    {activity.currentParticipants}/{activity.maxParticipants} participants
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Rewards Section */}
                <div className="bg-sky-50 p-3 rounded-lg border border-sky-200">
                  <h4 className="text-sm font-semibold text-sky-900 mb-2">Event Rewards</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">⭐</span>
                      <span>{activity.points} points</span>
                    </div>
                    {activity.badge && (
                      <div className="flex items-center gap-2">
                        <span>{activity.badge.icon}</span>
                        <span>{activity.badge.name} badge</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingActivity(activity)}
                    className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNotificationActivity(activity)}
                    className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300"
                  >
                    <Bell className="h-4 w-4 mr-1" />
                    Notify
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingActivity(activity)}
                    className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {canEndEvent(activity) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEndingActivity(activity)}
                      className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      End Event
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-sky-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-sky-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
          <p className="text-gray-600">
            {searchQuery ? "Try adjusting your search terms" : "Create your first activity to get started"}
          </p>
        </div>
      )}

      {editingActivity && (
        <EditActivityDialog
          activity={editingActivity}
          onClose={() => setEditingActivity(null)}
          onUpdate={handleUpdateActivity}
        />
      )}

      {notificationActivity && (
        <SendNotificationDialog activity={notificationActivity} onClose={() => setNotificationActivity(null)} />
      )}

      {viewingActivity && (
        <ActivityDetailsDialog
          activity={viewingActivity}
          onClose={() => setViewingActivity(null)}
          onRemoveParticipant={handleRemoveParticipant}
        />
      )}

      {endingActivity && (
        <EndEventDialog
          activity={endingActivity}
          onClose={() => setEndingActivity(null)}
          onEndEvent={(attendanceData: { [key: string]: boolean }) => handleEndEvent(endingActivity.id, attendanceData)}
        />
      )}
    </div>
  )
}
