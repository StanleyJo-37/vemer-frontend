"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Users, User, Star, Award } from "lucide-react"
import { useRouter } from "next/navigation"

interface ActivityCardProps {
  id?: string
  title: string
  images: string[]
  date: string
  location: string
  price: string
  category: string
  description?: string
  benefits?: string
  organizer: string
  maxParticipants: number
  currentParticipants: number
  points?: number
  badge?: {
    name: string
    description: string
    rarity: string
    icon: string
  }
}

export function ActivityCard({
  id,
  title,
  images,
  date,
  location,
  price,
  category,
  description,
  benefits,
  organizer,
  maxParticipants,
  currentParticipants,
  points = 0,
  badge,
}: ActivityCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    if (id) {
      router.push(`/activities/${id}`)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Gallery */}
      <div className="aspect-video bg-gray-100 relative">
        <img src={images[0] || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-white text-gray-800 cursor-default">{category}</Badge>
        {images.length > 1 && (
          <Badge className="absolute top-2 left-2 bg-black/70 text-white cursor-default">
            +{images.length - 1} photos
          </Badge>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>{price === "Free" ? "Free" : `$${price}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>
              {currentParticipants}/{maxParticipants} participants
            </span>
          </div>
        </div>

        {/* About This Event */}
        {description && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">About This Event</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          </div>
        )}

        {/* What Will You Get */}
        {benefits && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">What Will You Get?</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{benefits}</p>
          </div>
        )}

        {/* Rewards Section */}
        {points !== undefined || badge !== undefined ? (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Event Rewards</h4>
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-3 min-h-[100px] flex flex-col justify-center">
              <div className="space-y-2">
                {/* Points */}
                {points !== undefined && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">{points} points</span>
                  </div>
                )}

                {/* Badge */}
                {badge && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">{badge.name} badge</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Organizer */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-sky-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{organizer}</p>
            <p className="text-xs text-gray-600">Event Organizer</p>
          </div>
        </div>

        {/* Action Button */}
        <Button onClick={handleViewDetails} className="w-full bg-sky-600 hover:bg-sky-700">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
