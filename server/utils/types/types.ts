import { Types, Model, Document } from 'mongoose';
import { Request } from 'express';
import { AccountStatus, Roles } from './shared-types';

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
  photo: string;
  role: Roles;
  password: string;
  passwordConfirm: string;
  active: AccountStatus;

  passwordResetToken?: string;
  passwordResetExpires?: Date;

  activationToken?: string;
  classes: Types.ObjectId[];
}
// User Document & Instance Methods
export interface UserDocument extends InputUser, Document {
  _id: Types.ObjectId;
  correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
  createActivationToken: () => string;
  createPasswordResetToken: () => string;
}
// User Static Methods
export interface UserModel extends Model<UserDocument> {
  //staticMethod: (variable: string) => Promise<UserDocument>;
}

export interface UserRequest extends Request {
  user?: UserDocument;
}

//// Class Related ////
export interface InputClass {
  name: string;
  users: Types.ObjectId[];
}
export interface ClassDocument extends InputClass, Document {
  _id: Types.ObjectId;
}
export interface ClassModel extends Model<ClassDocument> {}

export interface ClassRequest extends Request {
  class?: ClassDocument;
}
