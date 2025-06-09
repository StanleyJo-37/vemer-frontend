"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Users, Megaphone } from "lucide-react"
import { useRouter } from "next/navigation"
import AuthAPI from "@/api/AuthAPI"

export default function PublisherForm() {
  const [isPublisher, setIsPublisher] = useState(false)
  const router = useRouter()

  const handleContinue = async () => {
    console.log("User type selected:", isPublisher ? "Publisher" : "Regular User")

    await AuthAPI.handleIsPublisher(isPublisher);

    if (isPublisher) {
      router.push("/publisher-dashboard")
    } else {
      router.push("/user-dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
            {isPublisher ? <Megaphone className="w-8 h-8 text-sky-600" /> : <Users className="w-8 h-8 text-sky-600" />}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome to Vemer</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Let us know how you'd like to use our platform
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex-1">
                <Label htmlFor="publisher-toggle" className="text-base font-medium text-gray-900">
                  Are you a publisher?
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  {isPublisher
                    ? "You'll be able to create and manage events"
                    : "You'll be able to discover and join events"}
                </p>
              </div>
              <Switch id="publisher-toggle" checked={isPublisher} onCheckedChange={setIsPublisher} className="ml-4" />
            </div>
          </div>

          {/* User Type Description */}
          <div className="p-4 border rounded-lg bg-white">
            {isPublisher ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-sky-600" />
                  <h3 className="font-semibold text-gray-900">Publisher Account</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-7">
                  <li>• Create and manage events</li>
                  <li>• Track participant engagement</li>
                  <li>• Send announcements</li>
                  <li>• Access analytics dashboard</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-600" />
                  <h3 className="font-semibold text-gray-900">Regular User</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-7">
                  <li>• Discover exciting events</li>
                  <li>• Join activities and earn points</li>
                  <li>• Collect badges and achievements</li>
                  <li>• Connect with community</li>
                </ul>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <Button onClick={handleContinue} className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3" size="lg">
            Continue as {isPublisher ? "Publisher" : "User"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
