import { StatsType } from "@/types/DashboardType";
import API from "./axios";
import { UserFormat } from "@/components/leaderboard";
import { AxiosResponse } from "axios";

const baseUrl = "/dashboard/user"

const UserDashboardAPI = {
    attendedActivities: async ():Promise<{data:number}> => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/attended-activities',
            method: 'GET',
        });
    },
    totalPoints: async ():Promise<{data:number}> => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/total-points',
            method: 'GET',
        });
    },
    getRank: async () => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/get-rank',
            method: 'GET',
        });
    },
    upcomingActivities: async () => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/upcoming-activities',
            method: 'GET',
        });
    },
    announcements: async () => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/announcements',
            method: 'GET',
        });
    },
    recommendedActivities: async () => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/recommended-activities',
            method: 'GET',
        });
    },
    recentActivities: async () => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/recent-activities',
            method: 'GET',
        });
    },
    badges: async () => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/badges',
            method: 'GET',
        });
    },
    favouriteBadges: async () => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/favourite-badges',
            method: 'GET',
        });
    },
    setFavouriteBadges: async (data: any) => {
        return API.AuthenticatedAPI.request({
            url: baseUrl+'/set-favourite-badges',
            method: 'POST',
            data,
        });
    },
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

  getUserBadges: async ({ limit, page, per_page }: { limit?: number, page?:number, per_page?:number }) => {
    return API.AuthenticatedAPI.request({
      url: "/dashboard/user/badges",
      method: "GET",
      params: {
        limit,
        page,
        per_page
      },
    });
  },
};

export default UserDashboardAPI;