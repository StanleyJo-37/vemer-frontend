import { StatsType } from "@/types/DashboardType";
import API from "./axios";
import { UserFormat } from "@/components/leaderboard";
import { AxiosResponse } from "axios";

const UserDashboardAPI = {
  totalActivities: async (category: string): Promise<UserFormat[]> => {
    return API.AuthenticatedAPI.request({
      url: "/leaderboard/user",
      method: "GET",
      params: {
        category,
      },
    });
  },

  getStats: async (): Promise<AxiosResponse<StatsType>> => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/user/stats",
      method: "GET",
    });
  },

  getUpcomingEvents: async ({ limit }: { limit?: number }) => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/user/upcoming-activities",
      method: "GET",
      params: {
        limit,
      },
    });
  },

  getRecentAnnouncements: async ({ limit }: { limit?: number }) => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/user/announcements",
      method: "GET",
      params: {
        limit,
      },
    });
  },

  getEventRecommendations: async ({ limit }: { limit?: number }) => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/user/recommended-activities",
      method: "GET",
      params: {
        limit,
      },
    });
  },

  getParticipatedEvents: async ({ limit }: { limit?: number }) => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/user/attended-activities",
      method: "GET",
      params: {
        limit,
      },
    });
  },

  getUserBadges: async ({ limit }: { limit?: number }) => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/user/badges",
      method: "GET",
      params: {
        limit,
      },
    });
  },
};

export default UserDashboardAPI;
