import Axios from 'axios';
import { User } from '../types';

export const axiosPublic = Axios.create({
  baseURL: import.meta.env.VITE_LINK,
  headers: { 'Content-Type': 'application/json' },
});

export function getJWTHeader(user: User): Record<string, string> {
  if (!user) throw new Error('User not defined!');

  return { Authorization: `Bearer ${user.token}` };
}
