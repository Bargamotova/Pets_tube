import axios from "axios";

const token = JSON.parse(window.localStorage.getItem('token'))
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = token;

  return config;
});
export default instance;
