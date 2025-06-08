import Axios from "axios";
import API_URL from ".";

const PublicAPI = Axios.create({
  baseURL: API_URL.local + "/public",
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

PublicAPI.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    throw error;
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
};

export default API;
