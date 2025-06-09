"use client"

import API from "@/api/axios"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, ArrowRight } from "lucide-react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // This single API call tells us if the user is logged in AND their role.
        const response = await API.AuthenticatedAPI.get("/is-publisher")

        // This is the core logic for this layout:
        if (response.data.is_publisher) {
          // If the user IS a publisher, they don't belong here.
          // Redirect them to their correct dashboard.
          router.replace("/publisher-dashboard")
        } else {
          // If they are NOT a publisher, they are an authorized regular user.
          // Grant them access to see the content.
          setIsAuthorized(true)
        }
      } catch (error) {
        // This catch block will trigger if the session is invalid (e.g., a 401 error).
        // This means the user is not logged in at all.
        console.error("User dashboard auth check failed:", error)
        router.replace("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkUserStatus()
  }, [router])

  // Loading State Component
  const LoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
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
            <Loader2 className="h-12 w-12 text-blue-600 mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">Setting up your personalized experience...</p>

          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>

          {/* Loading Steps */}
          <div className="space-y-2 text-sm text-gray-500">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Authenticating user...</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Loading dashboard data...</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  // Redirecting State Component
  const RedirectingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block"
          >
            <ArrowRight className="h-12 w-12 text-green-600 mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting</h2>
          <p className="text-gray-600 mb-4">Taking you to the right place...</p>

          {/* Animated Dots */}
          <div className="flex justify-center mb-4">
            <motion.div
              className="flex space-x-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  },
                },
              }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-green-600 rounded-full"
                  variants={{
                    hidden: { opacity: 0.3, y: 0 },
                    visible: { opacity: 1, y: -10 },
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </motion.div>
          </div>

          <div className="text-sm text-gray-500">Please wait a moment...</div>
        </div>
      </motion.div>
    </div>
  )

  return (
    <>
      <Navbar />
      <main>
        {/*
          This block conditionally renders the content based on the auth state.
        */}
        {isLoading ? (
          <LoadingState />
        ) : isAuthorized ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        ) : (
          <RedirectingState />
        )}
      </main>
    </>
  )
}
