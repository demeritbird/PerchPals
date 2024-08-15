import mongoose, { Schema } from 'mongoose';

import {
  InputClass,
  ClassDocument,
  ClassModel,
  Roles,
  AccountStatus,
  UserClassStatus,
} from './../utils/types';
//// Schema ////
const classSchema = new Schema<ClassDocument, ClassModel>(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the class!'],
    },
    groups: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        name: {
          type: String,
          required: [true, 'Please provide the name of the group!'],
        },
        users: [
          {
            _id: false,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            status: {
              type: String,
              enum: [UserClassStatus.PENDING, UserClassStatus.ACTIVE],
              default: UserClassStatus.PENDING,
            },
          },
        ],
      },
    ],
    appraisals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appraisal' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//// Middlewares ////
/**
 * Populates user information in Class list of users.
 */
classSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'groups.$.users',
    select: '_id name photo',
  });
  next();
});

const Class = mongoose.model<ClassDocument, ClassModel>('Class', classSchema);
export default Class;
