"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  MapPin,
  Search,
  Users,
  Eye,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { EndEventDialog } from "./end-event-dialog";
import { PendingApplicationsBadge } from "@/components/publisher-dashboard/pending-applications-badge";
import PublisherDashboardAPI from "@/api/PublisherDashboardAPI";
import { Loader2 } from "lucide-react";
import { ActivityDetailsDialog } from "./activity-details-dialog";
import { Activity } from "@/app/activities/page";

// Define the Activity type based on your backend response


export function MyActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [endingActivity, setEndingActivity] = useState<Activity | null>(null);
  const [viewingActivity, setViewingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        // The response is Activity[] directly, not { data: Activity[] }
        const response = await PublisherDashboardAPI.getActivities();
        setActivities(response.data);
      } catch (error) {
        setActivities([]);
        console.error("Error fetching publisher activities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: boolean) => {
    if (status === true) return "bg-green-100 text-green-800 border-green-200";
    if (status === false) return "bg-gray-100 text-gray-800 border-gray-200";
    return "bg-sky-100 text-sky-800 border-sky-200";
  };

  // Add handler for viewing details
  const handleViewDetails = (activity: Activity) => {
    setViewingActivity(activity);
  };

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sky-900">My Activities</h2>
          <p className="text-gray-600">
            Manage and track your published activities
          </p>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden border-sky-100 hover:border-sky-200 hover:shadow-lg transition-all duration-200 min-h-content flex flex-col"
            >
              <CardHeader className="flex-shrink-0 pb-3">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg text-sky-900 line-clamp-1">
                    {activity.name}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2 h-10">
                  {activity.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between p-6 pt-0">
                <div className="space-y-2 text-sm text-gray-600 mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-sky-600 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {new Date(activity.start_date).toLocaleDateString()} -{" "}
                      {new Date(activity.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-600 flex-shrink-0" />
                    <span className="line-clamp-1">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-white text-gray-800 border border-sky-200">
                      {activity.activity_type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">⭐</span>
                    <span>{activity.points_reward} points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status ? "Active" : "Completed"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {activity.status === true && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEndingActivity(activity)}
                      className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      End Event
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(activity)}
                    className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300"
                  >
                    <Bell className="h-4 w-4 mr-1" />
                    Notify
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-sky-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-sky-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No activities found
          </h3>
          <p className="text-gray-600">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Create your first activity to get started"}
          </p>
        </div>
      )}

      {endingActivity && (
        <EndEventDialog
          activity={endingActivity}
          onClose={() => setEndingActivity(null)}
          onEndEvent={() => setEndingActivity(null)}
        />
      )}

      {viewingActivity && (
        <ActivityDetailsDialog
          activity={{
            ...viewingActivity,
            description: viewingActivity.description ?? "",
          }}
          onClose={() => setViewingActivity(null)}
          onRemoveParticipant={() => {
            // Implement remove participant logic if needed
          }}
        />
      )}
    </div>
  );
}
