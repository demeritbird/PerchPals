import mongoose, { Schema } from 'mongoose';
import { ModuleDocument, ModuleModel } from '../utils/types';
import { DEFAULT_MODULE_IMAGE } from '../utils/constants';
import ModuleUser from './moduleUserModel';

const moduleSchema = new Schema<ModuleDocument, ModuleModel>(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the module!'],
    },
    description: String,
    photo: {
      type: String,
      default: DEFAULT_MODULE_IMAGE,
    },
    moduleUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ModuleUser',
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Module = mongoose.model<ModuleDocument, ModuleModel>('Module', moduleSchema);
export default Module;
