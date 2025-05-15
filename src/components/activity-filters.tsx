"use client"
import { CalendarIcon, MapPin, Tag, User, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Activity } from "@/app/activities/page"

interface ActivityFiltersProps {
  activities: Activity[]
  filters: {
    categories: string[]
    dates: {
      from: Date | undefined
      to: Date | undefined
    }
    locations: string[]
    organizers: string[]
    price: "all" | "free" | "paid"
  }
  onFilterChange: (filters: ActivityFiltersProps["filters"]) => void
}

export function ActivityFilters({ activities, filters, onFilterChange }: ActivityFiltersProps) {
  // Extract unique values for filter options
  const categories = [...new Set(activities.map((a) => a.category))].sort()
  const locations = [...new Set(activities.map((a) => a.location))].sort()
  const organizers = [...new Set(activities.map((a) => a.organizer))].sort()

  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      onFilterChange({
        ...filters,
        categories: [],
      })
    } else if (!filters.categories.includes(value)) {
      onFilterChange({
        ...filters,
        categories: [...filters.categories, value],
      })
    }
  }

  // Handle start date filter change
  const handleStartDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dates: { ...filters.dates, from: date },
    })
  }

  // Handle end date filter change
  const handleEndDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dates: { ...filters.dates, to: date },
    })
  }

  // Clear date filter
  const clearDateFilter = () => {
    onFilterChange({
      ...filters,
      dates: { from: undefined, to: undefined },
    })
  }

  // Handle location filter change
  const handleLocationChange = (value: string) => {
    if (value === "all") {
      onFilterChange({
        ...filters,
        locations: [],
      })
    } else if (!filters.locations.includes(value)) {
      onFilterChange({
        ...filters,
        locations: [...filters.locations, value],
      })
    }
  }

  // Handle organizer filter change
  const handleOrganizerChange = (value: string) => {
    if (value === "all") {
      onFilterChange({
        ...filters,
        organizers: [],
      })
    } else if (!filters.organizers.includes(value)) {
      onFilterChange({
        ...filters,
        organizers: [...filters.organizers, value],
      })
    }
  }

  // Handle price filter change
  const handlePriceChange = (value: string) => {
    onFilterChange({
      ...filters,
      price: value as "all" | "free" | "paid",
    })
  }

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      dates: { from: undefined, to: undefined },
      locations: [],
      organizers: [],
      price: "all",
    })
  }

  // Count active filters
  const activeFilterCount =
    filters.categories.length +
    (filters.dates.from || filters.dates.to ? 1 : 0) +
    filters.locations.length +
    filters.organizers.length +
    (filters.price !== "all" ? 1 : 0)

  return (
    <div className="bg-white rounded-lg border p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {/* {activeFilterCount > 0 && (
          <div className="text-sm text-gray-500">
            {activeFilterCount} active filter{activeFilterCount !== 1 ? "s" : ""}
          </div>
        )} */}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "date", "price", "location", "organizer"]}
        className="overflow-visible"
      >
        {/* Price Filter */}
        <AccordionItem value="price" className="overflow-visible">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-sky-600" />
              <span>Price</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="overflow-visible pt-1 pb-3 px-1">
            <div className="pt-1 px-1">
              <Select value={filters.price} onValueChange={handlePriceChange}>
                <SelectTrigger className="w-full relative z-10">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Date Filter */}
        <AccordionItem value="date" className="overflow-visible">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-sky-600" />
              <span>Date</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="overflow-visible pt-1 pb-3 px-1">
            <div className="space-y-4 pt-1 px-1">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal relative z-10",
                        !filters.dates.from && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dates.from ? (
                        format(filters.dates.from, "MMMM do, yyyy")
                      ) : (
                        <span>Pick a start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dates.from}
                      onSelect={handleStartDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal relative z-10",
                        !filters.dates.to && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dates.to ? format(filters.dates.to, "MMMM do, yyyy") : <span>Pick an end date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={filters.dates.to} onSelect={handleEndDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {(filters.dates.from || filters.dates.to) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearDateFilter}
                  className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 h-8 px-2 w-full"
                >
                  Clear date filter
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Category Filter */}
        <AccordionItem value="category" className="overflow-visible">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-sky-600" />
              <span>Event Type</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="overflow-visible pt-1 pb-3 px-1">
            <div className="pt-1 px-1">
              <Select
                value={filters.categories.length > 0 ? filters.categories[0] : "all"}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full relative z-10">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Organizer Filter */}
        <AccordionItem value="organizer" className="overflow-visible">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-sky-600" />
              <span>Organizer</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="overflow-visible pt-1 pb-3 px-1">
            <div className="pt-1 px-1">
              <Select
                value={filters.organizers.length > 0 ? filters.organizers[0] : "all"}
                onValueChange={handleOrganizerChange}
              >
                <SelectTrigger className="w-full relative z-10">
                  <SelectValue placeholder="All Organizers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizers</SelectItem>
                  {organizers.map((organizer) => (
                    <SelectItem key={organizer} value={organizer}>
                      {organizer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location Filter */}
        <AccordionItem value="location" className="overflow-visible">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-600" />
              <span>Location</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="overflow-visible pt-1 pb-3 px-1">
            <div className="pt-1 px-1">
              <Select
                value={filters.locations.length > 0 ? filters.locations[0] : "all"}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="w-full relative z-10">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6">
        <Button
          variant="default"
          onClick={clearAllFilters}
          className="w-full bg-sky-600 hover:bg-sky-700"
          disabled={activeFilterCount === 0}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}
