"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Star, Heart, ArrowRight, Lock, HeartOff } from "lucide-react"
import { useRouter } from "next/navigation"

const userBadges = [
  {
    id: "badge1",
    name: "Green Warrior",
    description: "Participated in 10+ environmental activities",
    icon: "🌱",
    category: "Environmental",
    earned: true,
    earnedAt: "2025-05-15T10:00:00Z",
    rarity: "Common",
    progress: 100,
    isFavorite: true,
  },
  {
    id: "badge2",
    name: "Community Helper",
    description: "Volunteered 50+ hours in community service",
    icon: "🤝",
    category: "Community Service",
    earned: true,
    earnedAt: "2025-06-01T14:30:00Z",
    rarity: "Rare",
    progress: 100,
    isFavorite: true,
  },
  {
    id: "badge3",
    name: "Early Bird",
    description: "Joined 5 events before 9 AM",
    icon: "🌅",
    category: "Achievement",
    earned: true,
    earnedAt: "2025-06-10T08:00:00Z",
    rarity: "Uncommon",
    progress: 100,
    isFavorite: false,
  },
  {
    id: "badge4",
    name: "Team Player",
    description: "Worked with 100+ different volunteers",
    icon: "👥",
    category: "Social",
    earned: true,
    earnedAt: "2025-06-12T16:45:00Z",
    rarity: "Epic",
    progress: 100,
    isFavorite: false,
  },
  {
    id: "badge5",
    name: "Education Champion",
    description: "Lead 5 educational workshops",
    icon: "📚",
    category: "Education",
    earned: false,
    earnedAt: null,
    rarity: "Rare",
    progress: 2,
    maxProgress: 5,
    isFavorite: false,
  },
  {
    id: "badge6",
    name: "Art Enthusiast",
    description: "Participated in 3 arts & culture events",
    icon: "🎨",
    category: "Arts & Culture",
    earned: false,
    earnedAt: null,
    rarity: "Uncommon",
    progress: 1,
    maxProgress: 3,
    isFavorite: true,
  },
]

export function UserBadges() {
  const router = useRouter()
  const [badges, setBadges] = useState(userBadges)

  const earnedBadges = badges.filter((badge) => badge.earned)

  const handleViewAllBadges = () => {
    router.push("/user-dashboard/badges")
  }

  const toggleFavorite = (badgeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setBadges(badges.map((badge) => (badge.id === badgeId ? { ...badge, isFavorite: !badge.isFavorite } : badge)))
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Uncommon":
        return "bg-green-100 text-green-800 border-green-200"
      case "Rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="border-sky-100 h-full">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Your Badges
            </CardTitle>
            <CardDescription>
              {earnedBadges.length} of {badges.length} badges earned
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllBadges}
            className="border-sky-200 text-sky-700 hover:bg-sky-50 self-start sm:self-auto"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-3 sm:p-4 border-2 rounded-lg transition-all duration-200 hover:shadow-md ${
                badge.earned
                  ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                  : "border-gray-200 bg-gray-50 opacity-75"
              }`}
            >
              {/* Favorite Toggle */}
              <div className="absolute -top-2 -right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 bg-white rounded-full shadow-sm border"
                  onClick={(e) => toggleFavorite(badge.id, e)}
                >
                  {badge.isFavorite ? (
                    <Heart className="h-3 w-3 text-red-500 fill-current" />
                  ) : (
                    <HeartOff className="h-3 w-3 text-gray-400" />
                  )}
                </Button>
              </div>

              {/* Lock Icon for Unearned Badges */}
              {!badge.earned && (
                <div className="absolute top-2 left-2">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
              )}

              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-2 filter grayscale-0">{badge.icon}</div>

                <h3 className={`font-semibold text-sm mb-1 ${badge.earned ? "text-gray-900" : "text-gray-500"}`}>
                  {badge.name}
                </h3>

                <p className={`text-xs mb-2 line-clamp-2 ${badge.earned ? "text-gray-600" : "text-gray-400"}`}>
                  {badge.description}
                </p>

                <Badge className={`${getRarityColor(badge.rarity)} text-xs mb-2 cursor-default`}>{badge.rarity}</Badge>

                {badge.earned ? (
                  <div className="text-xs text-green-600 font-medium">
                    Earned {new Date(badge.earnedAt!).toLocaleDateString()}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">
                      Progress: {badge.progress}/{badge.maxProgress}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-sky-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(badge.progress / badge.maxProgress!) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Badge Collection Progress</span>
            <span className="font-semibold text-sky-600">
              {earnedBadges.length}/{badges.length}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{badges.length - earnedBadges.length} more badges to unlock</p>
        </div>

        {/* Next Badge to Earn */}
        {badges.filter((b) => !b.earned).length > 0 && (
          <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-medium text-sky-900">Next Badge Goal</span>
            </div>
            {(() => {
              const nextBadge = badges.find((b) => !b.earned)
              return nextBadge ? (
                <div className="flex items-center gap-3">
                  <span className="text-lg">{nextBadge.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{nextBadge.name}</p>
                    <p className="text-xs text-gray-600">
                      {nextBadge.progress}/{nextBadge.maxProgress} - {nextBadge.description}
                    </p>
                  </div>
                </div>
              ) : null
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
