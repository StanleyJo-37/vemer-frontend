import API from "./axios";
import { UserFormat } from "@/components/leaderboard";

interface Activity {
  id: number;
  name: string;
  slug: string;
  description: string;
  what_will_you_get: string;
  category: string;
  location: string;
  point_reward: number;
  start_date: string;
  end_date: string;
  status: number;
}

interface Notification {
  notification_title: string;
  content: string;
  activity_name: string;
  type: string;
  active_from: string;
}

interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

interface CreateActivityPayload {
  title: string;
  image: File;
  about: string;
  what_will_you_get: string;
  category: string;
  time: string; 
  date: string;
  location: string;
  point_reward: number;
}

interface CreateBadgePayload {
  activity_id: number;
  name: string;
  image: File;
  description: string;
}

interface ApproveParticipantPayload {
  activity_id: number;
  participant_id: number;
  status: "approved" | "rejected" | "pending";
}

interface SuccessResponse {
  success: boolean;
  message: string;
  data?: any;
}

const PublisherDashboardAPI = {
  totalActivities: async (): Promise<number> => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/publisher/total-activities",
      method: "GET",
    });
  },
  totalParticipants: async (): Promise<number> => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/publisher/total-participants",
      method: "GET",
    });
  },
  totalNotifications: async (): Promise<number> => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/publisher/total-notifications",
      method: "GET",
    });
  },
  getActivities: async (): Promise<Activity[]> => {
    return API.AuthenticatedAPI.request({
      url: "/activities",
      method: "GET",
    });
  },
  getNotifications: async (
    page: number = 1
  ): Promise<PaginatedResponse<Notification>> => {
    return API.AuthenticatedAPI.request({
      url: "/notifications",
      method: "GET",
      params: {
        page, // Mengirim parameter halaman ke backend
      },
    });
  },
  createActivity: async (
    payload: CreateActivityPayload
  ): Promise<SuccessResponse> => {
    const formData = new FormData();

    // Append semua data ke FormData
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return API.AuthenticatedAPI.request({
      url: "/create-activity",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  createBadge: async (
    payload: CreateBadgePayload
  ): Promise<SuccessResponse> => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    return API.AuthenticatedAPI.request({
      url: "/create-badge",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  approveParticipant: async (
    payload: ApproveParticipantPayload
  ): Promise<SuccessResponse> => {
    return API.AuthenticatedAPI.request({
      url: "/approve-participant",
      method: "POST",
      data: payload,
    });
  },
  uploadImage: async (
    image: File,
    folder: string
  ): Promise<SuccessResponse> => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("folder", folder);

    return API.AuthenticatedAPI.request({
      url: "/upload-image",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default PublisherDashboardAPI;
