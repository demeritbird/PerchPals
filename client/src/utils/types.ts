import { AccountStatus, UserRoles } from '@backend/types';

export enum Validity {
  PASS,
  FAIL,
}

//// User Related ////
export type User = {
  id: string;
  email: string;
  name: string;
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
