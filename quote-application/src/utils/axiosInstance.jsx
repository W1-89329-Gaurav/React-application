import axios from "axios";
import { getToken } from "./auth"; 
import { baseUrl } from "../services/apiconfig";

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
