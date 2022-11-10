import Axios from 'axios';
import { User } from '../types';

export const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_LINK,
});

export function getJWTHeader(user: User): Record<string, string> {
  if (!user) throw new Error('User not defined!');

  return { Authorization: `Bearer ${user.token}` };
}
