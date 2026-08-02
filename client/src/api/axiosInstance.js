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

// Response Interceptor: Handle Unauthorized Errors without throwing user out during fallback sessions
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect if explicit 401 Unauthorized from backend and not during login attempt
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config?.url?.includes("/auth/login") &&
      !error.config?.url?.includes("/auth/register")
    ) {
      const isAuthPage = window.location.pathname.startsWith("/login") || window.location.pathname.startsWith("/register");
      if (!isAuthPage) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
