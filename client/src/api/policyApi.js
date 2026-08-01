import axiosInstance from "./axiosInstance";

export const policyApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/policies");
    return response.data;
  },

  getActive: async () => {
    const response = await axiosInstance.get("/policies/active");
    return response.data;
  },

  getExpiring: async () => {
    const response = await axiosInstance.get("/policies/expiring");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/policies/${id}`);
    return response.data;
  },

  create: async (policyData) => {
    const response = await axiosInstance.post("/policies", policyData);
    return response.data;
  },

  update: async (id, policyData) => {
    const response = await axiosInstance.put(`/policies/${id}`, policyData);
    return response.data;
  },

  renew: async (id, endDateData) => {
    const response = await axiosInstance.put(`/policies/renew/${id}`, endDateData);
    return response.data;
  },

  cancel: async (id) => {
    const response = await axiosInstance.put(`/policies/cancel/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/policies/${id}`);
    return response.data;
  },
};
