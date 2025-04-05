import Axios from "axios";
import API_URL from ".";

const axios = Axios.create({
    baseURL: API_URL.local,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        throw error;
    }
);

export default axios;