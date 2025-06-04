"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Calendar, Star, TrendingUp, Target, Award } from "lucide-react"

export function UserStats() {
  const userStats = {
    totalEvents: 18,
    totalPoints: 2180,
    currentRank: 6,
    totalUsers: 1247,
    currentStreak: 4,
    level: "Silver",
    nextLevelPoints: 2500,
    completionRate: 94,
    favoriteCategory: "Environmental",
  }

  const progressToNextLevel = ((userStats.totalPoints % 1000) / 1000) * 100

  return (
    <Card className="border-sky-100 h-full">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <CardTitle className="text-sky-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Your Statistics
        </CardTitle>
        <CardDescription>Track your community impact and progress</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Level and Progress */}
        <div className="text-center">
          <Badge className="bg-gradient-to-r border-none from-gray-300 to-gray-500 text-white mb-3 text-sm px-3 py-1 cursor-default">
            {userStats.level} Level
          </Badge>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{userStats.totalPoints} points</span>
              <span>{userStats.nextLevelPoints} points</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
            <p className="text-xs text-gray-500">
              {userStats.nextLevelPoints - userStats.totalPoints} points to Gold level
            </p>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-sky-50 rounded-lg border border-sky-100">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-sky-600" />
            </div>
            <div className="text-2xl font-bold text-sky-600">{userStats.totalEvents}</div>
            <p className="text-xs text-gray-600">Events Attended</p>
          </div>

          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{userStats.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Total Points</p>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">#{userStats.currentRank}</div>
            <p className="text-xs text-gray-600">Global Rank</p>
          </div>

          <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{userStats.currentStreak}</div>
            <p className="text-xs text-gray-600">Day Streak</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <Award className="h-4 w-4 text-sky-600" />
              Completion Rate
            </span>
            <span className="font-semibold text-green-600">{userStats.completionRate}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Favorite Category</span>
            <Badge variant="outline" className="text-xs cursor-default">
              {userStats.favoriteCategory}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Community Ranking</span>
            <span className="font-semibold text-sky-600">
              Top {Math.round((userStats.currentRank / userStats.totalUsers) * 100)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
