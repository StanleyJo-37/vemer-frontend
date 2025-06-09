"use client";

import { useState, useEffect, useCallback, act } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JoinEventPopup } from "@/components/join-event-popup";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle,
  Star,
  Award,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { RegistrationStatus } from "@/types/StatusTypes";
import ActivityAPI from "@/api/ActivityAPI";
import API from "@/api/axios";
import { ActivityPayload } from "@/api/ActivityAPI";
import Image from "next/image";

// Helper function to parse benefits into sentences
const parseBenefits = (benefits: string): string[] => {
  if (!benefits) return [];

  const sentences = benefits
    .split(/[.!]\s+|[\n\r]+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)
    .map((sentence) => {
      if (!/[.!?]$/.test(sentence)) {
        return sentence + ".";
      }
      return sentence;
    });

  return sentences;
};

export default function ActivityDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [activity, setActivity] = useState<ActivityPayload|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [canJoin, setCanJoin] = useState(false);
  const [isPublisher, setIsPublisher] = useState(true);
  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>("Unregistered");
  const [showJoinPopup, setShowJoinPopup] = useState(false);

  const handleRender = useCallback(async () => {
    setIsLoading(true);
    const activity_id = Number(params?.activity_id);
    const status: string = (await ActivityAPI.getStatus(activity_id)).data;
    setRegistrationStatus(status as RegistrationStatus);

    const activity = (await ActivityAPI.activity_detail(activity_id)).data;
    setActivity(activity);

    setCanJoin(true);
  }, [params?.activity_id]);

  useEffect(() => {
    handleRender();
    setIsLoading(false);
  }, [params, handleRender]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await API.AuthenticatedAPI.get("/is-publisher");
          setIsPublisher(response.data.is_publisher);
      } catch (error) {
      }
    };
    checkStatus();
  }, []);

  const handleJoinActivity = async (e: React.FormEvent) => {
    if (activity?.popup_info) {
      setShowJoinPopup(true);
    } else {
      setCanJoin(false);
      // Direct join without popup
      alert("Successfully joined the event!");
      const response = await ActivityAPI.enroll(Number(params?.activity_id[0]));
      await handleRender();
      setCanJoin(true);
    }
  };

  const handleJoinConfirm = async () => {
    setCanJoin(false);
    setShowJoinPopup(false);
    alert("Successfully joined the event!");
    const response = await ActivityAPI.enroll(Number(params?.activity_id[0]));
    await handleRender();
    setCanJoin(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activity?.name,
        text: activity?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Activity Not Found
          </h1>
          <p className="text-gray-600 mb-2">
            The activity with ID "{params?.activity_id}" doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/activities")}
            className="bg-sky-600 hover:bg-sky-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Activities
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 hover:bg-sky-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Hero Image */}
            <div className="aspect-video rounded-lg overflow-hidden relative">
            <Image
              src={activity.image || "/images/placeholder.svg"}
              alt={activity.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            </div>

          {/* Activity Info */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {activity.name}
                </h1>
                {/* <Badge
                  variant="secondary"
                  className="mb-4 bg-sky-100 text-sky-800"
                >
                  {activity.category}
                </Badge> */}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-sky-200 hover:bg-sky-50 self-start"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* About This Event */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  About This Event
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {activity.description}
                </p>
              </div>

              {/* Rewards Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  Event Rewards
                </h2>
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-4">
                  <div className="space-y-3">
                    {/* Points */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Earn {activity.points_reward} Points
                        </p>
                        <p className="text-sm text-gray-600">
                          Points will be awarded upon event completion
                        </p>
                      </div>
                    </div>

                    {/* Badge */}
                    {activity.badges && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">
                              Unlock "{activity.badges.name}" Badge
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {activity.badges.description}
                          </p>
                        </div>
                        <Image 
                          alt={activity.badges.name} 
                          src={activity.badges.image || "/public/images/placeholder.svg"} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          priority
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <Card className="mt-6 border-sky-100">
              <CardHeader>
                <CardTitle className="text-lg text-sky-900">
                  Organized by
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold">{activity.organizer}</p>
                    <p className="text-sm text-gray-600">Community Organizer</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Join Card */}
          {!isPublisher && (
            <Card className="border-sky-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-sky-900">
                  Join This Activity
                </CardTitle>
                <CardDescription>
                  Be part of making a positive impact in your community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">


                <Button
                  className={`w-full ${
                    (
                      [
                        "Pending",
                        "Completed",
                        "Confirmed",
                      ] as RegistrationStatus[]
                    ).includes(registrationStatus) || !canJoin
                      ? "bg-sky-100 text-sky-700 border-sky-200"
                      : registrationStatus ===
                        ("Unregistered" as RegistrationStatus)
                      ? "bg-sky-600 hover:bg-sky-700"
                      : "bg-red-500 hover:bg-red-300"
                  }`}
                  onClick={handleJoinActivity}
                  variant={
                    (
                      [
                        "Pending",
                        "Completed",
                        "Confirmed",
                      ] as RegistrationStatus[]
                    ).includes(registrationStatus)
                      ? "outline"
                      : "default"
                  }
                  disabled={
                    (
                      [
                        "Pending",
                        "Completed",
                        "Confirmed",
                      ] as RegistrationStatus[]
                    ).includes(registrationStatus) || !canJoin
                  }
                >
                  {canJoin
                    ? (() => {
                        switch (registrationStatus) {
                          case "Pending":
                            return (
                              <>
                                <Heart className="mr-2 h-4 w-4 fill-current" />
                                Pending Approval
                              </>
                            );
                          case "Completed":
                            return (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                Completed
                              </>
                            );
                          case "Confirmed":
                            return (
                              <>
                                <Star className="mr-2 h-4 w-4 text-yellow-500" />
                                Confirmed
                              </>
                            );
                          case "Unregistered":
                            return "Join Activity";
                          case "Cancelled":
                            return (
                              <>
                                <Heart className="mr-2 h-4 w-4 text-red-500" />
                                Rejected
                              </>
                            );
                          default:
                            return "Join Activity";
                        }
                      })()
                    : "Wait ..."}
                </Button>

                <div className="text-sm text-gray-600 text-center">
                  {registrationStatus != "Unregistered"
                    ? "You're registered for this activity!"
                    : "Click to register for this activity"}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Event Details */}
          <Card className="border-sky-200">
            <CardHeader>
              <CardTitle className="text-sky-900">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium">
                    {new Date(activity.start_date).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">Start Date</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-sky-600" />
                <div>
                  <p>
                    {new Date(activity.end_date).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">End Date</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium">{activity.location}</p>
                  <p className="text-sm text-gray-600">Location</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium">
                    {activity.participant_count} Participant
                  </p>
                  <p className="text-sm text-gray-600">Attended</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Rewards Card */}
          <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-sky-900 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Event Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-sky-100">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {activity.points_reward} Points
                  </p>
                  <p className="text-xs text-gray-600">
                    Awarded upon completion
                  </p>
                </div>
              </div>

              {activity.badges && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-sky-100">
                  <div className="text-xl">{activity.badges.image}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {activity.badges.name}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* <Card className="border-sky-200">
            <CardHeader>
              <CardTitle className="text-sky-900">What to Bring</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Comfortable clothing and closed-toe shoes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Water bottle and snacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Gloves (if you have them)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Positive attitude and enthusiasm!</span>
                </li>
              </ul>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Join Event Popup */}
      <JoinEventPopup
        isOpen={showJoinPopup}
        onClose={() => setShowJoinPopup(false)}
        status={registrationStatus}
        activity={{title:activity.name, joinPopup: {message: activity.popup_info.description, title: activity.popup_info.Title}}}
        onJoin={handleJoinConfirm}
      />
    </div>
  );
}
