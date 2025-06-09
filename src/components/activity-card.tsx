"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { Activity } from "@/app/activities/page";
import { useEffect, useState } from "react";
import API from "@/api/axios";
import useAuth from "@/hooks/useAuth";

// Accepts Activity as a prop type
export function ActivityCard({ activity }: { activity: Activity }) {
  const router = useRouter();
  const isAuth = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleViewDetails = () => {
    if (!isAuth.isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (activity.id) {
      router.push(`/activities/${activity.id}`);
      return;
    }
  };

  // Parse badges if present and valid
  let parsedBadges: Array<{ id: number; name: string }> = [];
  try {
    if (activity.badges) {
      parsedBadges = JSON.parse(activity.badges);
    }
  } catch {
    parsedBadges = [];
  }

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr.replace(" ", "T"));
    return date.toLocaleDateString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{activity.name}</CardTitle>
        {activity.description && (
          <CardDescription className="line-clamp-2">
            {activity.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(activity.start_date)} -{" "}
              {formatDate(activity.end_date)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{activity.slug}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white text-gray-800">
              {activity.activity_type}
            </Badge>
          </div>
          {typeof activity.participant_count === "number" && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{activity.participant_count} participants</span>
            </div>
          )}
        </div>
        {/* Event Badges */}
        {parsedBadges.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">
              Event Badges
            </h4>
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-3 min-h-[40px] flex flex-col justify-center">
              <div className="space-y-1">
                {parsedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-2">
                    <Award className="h-3 w-3 text-purple-500 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-900">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Button onClick={handleViewDetails} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
