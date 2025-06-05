"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const allUpcomingEvents = [
  {
    id: "1",
    title: "Community Garden Cleanup",
    description: "Join us for a morning of beautifying our local community garden.",
    category: "Environmental",
    location: "Central Park Community Garden",
    date: "2025-06-15",
    time: "09:00",
    image: "/placeholder.svg?height=120&width=200",
    registeredAt: "2025-06-10T14:30:00Z",
    spotsLeft: 7,
    totalSpots: 25,
  },
  {
    id: "2",
    title: "Beach Cleanup Drive",
    description: "Help us protect marine life and keep our beaches beautiful.",
    category: "Environmental",
    location: "Sunset Beach",
    date: "2025-06-20",
    time: "08:00",
    image: "/placeholder.svg?height=120&width=200",
    registeredAt: "2025-06-11T09:15:00Z",
    spotsLeft: 18,
    totalSpots: 50,
  },
  {
    id: "3",
    title: "Youth Coding Workshop",
    description: "Introduce young people to programming through hands-on learning.",
    category: "Education",
    location: "Tech Innovation Hub",
    date: "2025-07-08",
    time: "14:00",
    image: "/placeholder.svg?height=120&width=200",
    registeredAt: "2025-06-12T16:45:00Z",
    spotsLeft: 3,
    totalSpots: 20,
  },
  {
    id: "4",
    title: "Senior Center Reading Program",
    description: "Bring joy to elderly residents by participating in our reading program.",
    category: "Community Service",
    location: "Sunshine Senior Center",
    date: "2025-07-02",
    time: "14:00",
    image: "/placeholder.svg?height=120&width=200",
    registeredAt: "2025-06-09T11:20:00Z",
    spotsLeft: 4,
    totalSpots: 12,
  },
  {
    id: "5",
    title: "Community Art Mural Project",
    description: "Be part of creating a beautiful mural that represents our diverse community.",
    category: "Arts & Culture",
    location: "Community Center Wall",
    date: "2025-07-12",
    time: "10:00",
    image: "/placeholder.svg?height=120&width=200",
    registeredAt: "2025-06-13T16:00:00Z",
    spotsLeft: 8,
    totalSpots: 30,
  },
]

export default function UpcomingEventsPage() {
  const router = useRouter()

  const handleViewEvent = (eventId: string) => {
    router.push(`/activities/${eventId}`)
  }

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 hover:bg-sky-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Upcoming Events</h1>
        <p className="text-gray-600 mt-2">All events you're registered for</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allUpcomingEvents.map((event) => {
          const daysUntil = getDaysUntilEvent(event.date)
          return (
            <Card
              key={event.id}
              className="border-sky-100 hover:border-sky-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleViewEvent(event.id)}
            >
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <Badge variant="outline" className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm">
                  {event.category}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-sky-900 line-clamp-2">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-sky-600" />
                    <span>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                      {daysUntil === 0 && <span className="text-green-600 font-medium ml-1">(Today!)</span>}
                      {daysUntil === 1 && <span className="text-orange-600 font-medium ml-1">(Tomorrow)</span>}
                      {daysUntil > 1 && <span className="text-gray-500 ml-1">({daysUntil} days)</span>}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-600" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-sky-600" />
                    <span>
                      {event.spotsLeft} spots left of {event.totalSpots}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Registered on {new Date(event.registeredAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {allUpcomingEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming events</h3>
          <p className="text-gray-600 mb-6">Discover and join community events to get started!</p>
          <Button onClick={() => router.push("/activities")} className="bg-sky-600 hover:bg-sky-700">
            Browse Events
          </Button>
        </div>
      )}
    </div>
  )
}
