import { Model, Types } from 'mongoose';

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export interface InputInvitation {
  user: Types.ObjectId;
  status: InvitationStatus;
  module: Types.ObjectId;
}

// Invitation Document & Instance Methods
export interface InvitationDocument extends InputInvitation, Document {
  _id: Types.ObjectId;
}
// Invitation Static Methods
export interface InvitationModel extends Model<InvitationDocument> {
  // staticMethod: (variable: string) => Promise<ModuleDocument>;
}
