import axios from "axios";

// Environment variable support for both VITE_API_BASE_URL and VITE_API_URL with live Render fallback
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "https://insurepulse-api.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized Errors gracefully without kicking user out
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log authorization errors silently without forcing hard page reloads
    if (error.response && error.response.status === 401) {
      console.warn("API 401 Unauthorized Response - maintaining active UI session:", error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
