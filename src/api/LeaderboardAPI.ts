import API from "./axios";


const LeaderboardAPI = {
    getLeaderboard: async (category:string) => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/user',
            method: 'GET',
            params: {
                category
            },
        });
    },
    
    getTotalActiveUser: async (category:string) => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/total-user',
            method: 'GET',
            params: {
                category
            },
        });
    },

    getTotalPointsEarned: async (category:string) => {
        return API.AuthenticatedAPI.request({
            url: '/leaderboard/total-points',
            method: 'GET',
            params: {
                category
            },
        });
    },

    getTotalEventsCompleted: async (category:string) => {
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