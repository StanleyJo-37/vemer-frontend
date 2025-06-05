"use server";
import Axios from "axios";
import API_URL from ".";
import { cookies } from "next/headers";


const PublicAPI = Axios.create({
    baseURL: API_URL.local + '/public',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const AuthenticatedAPI = Axios.create({
    baseURL: API_URL.local + '/auth',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

PublicAPI.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        throw error;
    }
);

AuthenticatedAPI.interceptors.request.use(
    async (config) => {
        const token = cookies().get("vemer_token");
        if (token) {
            if (config.headers) {
                config.headers['Authorization'] = `BEARER ${token}`;
            }
        }
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

const API = {
    AuthenticatedAPI,
    PublicAPI,
}

export default API;