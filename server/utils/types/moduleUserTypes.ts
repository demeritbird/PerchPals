import { Model, Types } from 'mongoose';

export enum ModuleUserStatus {
  MEMBER = 'member',
  MODERATOR = 'moderator',
}

export interface InputModuleUser {
  user: Types.ObjectId;
  module: Types.ObjectId;
  status: ModuleUserStatus;
}

export interface ModuleUserDocument extends InputModuleUser, Document {
  _id: Types.ObjectId;
}

export interface ModuleUserModel extends Model<ModuleUserDocument> {
  //staticMethod: (variable: string) => Promise<ModuleUserDocument>;
}
