import axiosInstance from "./axiosInstance";

export const reportApi = {
  getDashboardSummary: async () => {
    const response = await axiosInstance.get("/reports/dashboard");
    return response.data;
  },

  getCustomerReport: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`/reports/customers${query ? `?${query}` : ""}`);
    return response.data;
  },

  getPolicyReport: async () => {
    const response = await axiosInstance.get("/reports/policies");
    return response.data;
  },

  getRevenueReport: async () => {
    const response = await axiosInstance.get("/reports/revenue");
    return response.data;
  },

  getBusinessInsights: async () => {
    const response = await axiosInstance.get("/reports/business-insights");
    return response.data;
  },

  getMonthlyRevenue: async () => {
    const response = await axiosInstance.get("/reports/revenue/monthly");
    return response.data;
  },

  getRecentActivities: async () => {
    const response = await axiosInstance.get("/reports/recent");
    return response.data;
  },
};
