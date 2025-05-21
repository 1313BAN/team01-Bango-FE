import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // 공통 베이스 URL
  withCredentials: true, // 쿠키 기반 인증 지원
});

export default apiClient;
