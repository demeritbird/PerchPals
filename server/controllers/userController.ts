import { Request, Response, NextFunction } from 'express';

import * as factory from './handlerFactory';
import { User } from './../models';
import { UserRequest } from './../utils/types';
import { AppError, catchAsync } from '../utils/helpers';

export const getAllUsers = factory.getAll(User);
export const getUser = factory.getOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);

/**
 * Get user's id from request's param,
 * before sending it to getOne user middleware in handlerFactory
 */
export const getMe = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError('No document found with that ID', 404));
    req.params.id = req.user!._id.toString();

    next();
  }
);
