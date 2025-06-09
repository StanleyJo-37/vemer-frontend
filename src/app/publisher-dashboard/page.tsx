"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, Bell, Loader2, Shield } from "lucide-react"
import { CreateActivityForm } from "@/components/publisher-dashboard/create-activity-form"
import { MyActivities } from "@/components/publisher-dashboard/my-activities"
import { ActivityNotifications } from "@/components/publisher-dashboard/activity-notifications"
import { DashboardStats } from "@/components/publisher-dashboard/dashboard-stats"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import API from "@/api/axios"

const tabs = [
  { id: "activities", label: "My Activities", icon: Calendar },
  { id: "create", label: "Create Activity", icon: Plus },
  { id: "notifications", label: "Notifications", icon: Bell },
]

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("activities")
  const [tabDimensions, setTabDimensions] = useState<{ [key: string]: { width: number; left: number } }>({})
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await API.AuthenticatedAPI.get("/is-publisher")

        if (response.data.is_publisher) {
          setIsAuthorized(true)
        } else {
          router.replace("/user-dashboard")
        }
      } catch (error) {
        console.error("Authorization check failed:", error)
        router.replace("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }
    checkStatus()
  }, [router])

  // HOOK 2: Calculates tab dimensions after the user is authorized.
  useEffect(() => {
    // The logic is now INSIDE the hook, but the hook itself is always called.
    if (isAuthorized) {
      const dimensions: { [key: string]: { width: number; left: number } } = {}
      let cumulativeLeft = 4

      tabs.forEach((tab) => {
        const tabElement = tabRefs.current[tab.id]
        if (tabElement) {
          const width = tabElement.offsetWidth
          dimensions[tab.id] = {
            width: width - 8,
            left: cumulativeLeft,
          }
          cumulativeLeft += width
        }
      })
      setTabDimensions(dimensions)
    }
  }, [isAuthorized]) // Reruns when authorization status changes

  // --- CONDITIONAL RETURNS (Now safe because they are AFTER all hooks) ---

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-block"
            >
              <Loader2 className="h-12 w-12 text-sky-600 mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Access</h2>
            <p className="text-gray-600 mb-4">Please wait while we check your publisher credentials...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-sky-600 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block"
            >
              <Shield className="h-12 w-12 text-orange-600 mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting...</h2>
            <p className="text-gray-600 mb-4">Taking you to the appropriate dashboard...</p>
            <div className="flex justify-center">
              <motion.div
                className="flex space-x-1"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    },
                  },
                }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-orange-600 rounded-full"
                    variants={{
                      hidden: { opacity: 0.3, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

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
                ref={(el) => {
                  tabRefs.current[tab.id] = el
                }}
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
          {activeTab === "activities" && (
            <>
              <DashboardStats />
              <MyActivities />
            </>
          )}
          {activeTab === "create" && <CreateActivityForm />}
          {activeTab === "notifications" && <ActivityNotifications />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
