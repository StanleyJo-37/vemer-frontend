import { extend } from "lodash";
import API from "./axios";
import { UserFormat } from "@/components/leaderboard";
import { boolean } from "zod";

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
  title: string,
  image: File|null,
  activity_description :string,
  category :string,
  start_date : string,
  end_date: string,
  location : string,
  point_reward : number,
}

interface CreateRegisterPopupInfoPayload {
  popup_title: string;
  popup_description: string;
}

interface CreateBadgePayload {
  activity_id: number;
  name: string;
  icon: File|null;
  badge_description: string;
}

export type CreateActivityFull = Omit<CreateBadgePayload, "activity_id"> & CreateActivityPayload & CreateRegisterPopupInfoPayload & {
  badge_exist: boolean,
  popup_exist: boolean
};

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
      url: "/dashboard/publisher/activities",
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

    Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
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

  createRegisterPopupInfo: async (
    payload: CreateRegisterPopupInfoPayload
  ): Promise<SuccessResponse> => {

    return API.AuthenticatedAPI.request({
      url: "/dashboard/publisher/create-register-popup-info",
      method: "POST",
      data: payload,
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
      console.log("Val: ",value, "typeval", typeof value);
        formData.append(key, value as string | Blob);
    });

    return API.AuthenticatedAPI.request({
      url: "/dashboard/publisher/create-badge",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  createActivityFull: async (
    payload: CreateActivityFull
  ): Promise<SuccessResponse> => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        formData.append(key, value ? "1" : "0");
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    return API.AuthenticatedAPI.request({
      url: "/dashboard/publisher/create-activity-popup-badge",
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
      url: "/dashboard/publisher/approve-participant",
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
      url: "/dashboard/publisher/upload-image",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  isPublisher: async (): Promise<SuccessResponse> => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/publisher/is-publisher",
      method: "GET",
    });
  },
};

export default PublisherDashboardAPI;
