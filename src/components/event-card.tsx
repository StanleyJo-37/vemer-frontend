import Link from "next/link"
import { CalendarDays, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface EventCardProps {
  title: string
  image: string
  date: string
  location: string
  price: string
  category: string
}

export function EventCard({ title, image, date, location, price, category }: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[3/2] w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="bg-sky-50 text-sky-600">
            {category}
          </Badge>
          <span className="font-semibold text-sky-600">{price}</span>
        </div>
        <Link href={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <h3 className="line-clamp-2 text-lg font-semibold hover:text-sky-600">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarDays className="mr-1 h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="truncate">{location}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link href={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
          <button className="w-full rounded-md border border-sky-600 px-4 py-2 text-sm font-medium text-sky-600 transition-colors hover:bg-sky-600 hover:text-white">
            View Details
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}
