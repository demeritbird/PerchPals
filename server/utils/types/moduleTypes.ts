import { Model, Types } from 'mongoose';

export interface InputModule {
  name: string;
  description: string;
  photo: string;
  moduleUsers: Types.ObjectId[];
  invitations: Types.ObjectId[];
}

// Module Document & Instance Methods
export interface ModuleDocument extends InputModule, Document {
  _id: Types.ObjectId;
}
// Module Static Methods
export interface ModuleModel extends Model<ModuleDocument> {
  // staticMethod: (variable: string) => Promise<ModuleDocument>;
}
