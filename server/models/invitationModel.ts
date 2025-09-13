import mongoose, { Schema } from 'mongoose';
import { InvitationDocument, InvitationModel, InvitationStatus } from '../utils/types';
import { USER_FIELDS_TO_DESELECT } from '../utils/constants';

const invitationSchema = new Schema<InvitationDocument, InvitationModel>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    status: {
      type: String,
      enum: [InvitationStatus.PENDING, InvitationStatus.ACCEPTED, InvitationStatus.DECLINED],
      default: InvitationStatus.PENDING,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

invitationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: USER_FIELDS_TO_DESELECT,
  });
  next();
});

const Invitation = mongoose.model<InvitationDocument, InvitationModel>(
  'Invitation',
  invitationSchema
);
export default Invitation;
