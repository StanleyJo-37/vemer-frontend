"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  Users,
  Star,
  Award,
  Calendar,
  MapPin,
  Loader2,
} from "lucide-react";
import { ParticipantType } from "@/types/ParticipantType";
import PublisherDashboardAPI from "@/api/PublisherDashboardAPI";
import { Activity } from "@/app/activities/page";

interface EndEventDialogProps {
  activity: Activity;
  onClose: () => void;
  onEndEvent: (attendanceData: { [key: string]: boolean }) => void;
}

export function EndEventDialog({
  activity,
  onClose,
  onEndEvent,
}: EndEventDialogProps) {
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  const handleAttendanceChange = (participantId: string, attended: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [participantId]: attended,
    }));
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const response = await PublisherDashboardAPI.getActivityParticipants(
          activity.id
        );
        // Only include participants with status "Completed" (case-insensitive)
        const filtered = Object.values(response.data).filter(
          (p: any) => p.status?.toLowerCase() === "confirmed"
        );
        setParticipants(filtered as ParticipantType[]);
      } catch (err: any) {
        console.error("Failed to fetch participants:", err);
      } finally {
        setLoading(false); // Set loading to false when done, regardless of success or failure
      }
    };

    fetchParticipants();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const attendedCount = Object.values(attendance).filter(Boolean).length;
    alert(
      `Event ended! ${attendedCount} participants attended and received ${
        activity.points_reward
      } points${activity.badge ? " and a badge" : ""}.`
    );

    await PublisherDashboardAPI.endActivity(activity.id);
    
    onEndEvent(attendance);
    setIsSubmitting(false);
  };

  const attendedCount = Object.values(attendance).filter(Boolean).length;
  const totalParticipants = participants.length || 0;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-sky-100">
        <DialogHeader className="border-b border-sky-100 pb-4">
          <DialogTitle className="text-sky-900 text-xl flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            End Event: {activity.name}
          </DialogTitle>
          <DialogDescription>
            Mark attendance for participants to award points and badges
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Summary */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-sky-100">
              <CardHeader>
                <CardTitle className="text-lg text-sky-900">
                  Event Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-sky-600" />
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-600" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-sky-600" />
                    <span>{totalParticipants} registered participants</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Rewards</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{activity.points} points</span>
                    </div>
                    {activity.badge && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">
                          {activity.badge.name} badge
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600">
                      {attendedCount}/{totalParticipants}
                    </div>
                    <p className="text-sm text-gray-600">Marked as attended</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance List */}
          <div className="lg:col-span-2">
            <Card className="border-sky-100 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-sky-900">
                  Mark Attendance
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Check the participants who attended the event to award them
                  points and badges
                </p>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-10 w-10 text-sky-600 animate-spin mb-4" />
                    <div className="text-gray-600 font-medium">
                      Loading participants...
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {participants?.map((participant: any) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-sky-200 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar>
                            <AvatarImage
                              src={participant.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {participant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">
                              {participant.name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {participant.email}
                            </p>
                            <p className="text-xs text-gray-500">
                              Joined:{" "}
                              {new Date(
                                participant.joinedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right text-sm">
                            {attendance[participant.id] && (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-yellow-600">
                                  <Star className="h-3 w-3" />
                                  <span>+{activity.points} pts</span>
                                </div>
                                {activity.badge && (
                                  <div className="flex items-center gap-1 text-purple-600">
                                    <Award className="h-3 w-3" />
                                    <span>Badge</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`attendance-${participant.id}`}
                              checked={attendance[participant.id] || false}
                              onCheckedChange={(checked) =>
                                handleAttendanceChange(
                                  participant.id,
                                  checked as boolean
                                )
                              }
                              className="data-[state=checked]:bg-sky-600 data-[state=checked]:border-sky-600"
                            />
                            <label
                              htmlFor={`attendance-${participant.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Attended
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!loading &&
                  (!participants ||
                    participants.length === 0) && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No participants
                      </h3>
                      <p className="text-gray-600">
                        No one registered for this event
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-sky-100">
          <div className="text-sm text-gray-600">
            {attendedCount > 0 && (
              <span>
                {attendedCount} participant{attendedCount !== 1 ? "s" : ""} will
                receive {activity.points} points
                {activity.badge ? ` and the ${activity.badge.name} badge` : ""}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || attendedCount === 0}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              {isSubmitting
                ? "Ending Event..."
                : `End Event & Award ${attendedCount} Participants`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
