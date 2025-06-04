"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface UserFormat {
    id:number,
    name: string,
    avatar: string,
    points: number,
    eventsAttended: number,
    rank: number,
    level: "Bronze"|"Silver"|"Gold"|"Alpha"|"Sigma",
}

// Mock leaderboard data
const mockLeaderboardData:UserFormat[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2850,
    eventsAttended: 28,
    rank: 1,
    level: "Gold",

  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2720,
    eventsAttended: 25,
    rank: 2,
    level: "Gold",

  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2650,
    eventsAttended: 24,
    rank: 3,
    level: "Gold",

  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2480,
    eventsAttended: 22,
    rank: 4,
    level: "Silver",

  },
  {
    id: 5,
    name: "Lisa Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2350,
    eventsAttended: 21,
    rank: 5,
    level: "Silver",

  },
  {
    id: 6,
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2180,
    eventsAttended: 19,
    rank: 6,
    level: "Silver",

  },
  {
    id: 7,
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1950,
    eventsAttended: 17,
    rank: 7,
    level: "Bronze",

  },
  {
    id: 8,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1820,
    eventsAttended: 16,
    rank: 8,
    level: "Bronze",
  },
]

export function UserLeaderboard() {
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const [leaderboard, setLeaderboard] = useState<UserFormat[]|undefined>(mockLeaderboardData);  

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-none"
      case "Silver":
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white border-none"
      case "Bronze":
        return "bg-gradient-to-r from-amber-600 to-amber-800 text-white border-none"
      default:
        return "bg-gray-100 text-gray-800 border-none"
    }
  }

  const getTopThreeGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200"
      default:
        return "bg-white border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sky-900 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Community Leaderboard
          </h2>
          <p className="text-gray-600">See how you rank among our most active community members</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-full sm:w-48 border-sky-200 focus:border-sky-400 focus:ring-sky-400">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 border-sky-200 focus:border-sky-400 focus:ring-sky-400">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="environmental">Environmental</SelectItem>
            <SelectItem value="community">Community Service</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="arts">Arts & Culture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top 3 Podium */}
      <Card className="border-sky-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
          <CardTitle className="text-sky-900 flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Top Performers
          </CardTitle>
          <CardDescription>Our community champions leading by example</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockLeaderboardData.slice(0, 3).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border-2 ${getTopThreeGradient(user.rank)} hover:shadow-lg transition-all duration-200`}
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-2 border-2 border-sky-200 shadow-sm">
                    {getRankIcon(user.rank)}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Avatar className="h-16 w-16 mx-auto mb-3 border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg font-bold">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <h3 className="font-bold text-gray-900 mb-1">{user.name}</h3>
                  <Badge className={`${getLevelColor(user.level)} mb-2`}>{user.level}</Badge>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{user.points.toLocaleString()} points</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="h-4 w-4 text-sky-600" />
                      <span>{user.eventsAttended} events</span>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="border-sky-100">
        <CardHeader>
          <CardTitle className="text-sky-900 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Full Rankings
          </CardTitle>
          <CardDescription>Complete leaderboard with detailed statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200 ${
                  user.rank <= 3 ? getTopThreeGradient(user.rank) : "bg-white border-gray-200 hover:border-sky-200"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {user.rank <= 3 ? (
                      getRankIcon(user.rank)
                    ) : (
                      <span className="text-lg font-bold text-gray-600">#{user.rank}</span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="font-bold">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                        <Badge className={`${getLevelColor(user.level)} text-xs`}>{user.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {user.eventsAttended} events
                        </span>

                      </div>

                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="flex items-center gap-1 text-lg font-bold text-sky-600">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {user.points.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-6">
            <Button variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-50">
              Load More Rankings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-sky-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sky-600 mb-1">1,247</div>
            <p className="text-sm text-gray-600">Total Active Users</p>
          </CardContent>
        </Card>
        <Card className="border-sky-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">18,392</div>
            <p className="text-sm text-gray-600">Total Points Earned</p>
          </CardContent>
        </Card>
        <Card className="border-sky-100">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">156</div>
            <p className="text-sm text-gray-600">Events Completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
