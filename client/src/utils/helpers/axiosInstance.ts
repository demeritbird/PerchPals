import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LINK,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
