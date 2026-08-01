import axiosInstance from "./axiosInstance";

export const documentApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/documents");
    return response.data;
  },

  getStatistics: async () => {
    const response = await axiosInstance.get("/documents/dashboard/statistics");
    return response.data;
  },

  getByCustomer: async (customerId) => {
    const response = await axiosInstance.get(`/documents/customer/${customerId}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/documents/${id}`);
    return response.data;
  },

  upload: async (formData) => {
    const response = await axiosInstance.post("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await axiosInstance.put(`/documents/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/documents/${id}`);
    return response.data;
  },
};
