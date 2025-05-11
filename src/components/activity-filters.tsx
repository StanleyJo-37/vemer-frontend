"use client"
import { Calendar, MapPin, Tag, User, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Activity } from "@/app/activities/page"
import { JSX, SVGProps } from "react"
import { Badge } from "./ui/badge"

interface ActivityFiltersProps {
  activities: Activity[]
  filters: {
    categories: string[]
    dates: string[]
    locations: string[]
    organizers: string[]
    price: "all" | "free" | "paid"
  }
  onFilterChange: (filters: ActivityFiltersProps["filters"]) => void
}

export function ActivityFilters({ activities, filters, onFilterChange }: ActivityFiltersProps) {
  const categories = [...new Set(activities.map((a) => a.category))].sort()
  const locations = [...new Set(activities.map((a) => a.location))].sort()
  const organizers = [...new Set(activities.map((a) => a.organizer))].sort()

  const dateOptions = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() + i)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

    onFilterChange({
      ...filters,
      categories: newCategories,
    })
  }

  const handleDateChange = (date: string, checked: boolean) => {
    const newDates = checked ? [...filters.dates, date] : filters.dates.filter((d) => d !== date)

    onFilterChange({
      ...filters,
      dates: newDates,
    })
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked ? [...filters.locations, location] : filters.locations.filter((l) => l !== location)

    onFilterChange({
      ...filters,
      locations: newLocations,
    })
  }

  const handleOrganizerChange = (organizer: string, checked: boolean) => {
    const newOrganizers = checked
      ? [...filters.organizers, organizer]
      : filters.organizers.filter((o) => o !== organizer)

    onFilterChange({
      ...filters,
      organizers: newOrganizers,
    })
  }

  const handlePriceChange = (value: "all" | "free" | "paid") => {
    onFilterChange({
      ...filters,
      price: value,
    })
  }

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      dates: [],
      locations: [],
      organizers: [],
      price: "all",
    })
  }

  const activeFilterCount =
    filters.categories.length +
    filters.dates.length +
    filters.locations.length +
    filters.organizers.length +
    (filters.price !== "all" ? 1 : 0)

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

      <Accordion type="multiple" defaultValue={["category", "price", "location"]}>
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

        {/* Date Filter */}
        <AccordionItem value="date">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-sky-600" />
              <span>Date</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {dateOptions.map((date) => (
                <div key={date} className="flex items-center space-x-2">
                  <Checkbox
                    id={`date-${date}`}
                    checked={filters.dates.includes(date)}
                    onCheckedChange={(checked) => handleDateChange(date, checked as boolean)}
                  />
                  <Label htmlFor={`date-${date}`} className="text-sm font-normal cursor-pointer">
                    {date}
                  </Label>
                </div>
              ))}
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

function X(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
