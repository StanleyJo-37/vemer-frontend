import Axios from "axios";
import API_URL from ".";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const PublicAPI = Axios.create({
  baseURL: API_URL.local + "/public",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const AuthenticatedAPI = Axios.create({
  baseURL: API_URL.local + "/auth",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const RegularAPI = Axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

PublicAPI.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    throw error;
  }
);

AuthenticatedAPI.interceptors.request.use(
  (config) => {
    // Manually read the XSRF-TOKEN from cookies
    const xsrfToken = getCookie('XSRF-TOKEN');

    if (xsrfToken) {
      // If the token exists, manually set the X-XSRF-TOKEN header.
      // Axios would do this automatically, but only if the SAME instance
      // was used for the handshake. We are doing it manually here.
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
AuthenticatedAPI.interceptors.request.use(
  async (request) => {
    return request;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

const API = {
  AuthenticatedAPI,
  PublicAPI,
  RegularAPI
};

export default API;
