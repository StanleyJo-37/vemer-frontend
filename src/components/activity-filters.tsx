"use client"
import { useState, useEffect } from "react"
import { CalendarIcon, MapPin, Tag, User, Wallet, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Activity } from "@/app/activities/page"
import type { DateRange } from "react-day-picker"
import { Badge } from "./ui/badge"

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

  // State for date range picker - ensure it's initialized with a valid object
  const [date, setDate] = useState<DateRange | undefined>({
    from: filters.dates?.from,
    to: filters.dates?.to,
  })

  // Update local date state when filters.dates changes
  useEffect(() => {
    setDate({
      from: filters.dates?.from,
      to: filters.dates?.to,
    })
  }, [filters.dates])

  // Handle category filter change
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

    onFilterChange({
      ...filters,
      categories: newCategories,
    })
  }

  // Handle date filter change
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    onFilterChange({
      ...filters,
      dates: {
        from: selectedDate?.from,
        to: selectedDate?.to,
      },
    })
  }

  // Clear date filter
  const clearDateFilter = () => {
    setDate(undefined)
    onFilterChange({
      ...filters,
      dates: { from: undefined, to: undefined },
    })
  }

  // Handle location filter change
  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked ? [...filters.locations, location] : filters.locations.filter((l) => l !== location)

    onFilterChange({
      ...filters,
      locations: newLocations,
    })
  }

  // Handle organizer filter change
  const handleOrganizerChange = (organizer: string, checked: boolean) => {
    const newOrganizers = checked
      ? [...filters.organizers, organizer]
      : filters.organizers.filter((o) => o !== organizer)

    onFilterChange({
      ...filters,
      organizers: newOrganizers,
    })
  }

  // Handle price filter change
  const handlePriceChange = (value: "all" | "free" | "paid") => {
    onFilterChange({
      ...filters,
      price: value,
    })
  }

  // Clear all filters
  const clearAllFilters = () => {
    setDate(undefined)
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
    (filters.dates?.from || filters.dates?.to ? 1 : 0) +
    filters.locations.length +
    filters.organizers.length +
    (filters.price !== "all" ? 1 : 0)

  // Format date range for display
  const formatDateRange = () => {
    if (!filters.dates) return ""

    if (filters.dates.from && filters.dates.to) {
      if (filters.dates.from.toDateString() === filters.dates.to.toDateString()) {
        return format(filters.dates.from, "PPP")
      }
      return `${format(filters.dates.from, "PPP")} - ${format(filters.dates.to, "PPP")}`
    }
    if (filters.dates.from) {
      return `From ${format(filters.dates.from, "PPP")}`
    }
    if (filters.dates.to) {
      return `Until ${format(filters.dates.to, "PPP")}`
    }
    return ""
  }

  return (
    <div className="bg-white rounded-lg border p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 h-8 px-2"
          >
            Clear all
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-4 pb-4 border-b">
          <div className="text-sm text-gray-500 mb-2">Active filters: {activeFilterCount}</div>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge
                key={`cat-${category}`}
                variant="outline"
                className="bg-sky-50 text-sky-600 flex items-center gap-1"
              >
                {category}
                <button
                  onClick={() => handleCategoryChange(category, false)}
                  className="ml-1 hover:bg-sky-100 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {(filters.dates?.from || filters.dates?.to) && (
              <Badge variant="outline" className="bg-sky-50 text-sky-600 flex items-center gap-1">
                {formatDateRange()}
                <button onClick={clearDateFilter} className="ml-1 hover:bg-sky-100 rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.locations.map((location) => (
              <Badge
                key={`loc-${location}`}
                variant="outline"
                className="bg-sky-50 text-sky-600 flex items-center gap-1"
              >
                {location}
                <button
                  onClick={() => handleLocationChange(location, false)}
                  className="ml-1 hover:bg-sky-100 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {filters.price !== "all" && (
              <Badge variant="outline" className="bg-sky-50 text-sky-600 flex items-center gap-1">
                {filters.price === "free" ? "Free" : "Paid"}
                <button onClick={() => handlePriceChange("all")} className="ml-1 hover:bg-sky-100 rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["category", "date", "price", "location"]}>
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-sky-600" />
              <span>Activity Type</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Date Filter - Calendar */}
        <AccordionItem value="date">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-sky-600" />
              <span>Date</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date?.from && !date?.to && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from || date?.to ? (
                      date?.to ? (
                        <>
                          {format(date.from!, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from!, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date or range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from ? date.from : new Date()}
                    selected={date}
                    onSelect={handleDateChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {(date?.from || date?.to) && (
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

        {/* Location Filter */}
        <AccordionItem value="location">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-600" />
              <span>Location</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                  />
                  <Label htmlFor={`location-${location}`} className="text-sm font-normal cursor-pointer">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Organizer Filter */}
        <AccordionItem value="organizer">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-sky-600" />
              <span>Organizer</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {organizers.map((organizer) => (
                <div key={organizer} className="flex items-center space-x-2">
                  <Checkbox
                    id={`organizer-${organizer}`}
                    checked={filters.organizers.includes(organizer)}
                    onCheckedChange={(checked) => handleOrganizerChange(organizer, checked as boolean)}
                  />
                  <Label htmlFor={`organizer-${organizer}`} className="text-sm font-normal cursor-pointer">
                    {organizer}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-sky-600" />
              <span>Price</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={filters.price}
              onValueChange={(value) => handlePriceChange(value as "all" | "free" | "paid")}
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="all" id="price-all" />
                <Label htmlFor="price-all" className="text-sm font-normal cursor-pointer">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="free" id="price-free" />
                <Label htmlFor="price-free" className="text-sm font-normal cursor-pointer">
                  Free
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="price-paid" />
                <Label htmlFor="price-paid" className="text-sm font-normal cursor-pointer">
                  Paid
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
