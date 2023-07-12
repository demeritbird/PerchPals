import { AccountStatus, Roles } from '@backend/types';

export enum Validity {
  PASS,
  FAIL,
}

//// User Related ////
export type User = {
  id: string;
  email: string;
  name: string;
  role: Roles;
  token: string;
  active: AccountStatus;
};
export type CurrentUser = User | null;

//// Request & Responses ////
export interface AuthErrorResponse {
  title: string;
  message: string;
}
