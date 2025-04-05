import { SocialiteProvider } from "@/types/AuthType";
import API from "./axios";

const AuthAPI = {
    register: async(email: string, password: string, username: string) => {
        return await API.PublicAPI.request({
            url: '/auth/register',
            method: 'POST',
            data: {
                email,
                password,
                username,
            }
        });
    },
    login: async(email: string, password: string) => {
        return await API.PublicAPI.request({
            url: '/auth/login',
            method: 'POST',
            data: {
                email,
                password,
            }
        });
    },
    loginSSO: async(provider: SocialiteProvider, web_origin: string, target_path: string) => {
        return await API.PublicAPI.request({
            url: '/auth/login/sso',
            method: 'POST',
            data: {
                provider,
                web_origin,
                target_path,
            }
        });
    }
};

export default AuthAPI;