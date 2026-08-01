import axiosInstance from "./axiosInstance";

export const paymentApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/payments");
    return response.data;
  },

  getPaid: async () => {
    const response = await axiosInstance.get("/payments/paid");
    return response.data;
  },

  getPending: async () => {
    const response = await axiosInstance.get("/payments/pending");
    return response.data;
  },

  getOverdue: async () => {
    const response = await axiosInstance.get("/payments/overdue");
    return response.data;
  },

  getHistoryByPolicy: async (policyId) => {
    const response = await axiosInstance.get(`/payments/history/${policyId}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await axiosInstance.get("/payments/dashboard");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/payments/${id}`);
    return response.data;
  },

  create: async (paymentData) => {
    const response = await axiosInstance.post("/payments", paymentData);
    return response.data;
  },

  update: async (id, paymentData) => {
    const response = await axiosInstance.put(`/payments/${id}`, paymentData);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/payments/${id}`);
    return response.data;
  },
};
