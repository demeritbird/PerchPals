import mongoose, { Schema } from 'mongoose';
import { ModuleUserDocument, ModuleUserModel, ModuleUserStatus } from '../utils/types';
import { USER_FIELDS_TO_DESELECT } from '../utils/constants';

const moduleUserSchema = new Schema<ModuleUserDocument, ModuleUserModel>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    status: {
      type: String,
      enum: [ModuleUserStatus.MEMBER, ModuleUserStatus.MODERATOR],
      default: ModuleUserStatus.MEMBER,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

moduleUserSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: USER_FIELDS_TO_DESELECT,
  });
  next();
});

const ModuleUser = mongoose.model<ModuleUserDocument, ModuleUserModel>(
  'ModuleUser',
  moduleUserSchema
);
export default ModuleUser;
