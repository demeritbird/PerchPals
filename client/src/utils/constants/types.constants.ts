export enum Validity {
  PASS,
  FAIL,
}

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  MASTER = 'master',
}

export type User = {
  email: string;
  name: string;
  role: Array<Roles>;
  token: string;
} | null;
