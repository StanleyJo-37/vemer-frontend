"use client";
import { CalendarIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ActivityFiltersProps {
  filters: {
    categories: string[];
    dates: {
      from: Date | undefined;
      to: Date | undefined;
    };
  };
  onFilterChange: (filters: ActivityFiltersProps["filters"]) => void;
}

export function ActivityFilters({
  filters,
  onFilterChange,
}: ActivityFiltersProps) {
  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      onFilterChange({
        ...filters,
        categories: [],
      });
    } else if (!filters.categories.includes(value)) {
      onFilterChange({
        ...filters,
        categories: [value],
      });
    }
  };

  // Handle start date filter change
  const handleStartDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dates: { ...filters.dates, from: date },
    });
  };

  // Handle end date filter change
  const handleEndDateChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dates: { ...filters.dates, to: date },
    });
  };

  // Clear date filter
  const clearDateFilter = () => {
    onFilterChange({
      ...filters,
      dates: { from: undefined, to: undefined },
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      dates: { from: undefined, to: undefined },
    });
  };

  // Count active filters (optional, can be removed if not needed)
  const activeFilterCount =
    filters.categories.length +
    (filters.dates.from || filters.dates.to ? 1 : 0);

  return (
    <div className="bg-white rounded-lg border p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "date"]}
        className="overflow-visible"
      >
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
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal relative z-10",
                        !filters.dates.from && "text-muted-foreground"
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
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal relative z-10",
                        !filters.dates.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dates.to ? (
                        format(filters.dates.to, "MMMM do, yyyy")
                      ) : (
                        <span>Pick an end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.dates.to}
                      onSelect={handleEndDateChange}
                      initialFocus
                    />
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
                value={
                  filters.categories.length > 0 ? filters.categories[0] : "all"
                }
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full relative z-10">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
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
  );
}
