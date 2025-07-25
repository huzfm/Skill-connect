import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create reusable axios instance
const api = axios.create({
  baseURL: API_URL, // backend API base
  headers: {
    "Content-Type": "application/json", // required for JSON payloads
  },
  withCredentials: true, // include cookies in cross-origin requests
});

export default api;
