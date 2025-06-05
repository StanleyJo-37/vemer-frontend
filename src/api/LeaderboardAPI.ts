import API from "./axios";
import { UserFormat } from "@/components/leaderboard";


const LeaderboardAPI = {
    getLeaderboard: async (category:string):Promise<UserFormat[]> => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/user',
            method: 'GET',
            params: {
                category
            },
        });
    },
    
    getTotalActiveUser: async (category:string):Promise<number> => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/total-user',
            method: 'GET',
            params: {
                category
            },
        });
    },

    getTotalPointsEarned: async (category:string):Promise<number> => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/total-points',
            method: 'GET',
            params: {
                category
            },
        });
    },

    getTotalEventsCompleted: async (category:string):Promise<number> => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/total-points',
            method: 'GET',
            params: {
                category
            },
        });
    },
};

export default LeaderboardAPI;