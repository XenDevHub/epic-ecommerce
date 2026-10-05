import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ──
api.interceptors.request.use(
  (config) => {
    // Attach customer auth token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("epic_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — clear auth and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("epic_token");
        localStorage.removeItem("epic_customer");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
