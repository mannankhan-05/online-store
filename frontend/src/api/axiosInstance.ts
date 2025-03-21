import axios from "axios";

const baseURL =
  process.env.NODE_ENVIRONMENT === "production"
    ? "https://online-store-production-16af.up.railway.app"
    : "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
