import API from "./axios";

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
};

export default UserDashboardAPI;