import API from "./axios";

const ActivityAPI = {
  activity_detail: async (activity_id: number) => {
    return API.PublicAPI.request({
      url: "/activities/" + activity_id,
      method: "GET",
    });
  },

  enroll: async (activity_id: number) => {
    return API.AuthenticatedAPI.request({
      url: "/activities/" + activity_id + "/enroll",
      method: "POST",
    });
  },

  getStatus: async (activity_id: number) => {
    return API.PublicAPI.request({
      url: "/activities/" + activity_id + "/get-status",
      method: "GET",
    });
  },

  // New: Get activities with optional filters
  getActivities: async (params?: {
    search_term?: string;
    activity_type?: string;
    start_date?: string;
    end_date?: string;
    per_page?: number;
  }) => {
    return API.PublicAPI.request({
      url: "/activities",
      method: "GET",
      params,
    });
  },
};

export default ActivityAPI;
