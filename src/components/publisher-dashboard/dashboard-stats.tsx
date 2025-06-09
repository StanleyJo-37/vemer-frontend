"use client"

import PublisherDashboardAPI from "@/api/PublisherDashboardAPI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MessageSquare, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react";

export function DashboardStats() {
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);

  const stats = [
    {
      title: "Total Activities",
      value: totalActivities,
      icon: Calendar,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-100",
    },
    {
      title: "Total Participants",
      value: totalParticipants,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      title: "Messages Sent",
      value: totalMessages,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
    },
  ]

  useEffect(() => {
    const fetchStats = async () => {
      const response = await PublisherDashboardAPI.getPublisherStats();
      setTotalActivities(response.data.total_activities);
      setTotalMessages(response.data.total_notifications);
      setTotalParticipants(response.data.total_participants);
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={`${stat.borderColor} hover:shadow-md transition-shadow`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
