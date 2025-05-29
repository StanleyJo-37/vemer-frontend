"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, Bell, BarChart3 } from "lucide-react"
import { CreateActivityForm } from "@/components/dashboard/create-activity-form"
import { MyActivities } from "@/components/dashboard/my-activities"
import { ActivityNotifications } from "@/components/dashboard/activity-notifications"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivityCards } from "@/components/dashboard/recent-activity-cards"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "activities", label: "My Activities", icon: Calendar },
  { id: "create", label: "Create Activity", icon: Plus },
  { id: "notifications", label: "Notifications", icon: Bell },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [tabDimensions, setTabDimensions] = useState<{ [key: string]: { width: number; left: number } }>({})
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  useEffect(() => {
    // Calculate dimensions for each tab
    const dimensions: { [key: string]: { width: number; left: number } } = {}
    let cumulativeLeft = 4 // Starting position accounting for container padding

    tabs.forEach((tab) => {
      const tabElement = tabRefs.current[tab.id]
      if (tabElement) {
        const width = tabElement.offsetWidth
        dimensions[tab.id] = {
          width: width - 8, // Subtract padding to fit within the tab
          left: cumulativeLeft,
        }
        cumulativeLeft += width
      }
    })

    setTabDimensions(dimensions)
  }, [])

  const activeTabDimensions = tabDimensions[activeTab]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Publisher Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your events and engage with participants</p>
      </div>

      {/* Custom Tab Navigation */}
      <div className="mb-8">
        <div className="relative bg-gray-100 py-1 pr-1 rounded-xl inline-flex w-auto">
          {/* Background indicator */}
          {activeTabDimensions && (
            <motion.div
              className="absolute bg-white rounded-lg shadow-sm border border-sky-100"
              layoutId="activeTab"
              animate={{
                x: activeTabDimensions.left,
                width: activeTabDimensions.width + 5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                height: "calc(100% - 8px)",
                top: "4px",
              }}
            />
          )}

          {/* Tab buttons */}
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative z-10 flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap",
                  activeTab === tab.id ? "text-sky-600" : "text-gray-600 hover:text-gray-900",
                )}
              >
                <IconComponent className="h-4 w-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <DashboardStats />
              <RecentActivityCards />
            </div>
          )}

          {activeTab === "activities" && <MyActivities />}
          {activeTab === "create" && <CreateActivityForm />}
          {activeTab === "notifications" && <ActivityNotifications />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
