// import mongoose from 'mongoose';
import { Class, User } from '../models';
import { AppError, catchAsync, EmailService } from '../utils/helpers';
import { NextFunction, Response } from 'express';
import { ClassRequest, UserClassStatus } from '../utils/types';
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
export const assignUsersToClass = catchAsync(
  async (req: ClassRequest, res: Response, next: NextFunction): Promise<void> => {
    // usersToAdd -> { userId: string; groupId: string }
    const { classId } = req.params;
    const { usersInfo } = req.body;

    // check if theres any users to add in first.
    if (usersInfo.length === 0) {
      throw new AppError('There are users to add!', 404);
    }

    // for each user, we should try to assign them into the class.
    const promises: Promise<unknown>[] = usersInfo.map(
      async (cur: { userId: string; groupId: string }) => {
        const updateUser = await User.findOneAndUpdate(
          { _id: cur.userId, classes: { $ne: classId } },
          { $push: { classes: classId } },
          { new: true, runValidators: true }
        );
        const updateClass = await Class.findOneAndUpdate(
          {
            _id: classId,
            'groups._id': cur.groupId,
          },
          {
            $push: {
              'groups.$.users': {
                user: cur.userId,
                status: UserClassStatus.PENDING, // User will need to accept their invitation to set this to ACTIVE status
              },
            },
          },
          { new: true, runValidators: true }
        );

        // user and class cannot be found which would indicate they are already in class.
        if (!updateUser || !updateClass) {
          throw new AppError('User or Class not found or already assigned!', 404);
        }

        try {
          // send email to user about new user invitation
          await new EmailService(updateUser, ``).sendClassInvitationEmail();
        } catch (err) {
          // handle individual errors for each user
          throw new AppError('There was an error sending the email. Try again later!', 500);
        }
      }
    );

    await Promise.all(promises);

    res.status(204).json();
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

/**
 * User accepts the Class invitation,
 * so change the user information in the class records.
 */
export const userAcceptClassInvitation = catchAsync(
  async (req: ClassRequest, res: Response, next: NextFunction): Promise<void> => {
    const { classId, userId } = req.params;
    const { groupId } = req.body;

    // find class
    const classDoc = await Class.findOne({
      _id: classId,
      'groups._id': groupId,
      'groups.users.user': userId,
    });

    if (!classDoc) {
      return next(new AppError('Class, group, or user not found!', 404));
    }

    // find group and update user status
    const result = await Class.updateOne(
      {
        _id: classId,
        'groups._id': groupId,
        'groups.users.user': userId,
      },
      {
        $set: { 'groups.$[group].users.$[user].status': UserClassStatus.ACTIVE },
      },
      {
        arrayFilters: [{ 'group._id': groupId }, { 'user.user': userId }],
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return next(new AppError('Unable to update user status in class!', 500));
    }

    res.status(204).json();
  }
);
