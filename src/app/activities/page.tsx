"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ActivityCard } from "@/components/activity-card"
import { ActivityFilters } from "@/components/activity-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"

// Define activity types
export type Activity = {
  id: string
  title: string
  image: string
  date: string
  location: string
  price: string
  category: string
  organizer: string
  isFree: boolean
  description?: string
  benefits?: string
  maxParticipants?: number
  currentParticipants?: number
  points?: number
  badge?: {
    name: string
    description: string
    rarity: string
    icon: string
  }
}

// Mock activities - MUST match the ones in [id]/page.tsx
const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Community Garden Cleanup",
    description:
      "Join us for a morning of beautifying our local community garden. We'll be weeding, planting new flowers, and general maintenance to keep our green space thriving. This is a great opportunity to meet neighbors, learn about gardening, and contribute to environmental sustainability in our community. All skill levels welcome - we'll provide guidance and tools!",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-06-15",
    location: "Central Park Community Garden",
    price: "0",
    category: "Environmental",
    organizer: "Green Earth Initiative",
    isFree: true,
    maxParticipants: 25,
    currentParticipants: 18,
    points: 150,
    badge: {
      name: "Garden Guardian",
      description: "Participated in community garden cleanup",
      rarity: "Common",
      icon: "🌱",
    },
  },
  {
    id: "2",
    title: "Beach Cleanup Drive",
    description:
      "Help us protect marine life and keep our beaches beautiful! We'll spend the morning collecting trash and debris from the shoreline. This activity includes education about ocean conservation and the impact of pollution on marine ecosystems. Families welcome - it's a great way to teach kids about environmental responsibility.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-06-20",
    location: "Sunset Beach",
    price: "0",
    category: "Environmental",
    organizer: "Ocean Guardians",
    isFree: true,
    maxParticipants: 50,
    currentParticipants: 32,
    points: 200,
    badge: {
      name: "Ocean Protector",
      description: "Helped protect marine life through beach cleanup",
      rarity: "Uncommon",
      icon: "🌊",
    },
  },
  {
    id: "3",
    title: "Food Bank Volunteer Day",
    description:
      "Make a direct impact on food insecurity in our community by volunteering at the local food bank. Activities include sorting donations, packing food boxes, and helping with distribution. This is a meaningful way to give back and support families in need. No experience necessary - training provided.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-06-25",
    location: "Downtown Food Bank",
    price: "0",
    category: "Community Service",
    organizer: "Helping Hands Network",
    isFree: true,
    maxParticipants: 15,
    currentParticipants: 15,
    points: 180,
    badge: {
      name: "Community Helper",
      description: "Volunteered at local food bank",
      rarity: "Common",
      icon: "🤝",
    },
  },
  {
    id: "4",
    title: "Senior Center Reading Program",
    description:
      "Bring joy to elderly residents by participating in our reading program. Volunteers will read books, newspapers, or magazines to seniors, engage in conversations, and provide companionship. This intergenerational activity enriches lives on both sides and helps combat loneliness among our elderly community members.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-02",
    location: "Sunshine Senior Center",
    price: "0",
    category: "Community Service",
    organizer: "Intergenerational Connect",
    isFree: true,
    maxParticipants: 12,
    currentParticipants: 8,
    points: 120,
    badge: {
      name: "Wisdom Keeper",
      description: "Connected with seniors through reading program",
      rarity: "Uncommon",
      icon: "📚",
    },
  },
  {
    id: "5",
    title: "Youth Coding Workshop",
    description:
      "Introduce young people to the world of programming through this hands-on coding workshop. Participants will learn basic programming concepts, create simple games, and explore career opportunities in technology. Perfect for ages 10-16, no prior experience needed. Laptops provided.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-08",
    location: "Tech Innovation Hub",
    price: "25",
    category: "Education",
    organizer: "Code for Tomorrow",
    isFree: false,
    maxParticipants: 20,
    currentParticipants: 15,
    points: 300,
    badge: {
      name: "Code Explorer",
      description: "Completed youth coding workshop",
      rarity: "Rare",
      icon: "💻",
    },
  },
  {
    id: "6",
    title: "Community Art Mural Project",
    description:
      "Be part of creating a beautiful mural that represents our diverse community! This collaborative art project welcomes artists of all skill levels to contribute to a large-scale public artwork. We'll provide all materials and guidance from professional muralists. The finished piece will be permanently displayed in the community center.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-12",
    location: "Community Center Wall",
    price: "0",
    category: "Arts & Culture",
    organizer: "Creative Communities Collective",
    isFree: true,
    maxParticipants: 30,
    currentParticipants: 22,
    points: 250,
    badge: {
      name: "Community Artist",
      description: "Contributed to community mural project",
      rarity: "Rare",
      icon: "🎨",
    },
  },
]

export default function ActivitiesPage() {
  // State for activities and loading
  const [activities, setActivities] = useState<Activity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])
  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const activitiesPerPage = 9

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Filter states
  const [filters, setFilters] = useState({
    categories: [] as string[],
    dates: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    locations: [] as string[],
    organizers: [] as string[],
    price: "all" as "all" | "free" | "paid",
  })

  // Fetch initial activities
  useEffect(() => {
    setIsLoading(true)
    try {
      // Load mock data immediately
      setActivities(mockActivities)
      console.log(
        "Loaded activities:",
        mockActivities.map((a) => ({ id: a.id, title: a.title })),
      )
    } catch (error) {
      console.error("Error fetching activities:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...activities]

    // Apply search query
    if (debouncedSearchQuery) {
      result = result.filter((activity) => activity.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((activity) => filters.categories.includes(activity.category))
    }

    // Apply date filter
    if (filters.dates.from || filters.dates.to) {
      result = result.filter((activity) => {
        const activityDate = new Date(activity.date)
        activityDate.setHours(0, 0, 0, 0)

        if (
          filters.dates.from &&
          filters.dates.to &&
          filters.dates.from.toDateString() === filters.dates.to.toDateString()
        ) {
          const fromDate = new Date(filters.dates.from)
          fromDate.setHours(0, 0, 0, 0)
          return activityDate.getTime() === fromDate.getTime()
        }

        if (filters.dates.from && !filters.dates.to) {
          const fromDate = new Date(filters.dates.from)
          fromDate.setHours(0, 0, 0, 0)
          return activityDate >= fromDate
        }

        if (!filters.dates.from && filters.dates.to) {
          const toDate = new Date(filters.dates.to)
          toDate.setHours(0, 0, 0, 0)
          return activityDate <= toDate
        }

        if (filters.dates.from && filters.dates.to) {
          const fromDate = new Date(filters.dates.from)
          const toDate = new Date(filters.dates.to)
          fromDate.setHours(0, 0, 0, 0)
          toDate.setHours(0, 0, 0, 0)
          return activityDate >= fromDate && activityDate <= toDate
        }

        return true
      })
    }

    // Apply location filter
    if (filters.locations.length > 0) {
      result = result.filter((activity) => filters.locations.includes(activity.location))
    }

    // Apply organizer filter
    if (filters.organizers.length > 0) {
      result = result.filter((activity) => filters.organizers.includes(activity.organizer))
    }

    // Apply price filter
    if (filters.price === "free") {
      result = result.filter((activity) => activity.isFree)
    } else if (filters.price === "paid") {
      result = result.filter((activity) => !activity.isFree)
    }

    setFilteredActivities(result)
    setPage(1)
    setHasMore(result.length > activitiesPerPage)
    setDisplayedActivities(result.slice(0, activitiesPerPage))
  }, [activities, debouncedSearchQuery, filters])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discover Events</h1>
        <p className="text-gray-600 mt-2">Find and join events that create positive impact in your community</p>

        {/* Search bar */}
        <div className="relative max-w-3xl mt-6 mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search events by title..."
            className="pl-10 pr-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={clearSearch}>
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Main content with filters and activities */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="md:col-span-1">
            <ActivityFilters activities={activities} filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Activities grid */}
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
              </div>
            ) : displayedActivities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    id={activity.id}
                    title={activity.title}
                    image={activity.image}
                    date={activity.date}
                    location={activity.location}
                    price={activity.price}
                    category={activity.category}
                    description={activity.description}
                    maxParticipants={activity.maxParticipants}
                    currentParticipants={activity.currentParticipants}
                    isFree={activity.isFree}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-sky-100 p-3 rounded-full mb-4">
                  <Search className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="border-sky-600 text-sky-600 hover:bg-sky-50"
                  onClick={() => {
                    setSearchQuery("")
                    setFilters({
                      categories: [],
                      dates: {
                        from: undefined,
                        to: undefined,
                      },
                      locations: [],
                      organizers: [],
                      price: "all",
                    })
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
