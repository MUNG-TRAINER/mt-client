export const API_BASE_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.SERVER_URL
    : "http://localhost:8080/api";
