"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Search,
  UserMinus,
  Flag,
  Mail,
  CheckCircle,
  AlertCircle,
  XCircle,
  UserCheck,
  UserPlus,
  Loader2,
} from "lucide-react";
import PublisherDashboardAPI from "@/api/PublisherDashboardAPI";
import type { ParticipantType } from "@/types/ParticipantType";

// Define the possible status values based on ParticipantType
const PARTICIPANT_STATUS: Array<{
  value: ParticipantType["status"];
  label: string;
}> = [
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rejected", label: "Rejected" },
];

interface ActivityDetailsDialogProps {
  activity: any;
  onClose: () => void;
  onRemoveParticipant: (activityId: string, participantId: string) => void;
}

export function ActivityDetailsDialog({
  activity,
  onClose,
  onRemoveParticipant,
}: ActivityDetailsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [reportingParticipant, setReportingParticipant] = useState<any>(null);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  const activityId = 9;

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const response = await PublisherDashboardAPI.getActivityParticipants(
          activityId
        );
        console.log(response.data);
        setParticipants(Object.values(response.data));
      } catch (err: any) {
        console.error("Failed to fetch participants:", err);
      } finally {
        setLoading(false); // Set loading to false when done, regardless of success or failure
      }
    };

    fetchParticipants();
  }, []);

  // Memoize the filtered participants to prevent expensive recalculations
  const filteredParticipants = useMemo(() => {
    if (!participants || participants.length === 0) return [];

    return participants.filter((participant: any) => {
      const matchesSearch =
        searchQuery === "" ||
        participant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        participant.status?.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [participants, searchQuery, filterStatus]);

  // Memoize pending participants
  const pendingParticipants = useMemo(() => {
    return participants.filter((p: any) => p.status === "Pending");
  }, [participants]);

  const handleRemoveParticipant = useCallback(
    (participantId: string, participantName: string) => {
      if (
        confirm(
          `Are you sure you want to remove ${participantName} from this activity?`
        )
      ) {
        onRemoveParticipant(activity.id, participantId);
        setParticipants((prev: any[]) =>
          prev.filter((p: any) => p.id !== participantId)
        );
      }
    },
    [activity.id, onRemoveParticipant]
  );

  const handleApproveParticipant = useCallback(
    async (participantId: string, participantName: string) => {
      if (confirm(`Approve ${participantName} for this activity?`)) {
        setParticipants((prev: any[]) =>
          prev.map((p: any) =>
            p.id === participantId ? { ...p, status: "Confirmed" } : p
          )
        );
        const payload = {
          activity_id: Number(activityId),
          user_id: Number(participantId),
          status: "Confirmed" as "Confirmed",
        };
        await PublisherDashboardAPI.changeParticipantStatus(payload);
      }
    },
    []
  );

  const handleRejectParticipant = useCallback(
    async (participantId: string, participantName: string) => {
      if (
        confirm(`Reject ${participantName}'s registration for this activity?`)
      ) {
        setParticipants((prev: any[]) =>
          prev.map((p: any) =>
            p.id === participantId ? { ...p, status: "Cancelled" } : p
          )
        );
        const payload = {
          activity_id: Number(activityId),
          user_id: Number(participantId),
          status: "Cancelled" as "Cancelled",
        };
        await PublisherDashboardAPI.changeParticipantStatus(payload);
      }
    },
    [activityId]
  );

  // Function to approve all pending participants
  const handleApproveAllPending = useCallback(async () => {
    if (pendingParticipants.length === 0) {
      alert("No pending participants to approve.");
      return;
    }

    if (
      confirm(
        `Are you sure you want to approve all ${pendingParticipants.length} pending participants?`
      )
    ) {
      // Update UI
      setParticipants((prev: any[]) =>
        prev.map((p: any) =>
          p.status === "Pending"
            ? (() => {
                const payload = {
                  activity_id: Number(activityId),
                  user_id: Number(p.id),
                  status: "Confirmed" as "Confirmed",
                };
                PublisherDashboardAPI.changeParticipantStatus(payload);
                return { ...p, status: "Confirmed" };
              })()
            : p
        )
      );
      alert(
        `Successfully approved ${pendingParticipants.length} participants!`
      );
    }
  }, [pendingParticipants, activityId]);

  const handleReportParticipant = useCallback((participant: any) => {
    setReportingParticipant(participant);
    setReportReason("");
    setReportDescription("");
  }, []);

  const submitReport = useCallback(() => {
    if (!reportReason || !reportDescription) {
      alert("Please fill in all report fields");
      return;
    }

    // Here you would typically send the report to your backend
    alert(`Report submitted for ${reportingParticipant.name}`);
    setReportingParticipant(null);
    setReportReason("");
    setReportDescription("");
  }, [reportReason, reportDescription, reportingParticipant]);

  const getActivityStatusColor = useCallback((status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 hover:text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800";
      default:
        return "bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-100 hover:text-sky-800";
    }
  }, []);

  const getParticipantStatusColor = useCallback((status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 hover:text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100 hover:text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 hover:text-gray-800";
    }
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "Cancelled":
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
    }
  }, []);

  // Function to capitalize first letter of status
  const formatStatus = useCallback((status: string) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1);
  }, []);

  const isPaidActivity = !activity.isFree;

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden border-sky-100">
          <DialogHeader className="border-b border-sky-100 pb-4">
            <DialogTitle className="text-sky-900 text-xl">
              {activity.title}
            </DialogTitle>
            <DialogDescription>
              Activity details and participant management
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] overflow-hidden">
            {/* Activity Details */}
            <div className="lg:col-span-1 h-full flex flex-col space-y-4 overflow-y-auto pr-2">
              <Card className="flex-1 flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-lg">
                    Activity Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col space-y-3">
                    <p className="text-sm text-gray-700 flex-shrink-0">
                      {activity.description}
                    </p>

                    <div className="space-y-2 text-sm flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-sky-600" />
                        <span>
                          {new Date(activity.date).toLocaleDateString()} at{" "}
                          {activity.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sky-600" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-sky-600" />
                        <span>
                          {
                            participants.filter(
                              (p: any) => p.status === "Confirmed"
                            ).length
                          }{" "}
                          participants
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-sky-600" />
                        <span>
                          {activity.isFree ? "Free" : `$${activity.price}`}
                        </span>
                      </div>
                    </div>

                    <Badge
                      className={`${getActivityStatusColor(
                        activity.status
                      )} w-fit cursor-default flex-shrink-0`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals for Paid Activities */}
              {pendingParticipants.length > 0 && (
                <Card className="border-yellow-200 flex-shrink-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-yellow-800 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Pending Approvals ({pendingParticipants.length})
                      </CardTitle>
                      <Button
                        onClick={handleApproveAllPending}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 h-7"
                      >
                        <UserPlus className="h-3 w-3 mr-1" />
                        Approve All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {pendingParticipants.map((participant: any) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-2 border border-yellow-200 rounded-lg bg-yellow-50"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={participant.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback className="text-xs">
                                {participant.name?.charAt(0) || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-xs truncate">
                                {participant.name}
                              </p>
                              <p className="text-xs text-gray-600 truncate">
                                {participant.email}
                              </p>
                            </div>
                          </div>
                          {/* <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveParticipant(participant.id, participant.name)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 h-6 px-1"
                            >
                              <UserCheck className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectParticipant(participant.id, participant.name)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-6 px-1"
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </div> */}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Participants List */}
            <div className="lg:col-span-2 h-full">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      All Participants (
                      {
                        participants.filter((p: any) => p.status !== "Rejected")
                          .length
                      }
                      )
                    </CardTitle>
                    {/* Bulk Approve Button in main header */}
                    {pendingParticipants.length > 0 && (
                      <Button
                        onClick={handleApproveAllPending}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Approve All Pending ({pendingParticipants.length})
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search participants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-sky-200 focus:border-sky-400 focus:ring-sky-400"
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full sm:w-48 border-sky-200 focus:border-sky-400 focus:ring-sky-400">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {PARTICIPANT_STATUS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto pr-2">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center h-64">
                        <Loader2 className="h-10 w-10 text-sky-600 animate-spin mb-4" />
                        <div className="text-gray-600 font-medium">
                          Loading participants...
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredParticipants.map((participant: any) => (
                          <div
                            key={participant.id}
                            className="flex flex-wrap md:flex-nowrap items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-sky-200 transition-colors"
                          >
                            <div className="flex items-center gap-3 w-full md:w-auto md:flex-1">
                              <Avatar className="h-10 w-10 flex-shrink-0">
                                <AvatarImage
                                  src={participant.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {participant.name?.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <p className="font-medium text-gray-900 truncate">
                                    {participant.name}
                                  </p>
                                  <Badge
                                    className={`${getParticipantStatusColor(
                                      participant.status
                                    )} text-xs cursor-default whitespace-nowrap`}
                                  >
                                    {getStatusIcon(participant.status)}
                                    <span className="ml-1">
                                      {formatStatus(participant.status)}
                                    </span>
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-600">
                                  <div className="flex items-center gap-1 truncate">
                                    <Mail className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate">
                                      {participant.email}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0 w-full md:w-auto justify-end">
                              {activity.status === "active" &&
                                participant.status === "Pending" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleApproveParticipant(
                                          participant.id,
                                          participant.name
                                        )
                                      }
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                                    >
                                      <UserCheck className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleRejectParticipant(
                                          participant.id,
                                          participant.name
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              {activity.status === "active" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleReportParticipant(participant)
                                    }
                                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                                  >
                                    <Flag className="h-4 w-4" />
                                  </Button>
                                  {/* <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleRemoveParticipant(
                                        participant.id,
                                        participant.name
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                  >
                                    <UserMinus className="h-4 w-4" />
                                  </Button> */}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!loading && filteredParticipants.length === 0 && (
                      <div className="flex-1 flex items-center justify-center h-64">
                        <div className="text-center">
                          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No participants found
                          </h3>
                          <p className="text-gray-600">
                            {searchQuery || filterStatus !== "all"
                              ? "Try adjusting your search or filter criteria"
                              : "No participants have joined this activity yet"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-sky-100">
            <Button
              onClick={onClose}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Participant Dialog */}
      {reportingParticipant && (
        <Dialog open={true} onOpenChange={() => setReportingParticipant(null)}>
          <DialogContent className="max-w-md border-orange-100">
            <DialogHeader className="border-b border-orange-100 pb-4">
              <DialogTitle className="text-orange-900 flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Report Participant
              </DialogTitle>
              <DialogDescription>
                Report {reportingParticipant.name} for inappropriate behavior
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Reason for Report
                </label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger className="border-gray-200 focus:border-orange-400 focus:ring-orange-400">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inappropriate-behavior">
                      Inappropriate Behavior
                    </SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="spam">
                      Spam or Promotional Content
                    </SelectItem>
                    <SelectItem value="fake-profile">Fake Profile</SelectItem>
                    <SelectItem value="no-show">Repeated No-Shows</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Please provide details about the issue..."
                  rows={4}
                  className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-orange-100">
              <Button
                variant="outline"
                onClick={() => setReportingParticipant(null)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={submitReport}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Submit Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
