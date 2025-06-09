"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ActivityCard } from "@/components/activity-card";
import { ActivityFilters } from "@/components/activity-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import ActivityAPI from "@/api/ActivityAPI";
import { useRouter } from "next/navigation";
import API from "@/api/axios";

// Define activity types
export type Activity = {
  points_reward: any;
  badge: any;
  image: string;
  date: string | number | Date;
  location: string;
  points: number;
  id: number;
  name: string;
  description?: string;
  activity_type: string;
  roles?: string | null;
  badges?: string | null;
  participant_count?: number;
  start_date: string;
  end_date: string;
  slug: string;
  status: boolean;
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const activitiesPerPage = 9;

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    dates: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  });

  // Build API params from filters/search
  const buildApiParams = () => {
    const params: any = {};
    if (debouncedSearchQuery) params.search_term = debouncedSearchQuery;
    if (filters.categories.length > 0)
      params.activity_type = filters.categories[0];
    if (filters.dates.from)
      params.start_date = filters.dates.from
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    if (filters.dates.to)
      params.end_date = filters.dates.to
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    params.per_page = activitiesPerPage;
    params.page = page;
    return params;
  };

  // Fetch activities from backend
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const params = buildApiParams();
        const response = await ActivityAPI.getActivities(params);
        const data = response.data.data || response.data;
        setActivities(data);
        setHasMore(
          response.data.last_page
            ? page < response.data.last_page
            : data.length === activitiesPerPage
        );
      } catch (error) {
        setActivities([]);
        setHasMore(false);
        console.error("Error fetching activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, JSON.stringify(filters), page]);

  // Reset page to 1 when filters/search change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, JSON.stringify(filters)]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Discover Events
        </h1>
        <p className="text-gray-600 mt-2">
          Find and join events that create positive impact in your community
        </p>

        {/* Search bar */}
        <div className="relative max-w-3xl mt-4 sm:mt-6 mb-4 sm:mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search events by name..."
            className="pl-10 pr-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={clearSearch}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Main content with filters and activities */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <ActivityFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Activities grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
              </div>
            ) : activities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-sky-100 p-3 rounded-full mb-4">
                  <Search className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No events found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button
                  variant="outline"
                  className="border-sky-600 text-sky-600 hover:bg-sky-50"
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      categories: [],
                      dates: {
                        from: undefined,
                        to: undefined,
                      },
                    });
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8 gap-3">
        <Button
          variant="outline"
          disabled={page === 1 || isLoading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-6 py-2 border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </Button>

        <div className="flex items-center px-4 py-2 bg-sky-50 border border-sky-200 rounded-lg">
          <span className="text-sm font-medium text-sky-700">
            Page <span className="font-bold text-sky-900">{page}</span>
          </span>
        </div>

        <Button
          variant="outline"
          disabled={!hasMore || isLoading}
          onClick={() => setPage((p) => p + 1)}
          className="px-6 py-2 border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
        >
          Next
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
