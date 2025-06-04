"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { UserStats } from "@/components/user-dashboard/user-stats"
import { UpcomingEvents } from "@/components/user-dashboard/upcoming-events"
import { RecentAnnouncements } from "@/components/user-dashboard/recent-announcements"
import { EventRecommendations } from "@/components/user-dashboard/event-recommendations"
import { ParticipatedEvents } from "@/components/user-dashboard/participated-events"
import { UserBadges } from "@/components/user-dashboard/user-badges"
import { useToast } from "@/hooks/useToast"

export default function UserDashboardPage() {
  const { toast } = useToast()
  const [newNotificationsCount, setNewNotificationsCount] = useState(0)

  // Simulate checking for new notifications on page load
  useEffect(() => {
    // Simulate API call to check for new notifications
    const checkNotifications = () => {
      const newCount = Math.floor(Math.random() * 3) + 1 // Random 1-3 new notifications
      setNewNotificationsCount(newCount)

      if (newCount > 0) {
        toast({
          title: "New Notifications",
          description: `You have ${newCount} new announcement${newCount > 1 ? "s" : ""} from event organizers.`,
          duration: 5000,
        })
      }
    }

    // Check for notifications after a short delay
    const timer = setTimeout(checkNotifications, 1000)
    return () => clearTimeout(timer)
  }, [toast])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening in your community</p>
        </motion.div>

        {/* Top Row - Stats and Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <UserStats />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <UpcomingEvents />
          </motion.div>
        </div>

        {/* Second Row - Announcements and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <RecentAnnouncements newCount={newNotificationsCount} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <EventRecommendations />
          </motion.div>
        </div>

        {/* Third Row - Participated Events and Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <ParticipatedEvents />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <UserBadges />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
