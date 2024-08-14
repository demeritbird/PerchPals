// import mongoose from 'mongoose';
import { Class, User } from '../models';
import { AppError, catchAsync } from '../utils/helpers';
import { NextFunction, Response } from 'express';
import { ClassRequest } from '../utils/types';
import * as factory from './handlerFactory';

export const getAllClasses = factory.getAll(Class);
export const getClass = factory.getOne(Class);
export const createClass = factory.createOne(Class);
export const updateClass = factory.updateOne(Class);
export const deleteClass = factory.deleteOne(Class);

/**
 * Adds Class to User's list of classes, then adds User under Class' list of Groups.
 * NOTE: User and Class are linked together via two-way referencing.
 */
export const assignClassToUser = catchAsync(
  async (req: ClassRequest, res: Response, next: NextFunction): Promise<void> => {
    const { userId, classId, groupId } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { _id: userId, classes: { $ne: classId } },
      { $push: { classes: classId } },
      { new: true, runValidators: true }
    );

    const updateClass = await Class.findOneAndUpdate(
      {
        _id: classId,
        'groups._id': groupId,
      },
      {
        $push: { 'groups.$.users': userId },
      },
      { new: true, runValidators: true }
    );

    if (!updateUser || !updateClass) {
      return next(new AppError('User or Class not found or already assigned!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updateUser,
        class: updateClass,
      },
    });
  }
);

/**
 * Creates a group in existing class which holds users that are assigned.
 */
export const createGroupInClass = catchAsync(
  async (req: ClassRequest, res: Response, next: NextFunction): Promise<void> => {
    const { classId, group } = req.body;

    const updateClass = await Class.findOneAndUpdate(
      { _id: classId },
      { $push: { groups: { name: group.groupName } } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        class: updateClass,
      },
    });
  }
);
