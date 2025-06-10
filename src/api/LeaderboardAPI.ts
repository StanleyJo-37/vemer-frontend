import API from "./axios";
import { UserFormat } from "@/components/leaderboard";

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const LeaderboardAPI = {
    getLeaderboard: async (params: {
    category: string;
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<UserFormat>> => {
    // We use API.request directly from your main Axios instance
    const response = await API.PublicAPI.get('/leaderboard/user', {
      params: {
        category: params.category,
        per_page: params.per_page ?? 15, // Default to 15 per page
        page: params.page ?? 1,         // Default to page 1
      },
    });

    // Axios responses have the actual data in the `data` property
    return response.data;
  },
    
    getTotalActiveUser: async (category: string): Promise<{ data: number }> => {
        return API.PublicAPI.request({
            url: '/leaderboard/total-user',
            method: 'GET',
            params: { category },
    });
},


    getTotalPointsEarned: async (category:string):Promise<{ data: number }> => {
        return API.PublicAPI.request({
            url: '/leaderboard/total-points',
            method: 'GET',
            params: {
                category
            },
        });
    },

    getTotalEventsCompleted: async (category:string):Promise<{ data: number }> => {
        return API.PublicAPI.request({
            url: '/leaderboard/events-completed',
            method: 'GET',
            params: {
                category
            },
        });
    },
};

export default LeaderboardAPI;