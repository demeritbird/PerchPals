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

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  MASTER = 'master',
}

export enum AccountStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

//// Request & Responses ////
export interface AuthErrorResponse {
  title: string;
  message: string;
}
