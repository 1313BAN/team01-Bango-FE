import axios from "axios";
import { setupInterceptors } from "@/api/interceptors";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL, // 공통 베이스 URL
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);

export default api;
