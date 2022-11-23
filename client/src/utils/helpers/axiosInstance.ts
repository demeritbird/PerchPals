import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_LINK,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_LINK,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
