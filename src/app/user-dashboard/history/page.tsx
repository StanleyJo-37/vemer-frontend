"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, MapPin, Star, Users, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const allParticipatedEvents = [
  {
    id: "past1",
    title: "Food Bank Volunteer Day",
    description: "Helped sort and distribute food to families in need at the downtown food bank.",
    category: "Community Service",
    location: "Downtown Food Bank",
    date: "2025-06-10",
    time: "10:00",
    image: "/placeholder.svg?height=120&width=200",
    completedAt: "2025-06-10T15:30:00Z",
    pointsEarned: 150,
    rating: 5,
    participants: 15,
    feedback: "Amazing experience helping the community!",
  },
  {
    id: "past2",
    title: "Park Beautification Project",
    description: "Planted flowers and cleaned up the local park to make it more welcoming for families.",
    category: "Environmental",
    location: "Riverside Park",
    date: "2025-06-05",
    time: "09:00",
    image: "/placeholder.svg?height=120&width=200",
    completedAt: "2025-06-05T13:00:00Z",
    pointsEarned: 120,
    rating: 4,
    participants: 22,
    feedback: "Great teamwork and visible impact!",
  },
  {
    id: "past3",
    title: "Senior Center Reading Program",
    description: "Read books and shared stories with elderly residents at the local senior center.",
    category: "Community Service",
    location: "Sunshine Senior Center",
    date: "2025-05-28",
    time: "14:00",
    image: "/placeholder.svg?height=120&width=200",
    completedAt: "2025-05-28T16:30:00Z",
    pointsEarned: 100,
    rating: 5,
    participants: 8,
    feedback: "Heartwarming conversations with wonderful people.",
  },
  {
    id: "past4",
    title: "Community Tech Workshop",
    description: "Taught basic computer skills to community members of all ages.",
    category: "Education",
    location: "Public Library",
    date: "2025-05-20",
    time: "13:00",
    image: "/placeholder.svg?height=120&width=200",
    completedAt: "2025-05-20T17:00:00Z",
    pointsEarned: 200,
    rating: 5,
    participants: 12,
    feedback: "Loved seeing people learn new skills!",
  },
  {
    id: "past5",
    title: "Neighborhood Cleanup Drive",
    description: "Cleaned up litter and debris from local streets and sidewalks.",
    category: "Environmental",
    location: "Main Street District",
    date: "2025-05-15",
    time: "08:00",
    image: "/placeholder.svg?height=120&width=200",
    completedAt: "2025-05-15T12:00:00Z",
    pointsEarned: 130,
    rating: 4,
    participants: 18,
    feedback: "Great way to start the weekend!",
  },
]

export default function HistoryPage() {
  const router = useRouter()

  const handleViewEvent = (eventId: string) => {
    router.push(`/activities/${eventId}`)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const totalPoints = allParticipatedEvents.reduce((sum, event) => sum + event.pointsEarned, 0)

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 hover:bg-sky-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Participation History</h1>
        <p className="text-gray-600 mt-2">All your completed community events</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="border-sky-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sky-600">{allParticipatedEvents.length}</div>
            <p className="text-sm text-gray-600">Events Completed</p>
          </CardContent>
        </Card>
        <Card className="border-sky-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
            <p className="text-sm text-gray-600">Total Points Earned</p>
          </CardContent>
        </Card>
        <Card className="border-sky-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {(
                allParticipatedEvents.reduce((sum, event) => sum + event.rating, 0) / allParticipatedEvents.length
              ).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="space-y-4 sm:space-y-6">
        {allParticipatedEvents.map((event) => (
          <Card
            key={event.id}
            className="border-sky-100 hover:border-sky-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => handleViewEvent(event.id)}
          >
            <div className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6">
              <div className="flex-shrink-0">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full lg:w-32 h-24 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{event.title}</h3>
                    <p className="text-gray-600 line-clamp-2 mt-1">{event.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-sky-600" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-600" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-sky-600" />
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>+{event.pointsEarned} points</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Your rating:</span>
                    <div className="flex items-center gap-1">{renderStars(event.rating)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-sky-100 text-sky-800 border-sky-200 text-xs">+{event.pointsEarned} pts</Badge>
                    <span className="text-xs text-gray-500">
                      Completed {new Date(event.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {event.feedback && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 italic">"{event.feedback}"</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {allParticipatedEvents.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No completed events yet</h3>
          <p className="text-gray-600 mb-6">Start participating in community events to build your history!</p>
          <Button onClick={() => router.push("/activities")} className="bg-sky-600 hover:bg-sky-700">
            Find Events
          </Button>
        </div>
      )}
    </div>
  )
}
