import axiosInstance from "./axiosInstance";

export const claimApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/claims");
    return response.data;
  },

  getPending: async () => {
    const response = await axiosInstance.get("/claims/pending");
    return response.data;
  },

  getByPolicy: async (policyId) => {
    const response = await axiosInstance.get(`/claims/policy/${policyId}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await axiosInstance.get("/claims/dashboard/stats");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/claims/${id}`);
    return response.data;
  },

  create: async (claimData) => {
    const response = await axiosInstance.post("/claims", claimData);
    return response.data;
  },

  update: async (id, claimData) => {
    const response = await axiosInstance.put(`/claims/${id}`, claimData);
    return response.data;
  },

  approve: async (id) => {
    const response = await axiosInstance.put(`/claims/approve/${id}`);
    return response.data;
  },

  reject: async (id) => {
    const response = await axiosInstance.put(`/claims/reject/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/claims/${id}`);
    return response.data;
  },
};
