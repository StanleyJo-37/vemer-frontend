"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, MapPin, Star, Users, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const participatedEvents = [
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
]

export function ParticipatedEvents() {
  const router = useRouter()

  const handleViewEvent = (eventId: string) => {
    router.push(`/activities/${eventId}`)
  }

  const handleViewAllHistory = () => {
    router.push("/user-dashboard/history")
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="border-sky-100 h-full">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Recent Participation
            </CardTitle>
            <CardDescription>Your latest completed events</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllHistory}
            className="border-sky-200 text-sky-700 hover:bg-sky-50 self-start sm:self-auto"
          >
            View History
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {participatedEvents.map((event) => (
            <div
              key={event.id}
              className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-sky-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleViewEvent(event.id)}
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full sm:w-20 h-16 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{event.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs cursor-default">
                        {event.category}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs cursor-default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-sky-600" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-sky-600" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-sky-600" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>+{event.pointsEarned} points</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Your rating:</span>
                      <div className="flex items-center gap-1">{renderStars(event.rating)}</div>
                    </div>
                    <Badge className="bg-sky-100 text-sky-800 border-sky-200 text-xs cursor-default self-start">
                      +{event.pointsEarned} pts
                    </Badge>
                  </div>

                  {event.feedback && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600 italic">"{event.feedback}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {participatedEvents.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed events yet</h3>
            <p className="text-gray-600 mb-4">Start participating in community events to build your history!</p>
            <Button onClick={() => router.push("/activities")} className="bg-sky-600 hover:bg-sky-700">
              Find Events
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
