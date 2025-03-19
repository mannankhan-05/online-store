const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://online-store-production-16af.up.railway.app"
    : "http://localhost:4000";

export default baseURL;
