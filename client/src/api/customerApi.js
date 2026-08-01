import axiosInstance from "./axiosInstance";

export const customerApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/customers");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  },

  search: async (keyword) => {
    const response = await axiosInstance.get(`/customers/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  },

  create: async (customerData) => {
    const response = await axiosInstance.post("/customers", customerData);
    return response.data;
  },

  update: async (id, customerData) => {
    const response = await axiosInstance.put(`/customers/${id}`, customerData);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data;
  },
};
