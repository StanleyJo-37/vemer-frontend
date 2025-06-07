"use client";

import { motion } from "framer-motion";
import { UserStats } from "@/components/user-dashboard/user-stats";
import { UpcomingEvents } from "@/components/user-dashboard/upcoming-events";
import RecentAnnouncements from "@/components/user-dashboard/recent-announcements";
import { EventRecommendations } from "@/components/user-dashboard/event-recommendations";
import { ParticipatedEvents } from "@/components/user-dashboard/participated-events";
import { UserBadges } from "@/components/user-dashboard/user-badges";
import useAuth from "@/hooks/useAuth";
import {
  containerVariants,
  itemVariants,
} from "@/constants/dashboard-variants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboardPage() {
  const { isAuth, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/auth/login");
    }
  }, [isAuth, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here&rsquo;s what&rsquo;s happening in your community
          </p>
        </motion.div>

        {/* User Stats - Full Width */}
        <motion.div variants={itemVariants}>
          <UserStats />
        </motion.div>

        {/* Upcoming Events - Full Width */}
        <motion.div variants={itemVariants}>
          <UpcomingEvents />
        </motion.div>

        {/* Recent Announcements - Full Width */}
        <motion.div variants={itemVariants}>
          <RecentAnnouncements />
        </motion.div>

        {/* Event Recommendations - Full Width */}
        <motion.div variants={itemVariants}>
          <EventRecommendations />
        </motion.div>

        {/* Participated Events - Full Width */}
        <motion.div variants={itemVariants}>
          <ParticipatedEvents />
        </motion.div>

        {/* User Badges - Full Width */}
        <motion.div variants={itemVariants}>
          <UserBadges />
        </motion.div>
      </motion.div>
    </div>
  );
}
