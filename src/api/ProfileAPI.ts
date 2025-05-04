import API from "./axios";

const ProfileAPI = {
    me: async() => {
        return API.AuthenticatedAPI.request({
            url: '/user',
            method: 'GET',
        });
    },
};

export default ProfileAPI;