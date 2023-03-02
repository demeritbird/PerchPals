import { Types, Model } from 'mongoose';
import { Request } from "express"

export type StatusCode =
  // Success Responses
  | 200 // OK
  | 201 // CREATED
  | 204 // NO_CONTENT

  // Error Responses
  | 400 // BAD_REQUEST
  | 401 // UNAUTHORISED
  | 403 // FORBIDDEN
  | 404 // NOT_FOUND
  | 500; // INTERNAL_SERVER_ERROR

//// User Related ////
export interface InputUser {
  name: string;
  email: string;
  photo?: string;
  role: Roles;
  password: string;
  passwordConfirm: string;
}
// User Document & Instance Methods
export interface UserDocument extends InputUser, Document {
  _id: Types.ObjectId;
  correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
}
// User Static Methods
export interface UserModel extends Model<UserDocument> {
  //staticMethod: (variable: string) => Promise<UserDocument>;
}

export interface UserRequest extends Request {
  user?: UserDocument;
}

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  MASTER = 'master',
}
