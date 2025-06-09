"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Heart, ArrowRight, HeartOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import UserDashboardAPI from "@/api/UserDashboardAPI";
import LoadingSpinner from "../loading-spinner";
import { Loader2 } from "lucide-react";

const dummyBadge = [
    {
      id: "badge1",
      name: "Green Warrior",
      description: "Participated in 10+ environmental activities",
      icon: "🌱",
      category: "Environmental",
      earnedAt: "2025-05-15T10:00:00Z",
      isFavorite: true,
    },
    {
      id: "badge2",
      name: "Community Helper",
      description: "Volunteered 50+ hours in community service",
      icon: "🤝",
      category: "Community Service",
      earnedAt: "2025-06-01T14:30:00Z",
      isFavorite: true,
    },
    {
      id: "badge6",
      name: "Art Enthusiast",
      description: "Participated in 3 arts & culture events",
      icon: "🎨",
      category: "Arts & Culture",
      earnedAt: "2025-06-01T14:30:00Z",
      isFavorite: false,
    },
    {
      id: "badge3",
      name: "Early Bird",
      description: "Joined 5 events before 9 AM",
      icon: "🌅",
      category: "Achievement",
      earnedAt: "2025-06-10T08:00:00Z",
      isFavorite: false,
    },
    {
      id: "badge4",
      name: "Team Player",
      description: "Worked with 100+ different volunteers",
      icon: "👥",
      category: "Social",
      earnedAt: "2025-06-12T16:45:00Z",
      isFavorite: false,
    },
    {
      id: "badge5",
      name: "Education Champion",
      description: "Lead 5 educational workshops",
      icon: "📚",
      category: "Education",
      earnedAt: "2025-06-12T16:45:00Z",
      isFavorite: false,
    },
  ]

export function UserBadges() {
  const router = useRouter();
  const [userBadges, setUserBadges] = useState<any[]>(dummyBadge);

  const handleViewAllBadges = () => {
    router.push("/user-dashboard/badges");
  };

  const toggleFavorite = (badgeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserBadges(
      userBadges.map((badge) =>
        badge.id === badgeId
          ? { ...badge, isFavorite: !badge.isFavorite }
          : badge
      )
    );
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { toast } = useToast();

  const getUserBadges = async () => {
    setIsLoading(true);
    try {
      const resp = await UserDashboardAPI.getUserBadges({ limit: 4 });
      setUserBadges(resp.data.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message || err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserBadges();
  }, []);

  return (
    <Card className="border-sky-100 h-full">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Your Badges
            </CardTitle>
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
      {isLoading ? (
        <CardContent className="flex flex-row items-center justify-center space-x-4 pt-6">
          <p>Please Wait...</p>
          <LoadingSpinner />
        </CardContent>
      ) : (userBadges.length > 0 ?(
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {userBadges.map((badge) => (
              <div
                key={badge.id}
                className="relative p-3 sm:p-4 border-2 rounded-lg transition-all duration-200 hover:shadow-md border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
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

                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2 filter grayscale-0">
                    {badge.icon}
                  </div>

                  <h3 className="font-semibold text-sm mb-1 text-gray-900">
                    {badge.name}
                  </h3>

                  <p className="text-xs mb-2 line-clamp-2 text-gray-600">
                    {badge.description}
                  </p>

                  <div className="text-xs text-green-600 font-medium">
                    Earned {new Date(badge.earnedAt!).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      ) : 
      ( <div className="text-center py-6 sm:py-8">
              <Award className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No badges unlocked yet.
              </h3>
              <p className="text-gray-600">
                You&rsquo;ll see your badges once you finish missions.
              </p>
            </div>
      )
  )}
  </Card>);
}
