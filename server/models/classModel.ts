import mongoose, { Schema } from 'mongoose';

import { InputClass, ClassDocument, ClassModel, Roles, AccountStatus } from './../utils/types';

//// Schema ////
const classSchema = new Schema<ClassDocument, ClassModel>({
  name: {
    type: String,
    required: [true, 'Please provide the name of the class!'],
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Class = mongoose.model<ClassDocument, ClassModel>('Class', classSchema);
export default Class;
