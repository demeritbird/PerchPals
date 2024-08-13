import mongoose, { Schema } from 'mongoose';

import { InputClass, ClassDocument, ClassModel, Roles, AccountStatus } from './../utils/types';
//// Schema ////
const classSchema = new Schema<ClassDocument, ClassModel>(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the class!'],
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
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
 * TODO: find a way to add in photo field while converting them into bufferedString.
 */
classSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'users',
    select: '_id name',
  });
  next();
});

const Class = mongoose.model<ClassDocument, ClassModel>('Class', classSchema);
export default Class;
