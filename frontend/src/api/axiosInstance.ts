import axios from "axios";

const baseURL =
  process.env.NODE_ENVIRONMENT === "production"
    ? "/online-store-production-16af.up.railway.app"
    : "/online-store-production-16af.up.railway.app";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
