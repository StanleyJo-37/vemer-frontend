import { StatsType } from "@/types/DashboardType";
import API from "./axios";
import { UserFormat } from "@/components/leaderboard";
import { AxiosResponse } from "axios";

const DashboardAPI = {
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
      url: "/dashboard/stats",
      method: "GET",
    });
  },
};

export default DashboardAPI;
