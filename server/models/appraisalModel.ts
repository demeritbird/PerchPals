import mongoose, { Schema } from 'mongoose';
import { AppraisalDocument, AppraisalModel } from '../utils/types';

//// Schema ////
const appraisalSchema = new Schema<AppraisalDocument, AppraisalModel>(
  {
    title: {
      type: String,
      required: [true, 'Please provide the name of the appraisal!'],
    },
    description: {
      type: String,
      required: [true, 'Please provide the description of the appraisal!'],
    },
    questions: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        name: {
          type: String,
          required: [true, 'Please provide the name of the question!'],
        },
        reviews: [
          {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              auto: true,
            },
            review: {
              type: String,
              required: [true, 'Please provide a review!'],
            },
            reviewer: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            reviewee: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          },
        ],
      },
    ],
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

const Appraisal = mongoose.model<AppraisalDocument, AppraisalModel>(
  'Appraisal',
  appraisalSchema
);
export default Appraisal;
