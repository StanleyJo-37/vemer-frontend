import { LoginRequestType, RegisterRequestType, SocialiteProvider } from "@/types/AuthType";
import API from "./axios";

const AuthAPI = {
    register: async(data: RegisterRequestType) => {
        return await API.PublicAPI.request({
            url: '/auth/register',
            method: 'POST',
            data,
        });
    },
    login: async(data: LoginRequestType) => {
        return await API.PublicAPI.request({
            url: '/auth/login',
            method: 'POST',
            data,
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