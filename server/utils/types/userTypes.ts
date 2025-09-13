import { Types, Model, Document } from 'mongoose';
import { Request } from 'express';
import { AccountStatus, UserRoles } from './sharedTypes';

export interface InputUser {
  name: string;
  email: string;
  photo: string;
  role: UserRoles;
  password: string;
  passwordConfirm: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active: AccountStatus;
  activationToken?: string;
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
