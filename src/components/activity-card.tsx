"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Users } from "lucide-react"
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
}: ActivityCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    if (id) {
      router.push(`/activities/${id}`)
    }

    console.log(id)
  }

  const formatPrice = () => {
    if (isFree || price === "Free" || price === "0") {
      return "Free"
    }
    return `${price}`
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
        <Button onClick={handleViewDetails} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
