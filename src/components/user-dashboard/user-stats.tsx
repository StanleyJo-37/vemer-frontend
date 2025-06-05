"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Calendar, Award, TrendingUp } from "lucide-react"

export function UserStats() {
  const stats = {
    totalPoints: 1250,
    eventsAttended: 8,
    badgesEarned: 4,
    nextLevelPoints: 1500,
  }

  const progressToNextLevel = (stats.totalPoints / stats.nextLevelPoints) * 100

  return (
    <Card className="border-sky-100">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <CardTitle className="text-sky-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-sky-600" />
          Your Stats
        </CardTitle>
        <CardDescription>Your community impact at a glance</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Total Points */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalPoints.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>

          {/* Events Attended */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.eventsAttended}</div>
            <p className="text-sm text-gray-600">Events Attended</p>
          </div>

          {/* Badges Earned */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.badgesEarned}</div>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </div>

          {/* Progress to Next Level */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{Math.round(progressToNextLevel)}%</div>
            <p className="text-sm text-gray-600">To Next Level</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress to Next Level</span>
            <span className="text-sm text-gray-500">
              {stats.totalPoints}/{stats.nextLevelPoints}
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {stats.nextLevelPoints - stats.totalPoints} points to reach the next level
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
