import { Response, NextFunction } from 'express';
import { Appraisal, Class } from '../models';
import { AppraisalRequest } from '../utils/types';
import * as factory from './handlerFactory';
import { AppError, catchAsync } from '../utils/helpers';

export const getAllAppraisals = factory.getAll(Appraisal);
export const getAppraisal = factory.getOne(Appraisal);
export const updateAppraisal = factory.updateOne(Appraisal);
export const deleteAppraisal = factory.deleteOne(Appraisal);

/**
 * Creates Appraisal and updates the Class referencing it.
 */
export const createAppraisal = catchAsync(
  async (req: AppraisalRequest, res: Response, next: NextFunction) => {
    const { classId } = req.params;

    // create the new appraisal
    const appraisalDoc = await Appraisal.create(req.body);

    // update the class document referencing this
    const updatedClassDoc = await Class.findOneAndUpdate(
      { _id: classId },
      { $push: { appraisals: appraisalDoc._id } },
      { new: true, runValidators: true }
    );

    if (!updatedClassDoc) {
      return next(new AppError('Class not found!', 404));
    }

    res.status(201).json({
      status: 'success',
      data: appraisalDoc,
    });
  }
);

/**
 * Creates a review within an Appraisal.
 */
export const createReview = catchAsync(
  async (req: AppraisalRequest, res: Response, next: NextFunction) => {
    const { classId, appraisalId, questionId } = req.params; // TODO: what to do with classId?
    const { review, reviewer, reviewee } = req.body;

    const appraisalDoc = await Appraisal.findOneAndUpdate(
      {
        _id: appraisalId,
        'questions._id': questionId,
      },
      {
        $push: {
          'questions.$.reviews': {
            review,
            reviewer,
            reviewee,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!appraisalDoc) {
      return next(new AppError('Appraisal not found!', 404));
    }

    res.status(201).json({
      status: 'success',
      data: appraisalDoc,
    });
  }
);
