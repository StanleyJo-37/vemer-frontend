import API from "./axios";
import { UserFormat } from "@/components/leaderboard";

const DashboardAPI = {
    totalActivities: async (category:string):Promise<UserFormat[]> => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/user',
            method: 'GET',
            params: {
                category
            },
        });
    },
    
};

export default DashboardAPI;