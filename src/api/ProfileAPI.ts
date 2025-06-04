import API from "./axios";

const ProfileAPI = {
    me: async() => {
        return API.AuthenticatedAPI.request({
            url: '/me',
            method: 'GET',
        });
    },
};

export default ProfileAPI;