"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpcomingEvents() {
  const router = useRouter();

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: "1",
      title: "Community Garden Cleanup",
      description:
        "Join us for a morning of beautifying our local community garden.",
      category: "Environmental",
      location: "Central Park Community Garden",
      date: "2025-06-15",
      time: "09:00",
      image: "/placeholder.svg?height=120&width=200",
      registeredAt: "2025-06-10T14:30:00Z",
      spotsLeft: 7,
      totalSpots: 25,
    },
    {
      id: "2",
      title: "Beach Cleanup Drive",
      description:
        "Help us protect marine life and keep our beaches beautiful.",
      category: "Environmental",
      location: "Sunset Beach",
      date: "2025-06-20",
      time: "08:00",
      image: "/placeholder.svg?height=120&width=200",
      registeredAt: "2025-06-11T09:15:00Z",
      spotsLeft: 18,
      totalSpots: 50,
    },
    {
      id: "3",
      title: "Youth Coding Workshop",
      description:
        "Introduce young people to programming through hands-on learning.",
      category: "Education",
      location: "Tech Innovation Hub",
      date: "2025-07-08",
      time: "14:00",
      image: "/placeholder.svg?height=120&width=200",
      registeredAt: "2025-06-12T16:45:00Z",
      spotsLeft: 3,
      totalSpots: 20,
    },
  ]);

  const handleViewEvent = (eventId: string) => {
    router.push(`/activities/${eventId}`);
  };

  const handleViewAllEvents = () => {
    router.push("/user-dashboard/upcoming-events");
  };

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="border-sky-100">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sky-600" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Events you're registered for</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllEvents}
            className="border-sky-200 text-sky-700 hover:bg-sky-50 self-start sm:self-auto"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => {
            const daysUntil = getDaysUntilEvent(event.date);
            return (
              <div
                key={event.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-sky-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleViewEvent(event.id)}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {event.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs cursor-default"
                      >
                        {event.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {event.description}
                    </p>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-sky-600" />
                        <span>
                          {new Date(event.date).toLocaleDateString()} at{" "}
                          {event.time}
                          {daysUntil === 0 && (
                            <span className="text-green-600 font-medium ml-1">
                              (Today!)
                            </span>
                          )}
                          {daysUntil === 1 && (
                            <span className="text-orange-600 font-medium ml-1">
                              (Tomorrow)
                            </span>
                          )}
                          {daysUntil > 1 && (
                            <span className="text-gray-500 ml-1">
                              ({daysUntil} days)
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-sky-600" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-sky-600" />
                        <span>
                          {event.spotsLeft} spots left of {event.totalSpots}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No upcoming events
            </h3>
            <p className="text-gray-600 mb-4">
              Discover and join community events to get started!
            </p>
            <Button
              onClick={() => router.push("/activities")}
              className="bg-sky-600 hover:bg-sky-700"
            >
              Browse Events
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
