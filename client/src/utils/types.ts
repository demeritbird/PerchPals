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
};
export type CurrentUser = User | null;

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  MASTER = 'master',
}
