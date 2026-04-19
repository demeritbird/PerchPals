import { AccountStatus, UserRoles } from '@backend/types';

export type ServerReturnStatus = 'success' | 'error' | 'fail';
export enum Validity {
  PASS,
  FAIL,
}

export type MainColor = 'primary' | 'secondary';
export type AccentColor = 'red' | 'red-light' | 'green' | 'green-light';
export type GreyscaleColor = 'white' | 'grey' | 'grey-light';
export type AllColors = MainColor | AccentColor | GreyscaleColor;
export type Size = 'sm' | 'md' | 'lg';
export type ExtendedSize = Size | 'xs' | 'xl';
export enum SuccessStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}
export enum InputStatus {
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
