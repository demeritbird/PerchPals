import { AccountStatus, UserRoles } from '@backend/types';

export enum Validity {
  PASS,
  FAIL,
}

export type Color = 'primary' | 'secondary' | 'grey';
export type ColorWithAccents = Color | 'red' | 'green' | 'white';
export type Size = 'sm' | 'md' | 'lg';
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LOADING = 'loading',
  ERROR = 'error',
}

//// User Related ////
export type User = {
  id: string;
  email: string;
  name: string;
  photo: string; // base64
  role: UserRoles;
  token: string;
  active: AccountStatus;
};
export type CurrentUser = User | null;

//// Request & Responses ////
export interface AuthErrorResponse {
  title: string;
  message: string;
}
