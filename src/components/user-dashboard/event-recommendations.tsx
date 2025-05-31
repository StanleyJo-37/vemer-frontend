"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Calendar, MapPin, Users, Heart, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const recommendations = [
  {
    id: "rec1",
    title: "Tree Planting Initiative",
    description: "Help us plant 100 trees in the downtown area to improve air quality and create green spaces.",
    category: "Environmental",
    location: "Downtown Park",
    date: "2025-06-25",
    time: "10:00",
    image: "/placeholder.svg?height=120&width=200",
    matchReason: "Based on your Environmental activities",
    spotsLeft: 15,
    totalSpots: 30,
  },
  {
    id: "rec2",
    title: "Senior Tech Support Workshop",
    description: "Teach elderly community members how to use smartphones and tablets for staying connected.",
    category: "Education",
    location: "Community Center",
    date: "2025-07-02",
    time: "14:00",
    image: "/placeholder.svg?height=120&width=200",
    matchReason: "Popular in your area",
    spotsLeft: 8,
    totalSpots: 12,
  },
  {
    id: "rec3",
    title: "Community Art Festival Setup",
    description: "Help set up booths and decorations for our annual community art festival celebrating local artists.",
    category: "Arts & Culture",
    location: "Main Street Plaza",
    date: "2025-07-15",
    time: "09:00",
    image: "/placeholder.svg?height=120&width=200",
    matchReason: "Trending this week",
    spotsLeft: 22,
    totalSpots: 40,
  },
]

export function EventRecommendations() {
  const router = useRouter()

  const handleViewEvent = (eventId: string) => {
    router.push(`/activities/${eventId}`)
  }

  const handleViewAllRecommendations = () => {
    router.push("/activities?filter=recommended")
  }

  return (
    <Card className="border-sky-100 h-full">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Recommended for You
            </CardTitle>
            <CardDescription>Events we think you'll love</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllRecommendations}
            className="border-sky-200 text-sky-700 hover:bg-sky-50"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {recommendations.map((event) => (
            <div
              key={event.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-sky-200 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleViewEvent(event.id)}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{event.title}</h3>
                    <Badge variant="outline" className="text-xs ml-2 cursor-default">
                      {event.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{event.description}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <Sparkles className="h-3 w-3 text-purple-600" />
                    <span className="text-xs text-purple-600 font-medium">{event.matchReason}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
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
                      <span>{event.spotsLeft} spots left</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">At {event.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle save for later
                  }}
                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 border-gray-200"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewEvent(event.id)
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                  Join Event
                </Button>
              </div>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations yet</h3>
            <p className="text-gray-600 mb-4">Join more events to get personalized recommendations!</p>
            <Button onClick={handleViewAllRecommendations} className="bg-sky-600 hover:bg-sky-700">
              Browse All Events
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
