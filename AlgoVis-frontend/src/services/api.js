import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    // ✅ ONLY logout if token is actually invalid
    if (status === 403 || status === 401) {
      const message = err.response?.data;

      // check if it's really auth-related
      if (
        message?.includes?.("JWT") ||
        message?.includes?.("expired") ||
        message?.includes?.("Unauthorized")
      ) {
        localStorage.clear();
        alert("Session expired. Please login again.");
        window.location.reload();
      }
    }

    return Promise.reject(err);
  },
);
export default api;
