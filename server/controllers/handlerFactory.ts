import { Request, Response, NextFunction } from 'express';
import { PopulatedDoc } from 'mongoose';
import { ApiFeatures, AppError, catchAsync, bufferConvertToString } from '../utils/helpers';
import { UserModel, ClassModel } from '../utils/types';

/**
 * @file Performs general CRUD operations for any documents
 */

type AllModels = UserModel | ClassModel;
interface HandlerConfig {
  popOptions?: PopulatedDoc<any>;
  photoConvert?: boolean;
}

export const createOne = (Model: AllModels) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await (Model as any).create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

// NOTE: change to 'any' if 'PopulatedDoc<any>' does not work,
// Also, try to remove the explicit 'any' in popOptions typing.
export const getOne = (Model: AllModels, config: HandlerConfig = {}) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = (Model as any).findById(req.params.id);
    if (config.popOptions) query = query.populate({ path: config.popOptions });

    const doc = await query;
    if (!doc) return next(new AppError('No document found with that ID', 404));

    // Convert User's photo filepath into buffer before sending
    if (config.photoConvert) {
      doc.photo = bufferConvertToString(doc.photo);
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

interface QueryRequest extends Request {
  query: Record<string, string>;
}
export const getAll = (Model: AllModels, config: HandlerConfig = {}) =>
  catchAsync(async (req: QueryRequest, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new ApiFeatures((Model as any).find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    if (!doc) return next(new AppError('No document found with that ID', 404));

    // Convert Users' photo filepath into buffer before sending
    if (config.photoConvert) {
      doc.forEach((cur: any) => {
        cur.photo = bufferConvertToString(cur.photo);
      });
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });

export const updateOne = (Model: AllModels) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await (Model as any).findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const deleteOne = (Model: AllModels) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
