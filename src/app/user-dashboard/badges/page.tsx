"use client"

import type React from "react"

import { useCallback, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Star, Heart, ArrowLeft, Lock, HeartOff, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import UserDashboardAPI from "@/api/UserDashboardAPI"
import { toast } from "@/hooks/useToast"
import { AxiosError } from "axios";
import Image from "next/image"
import { Loader2 } from "lucide-react"

const allBadges: BadgeType[] = [
  {
    id: 1,
    badge_name: "Green Warrior",
    description: "Participated in 10+ environmental activities",
    image_url: "🌱_url", // Placeholder, replace with actual image URL
    category_name: "Environmental",
    created_at: "2025-05-15T10:00:00Z", // Placeholder
    favourite: true,
  },
  {
    id: 2,
    badge_name: "Community Helper",
    description: "Volunteered 50+ hours in community service",
    image_url: "🤝_url", // Placeholder
    category_name: "Community Service",
    created_at: "2025-06-01T14:30:00Z", // Placeholder
    favourite: true,
  },
  {
    id: 3,
    badge_name: "Early Bird",
    description: "Joined 5 events before 9 AM",
    image_url: "🌅_url", // Placeholder
    category_name: "Achievement",
    created_at: "2025-06-10T08:00:00Z", // Placeholder
    favourite: false,
  },
  {
    id: 4,
    badge_name: "Team Player",
    description: "Worked with 100+ different volunteers",
    image_url: "👥_url", // Placeholder
    category_name: "Social",
    created_at: "2025-06-12T16:45:00Z", // Placeholder
    favourite: false,
  },
  {
    id: 5,
    badge_name: "Education Champion",
    description: "Lead 5 educational workshops",
    image_url: "📚_url", // Placeholder
    category_name: "Education",
    created_at: "2025-01-01T00:00:00Z", // Placeholder
    favourite: false,
  },
  {
    id: 6,
    badge_name: "Art Enthusiast",
    description: "Participated in 3 arts & culture events",
    image_url: "🎨_url", // Placeholder
    category_name: "Arts & Culture",
    created_at: "2025-01-01T00:00:00Z", // Placeholder
    favourite: true,
  },
  {
    id: 7,
    badge_name: "Night Owl",
    description: "Participated in 3 evening events",
    image_url: "🦉_url", // Placeholder
    category_name: "Achievement",
    created_at: "2025-01-01T00:00:00Z", // Placeholder
    favourite: false,
  },
  {
    id: 8,
    badge_name: "Marathon Volunteer",
    description: "Volunteered for 8+ hours in a single day",
    image_url: "🏃_url", // Placeholder
    category_name: "Achievement",
    created_at: "2025-01-01T00:00:00Z", // Placeholder
    favourite: false,
  },
]

type BadgeType = {
  id: number,
  badge_name: string,
  created_at:string,
  description: string,
  image_url:string,
  category_name:string,
  favourite:boolean
}

export default function BadgesPage() {
  const router = useRouter()
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [badgesPage, setBadgesPage] = useState<number>(1);

  // const earnedBadges = badges.filter((badge) => badge.earned);

  const getUserBadges = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await UserDashboardAPI.getUserBadges({ page: badgesPage, per_page:16 });
      setBadges(resp.data.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message || err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [badgesPage]);

  useEffect(() => {
    getUserBadges();
  }, [getUserBadges]);
  

  const toggleFavorite = (badgeId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setBadges(badges.map((badge) => (badge.id === badgeId ? { ...badge, isFavorite: !badge.favourite } : badge)))
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
      case "favorites":
        return badge.favourite
      default:
        return true
    }
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-4 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-sky-600 mb-4" />
        <p className="text-lg text-gray-700">Loading Badges...</p>
        <p className="text-sm text-gray-500">Please wait a moment.</p>
      </div>
    );
  }else{ return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 hover:bg-sky-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Badge Collection</h1>
            <p className="text-gray-600 mt-2">
              {earnedBadges.length} of {badges.length} badges earned
            </p>
          </div> */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Badges</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Progress Summary
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
      </Card> */}

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredBadges.map((badge) => (
          <Card
            key={badge.id}
            className={`relative border-2 transition-all duration-200 hover:shadow-md border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50`}
          >
            {/* Favorite Toggle */}
            <div className="absolute -top-2 -right-2 z-10">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white rounded-full shadow-sm border"
                onClick={(e) => toggleFavorite(badge.id, e)}
              >
                {badge.favourite ? (
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                ) : (
                  <HeartOff className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>

            <CardContent className="p-4 sm:p-6 text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3">
                <Image
                  src={badge.image_url}
                  alt={badge.badge_name}
                  layout="fill"
                  objectFit="contain"
                />
                </div>

              <h3 className={`font-semibold text-base mb-2 text-gray-900`}>
                {badge.badge_name}
              </h3>

              <p className={`text-sm mb-3 line-clamp-2 text-gray-600`}>
                {badge.description}
              </p>

              <div className="space-y-2">
                <Badge variant="outline" className="text-xs cursor-default">
                  {badge.category_name}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBadges.length > 0 && (
      <div className="mt-8 flex justify-center items-center space-x-4">
      <Button
        onClick={() => setBadgesPage((prev) => Math.max(1, prev - 1))}
        disabled={badgesPage === 1}
        variant="outline"
      >
        Previous
      </Button>
      <span className="text-sm text-gray-700">Page {badgesPage}</span>
      <Button
        onClick={() => setBadgesPage((prev) => prev + 1)}
        disabled={badges.length < 16} // Assuming 16 is the per_page limit
        variant="outline"
      >
        Next
      </Button>
      </div>
    )}

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
    </div>
  )
}};
