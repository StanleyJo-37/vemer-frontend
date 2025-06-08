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
import { Bell, Clock, AlertCircle, Info, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { NotificationType } from "@/types/NotificationType";

export default function RecentAnnouncements() {
  const router = useRouter();

  const handleViewAllAnnouncements = () => {
    router.push("/user-dashboard/announcements");
  };

  const { toast } = useToast();
  const [newAnnouncementCount, setNewAnnouncementCount] = useState(0);
  const [announcements, setAnnouncements] = useState<NotificationType[]>([
    {
      id: 1,
      title: "Beach Cleanup Drive - Location Update",
      message:
        "The meeting point has been changed to the north parking lot due to construction. Please arrive 15 minutes early for check-in.",
      type: "update",
      activityTitle: "Beach Cleanup Drive",
      publishedAt: "2025-06-13T14:15:00Z",
      priority: "high",
    },
    {
      id: 2,
      title: "Community Garden Cleanup - Reminder",
      message:
        "Don't forget about our community garden cleanup tomorrow at 9 AM! Please bring gloves and water. Tools will be provided.",
      type: "reminder",
      activityTitle: "Community Garden Cleanup",
      publishedAt: "2025-06-14T10:30:00Z",
      priority: "medium",
    },
    {
      id: 3,
      title: "Youth Coding Workshop - Materials Ready",
      message:
        "All laptops and learning materials are ready for next week's coding workshop. We're excited to see you there!",
      type: "info",
      activityTitle: "Youth Coding Workshop",
      publishedAt: "2025-06-12T16:45:00Z",
      priority: "low",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {}, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "update":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "reminder":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "info":
        return <Info className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "update":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reminder":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "info":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "normal":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <Card className="border-sky-100 h-full">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-sky-600" />
              Recent Announcements
            </CardTitle>
            <CardDescription>
              Latest updates from event organizers
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllAnnouncements}
            className="border-sky-200 text-sky-700 hover:bg-sky-50 self-start sm:self-auto"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-3 sm:p-4 border-l-4 rounded-lg border border-gray-200 hover:border-sky-200 transition-colors ${getPriorityColor(
                announcement.priority
              )}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(announcement.type)}
                  <h3 className="font-semibold text-gray-900">
                    {announcement.title}
                  </h3>
                </div>
                <Badge
                  className={`${getTypeColor(
                    announcement.type
                  )} text-xs cursor-default self-start`}
                >
                  {announcement.type}
                </Badge>
              </div>

              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {announcement.message}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
                <span className="bg-sky-50 text-sky-700 px-2 py-1 rounded-full cursor-default">
                  {announcement.activityTitle}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {new Date(announcement.publishedAt).toLocaleDateString()} at{" "}
                    {new Date(announcement.publishedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <Bell className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No announcements
            </h3>
            <p className="text-gray-600">
              You&rsquo;ll see updates from event organizers here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
