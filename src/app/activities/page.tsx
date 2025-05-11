"use client"

import type React from "react"

import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ActivityCard } from "@/components/activity-card"
import { ActivityFilters } from "@/components/activity-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { mockActivities } from "@/lib/mock-data"

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
}

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
    dates: [] as string[],
    locations: [] as string[],
    organizers: [] as string[],
    price: "all" as "all" | "free" | "paid",
  })

  // Intersection observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Fetch initial activities
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true)
      try {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setActivities(mockActivities)
      } catch (error) {
        console.error("Error fetching activities:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
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

    // Apply date filter (simplified for demo)
    if (filters.dates.length > 0) {
      result = result.filter((activity) => {
        const activityMonth = new Date(activity.date).getMonth()
        return filters.dates.some((dateFilter) => {
          const filterMonth = new Date(dateFilter).getMonth()
          return activityMonth === filterMonth
        })
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

  // Load more activities when scrolling
  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      loadMoreActivities()
    }
  }, [inView, hasMore])

  // Function to load more activities
  const loadMoreActivities = useCallback(async () => {
    if (!hasMore || loadingMore) return

    setLoadingMore(true)

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const nextPage = page + 1
    const startIndex = (nextPage - 1) * activitiesPerPage
    const endIndex = startIndex + activitiesPerPage

    setDisplayedActivities((prev) => [...prev, ...filteredActivities.slice(startIndex, endIndex)])

    setPage(nextPage)
    setHasMore(endIndex < filteredActivities.length)
    setLoadingMore(false)
  }, [filteredActivities, hasMore, loadingMore, page])

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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Discover Activities</h1>

        {/* Search bar */}
        <div className="relative max-w-md mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search activities..."
            className="pl-10 pr-10"
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
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      title={activity.title}
                      image={activity.image}
                      date={activity.date}
                      location={activity.location}
                      price={activity.price}
                      category={activity.category}
                    />
                  ))}
                </div>

                {/* Load more trigger */}
                <div ref={ref} className="flex justify-center mt-8">
                  {loadingMore && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-sky-600" />
                      <span>Loading more activities...</span>
                    </div>
                  )}
                  {!hasMore && displayedActivities.length > 0 && (
                    <p className="text-gray-500">No more activities to load</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-sky-100 p-3 rounded-full mb-4">
                  <Search className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities found</h3>
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
                      dates: [],
                      locations: [],
                      organizers: [],
                      price: "all",
                    })
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
