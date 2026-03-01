import { AccountStatus, UserRoles } from '@backend/types';

export type ServerStatusType = 'success' | 'error' | 'fail';
export enum Validity {
  PASS,
  FAIL,
}

export type Color = 'primary' | 'secondary' | 'grey';
export type ColorWithAccents = Color | 'red' | 'green' | 'white' | 'grey-light';
export type Size = 'sm' | 'md' | 'lg';
export type ExtendedSize = Size | 'xs' | 'xl';
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
