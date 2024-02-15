import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3500/api/v1'
  : 'https://localhost:3500/api/v1';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance