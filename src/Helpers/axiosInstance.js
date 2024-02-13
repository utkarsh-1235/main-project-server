import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3500'
  : 'https://localhost:3500';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance