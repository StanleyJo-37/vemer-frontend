"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Users, Star, Award } from "lucide-react"
import { useRouter } from "next/navigation"

interface ActivityCardProps {
  id?: string
  title: string
  image: string
  date: string
  location: string
  price: string
  category: string
  description?: string
  maxParticipants?: number
  currentParticipants?: number
  isFree?: boolean
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
  image,
  date,
  location,
  price,
  category,
  description,
  maxParticipants,
  currentParticipants,
  isFree,
  points,
  badge,
}: ActivityCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    if (id) {
      router.push(`/activities/${id}`)
    }
  }

  const formatPrice = () => {
    if (isFree || price === "Free" || price === "0") {
      return "Free"
    }
    return `$${price}`
  }

  const getPriceColor = () => {
    if (isFree || price === "Free" || price === "0") {
      return "text-green-600"
    }
    return "text-sky-600"
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-100 relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-white text-gray-800">{category}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
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
            <DollarSign className={`h-4 w-4 ${getPriceColor()}`} />
            <span className={`font-semibold ${getPriceColor()}`}>{formatPrice()}</span>
          </div>
          {maxParticipants && currentParticipants !== undefined && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                {currentParticipants}/{maxParticipants} participants
              </span>
            </div>
          )}
        </div>
        {/* Event Rewards */}
        {(points || badge) && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">Event Rewards</h4>
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-3 min-h-[80px] flex flex-col justify-center">
              <div className="space-y-1">
                {/* Points */}
                {points && (
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-900">{points} points</span>
                  </div>
                )}

                {/* Badge */}
                {badge && (
                  <div className="flex items-center gap-2">
                    <Award className="h-3 w-3 text-purple-500 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-900">{badge.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <Button onClick={handleViewDetails} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
