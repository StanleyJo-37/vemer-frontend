"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Star, Heart, ArrowLeft, Lock, HeartOff, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const allBadges = [
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
  {
    id: "badge7",
    name: "Night Owl",
    description: "Participated in 3 evening events",
    icon: "🦉",
    category: "Achievement",
    earned: false,
    earnedAt: null,
    rarity: "Common",
    progress: 0,
    maxProgress: 3,
    isFavorite: false,
  },
  {
    id: "badge8",
    name: "Marathon Volunteer",
    description: "Volunteered for 8+ hours in a single day",
    icon: "🏃",
    category: "Achievement",
    earned: false,
    earnedAt: null,
    rarity: "Epic",
    progress: 0,
    maxProgress: 1,
    isFavorite: false,
  },
]

export default function BadgesPage() {
  const router = useRouter()
  const [badges, setBadges] = useState(allBadges)
  const [filter, setFilter] = useState("all")

  const earnedBadges = badges.filter((badge) => badge.earned)

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

  const filteredBadges = badges.filter((badge) => {
    switch (filter) {
      case "earned":
        return badge.earned
      case "unearned":
        return !badge.earned
      case "favorites":
        return badge.isFavorite
      default:
        return true
    }
  })

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 hover:bg-sky-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Badge Collection</h1>
            <p className="text-gray-600 mt-2">
              {earnedBadges.length} of {badges.length} badges earned
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Badges</SelectItem>
                <SelectItem value="earned">Earned</SelectItem>
                <SelectItem value="unearned">Not Earned</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <Card className="border-sky-100 mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Collection Progress</span>
            <span className="font-semibold text-sky-600">
              {earnedBadges.length}/{badges.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{badges.length - earnedBadges.length} more badges to unlock</p>
        </CardContent>
      </Card>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredBadges.map((badge) => (
          <Card
            key={badge.id}
            className={`relative border-2 transition-all duration-200 hover:shadow-md ${
              badge.earned
                ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                : "border-gray-200 bg-gray-50 opacity-75"
            }`}
          >
            {/* Favorite Toggle */}
            <div className="absolute -top-2 -right-2 z-10">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white rounded-full shadow-sm border"
                onClick={(e) => toggleFavorite(badge.id, e)}
              >
                {badge.isFavorite ? (
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                ) : (
                  <HeartOff className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>

            {/* Lock Icon for Unearned Badges */}
            {!badge.earned && (
              <div className="absolute top-3 left-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
            )}

            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl mb-3">{badge.icon}</div>

              <h3 className={`font-semibold text-base mb-2 ${badge.earned ? "text-gray-900" : "text-gray-500"}`}>
                {badge.name}
              </h3>

              <p className={`text-sm mb-3 line-clamp-2 ${badge.earned ? "text-gray-600" : "text-gray-400"}`}>
                {badge.description}
              </p>

              <div className="space-y-2">
                <Badge className={`${getRarityColor(badge.rarity)} text-xs cursor-default`}>{badge.rarity}</Badge>

                <Badge variant="outline" className="text-xs cursor-default">
                  {badge.category}
                </Badge>
              </div>

              {badge.earned ? (
                <div className="mt-4 text-xs text-green-600 font-medium">
                  Earned {new Date(badge.earnedAt!).toLocaleDateString()}
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <div className="text-xs text-gray-500">
                    Progress: {badge.progress}/{badge.maxProgress}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(badge.progress / badge.maxProgress!) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No badges found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filter to see more badges.</p>
          <Button onClick={() => setFilter("all")} variant="outline">
            Show All Badges
          </Button>
        </div>
      )}

      {/* Next Badge Goal */}
      {badges.filter((b) => !b.earned).length > 0 && filter === "all" && (
        <Card className="mt-6 border-sky-200 bg-sky-50">
          <CardHeader>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-sky-600" />
              Next Badge Goals
            </CardTitle>
            <CardDescription>Badges you're closest to earning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges
                .filter((b) => !b.earned)
                .sort((a, b) => b.progress / b.maxProgress! - a.progress / a.maxProgress!)
                .slice(0, 2)
                .map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-sky-200">
                    <span className="text-2xl">{badge.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{badge.name}</p>
                      <p className="text-xs text-gray-600 mb-1">
                        {badge.progress}/{badge.maxProgress} - {badge.description}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-sky-600 h-1.5 rounded-full"
                          style={{ width: `${(badge.progress / badge.maxProgress!) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
