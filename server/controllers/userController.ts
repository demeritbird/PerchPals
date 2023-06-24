import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';

import * as factory from './handlerFactory';
import { User } from './../models';
import { UserRequest } from './../utils/types';
import { AppError, catchAsync } from '../utils/helpers';

export const getAllUsers = factory.getAll(User, { photoConvert: true });
export const getUser = factory.getOne(User, { photoConvert: true });
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

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: Express.Multer.File, callback: Function) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('photo');

const filterObj = (obj: Record<string, any>, ...allowedFields: string[]) => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const resizeUserPhoto = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user?.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${__dirname}/../public/img/${req.file.filename}`);

    next();
  }
);

export const updateMe = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    // NOTE: If email is duplicate key, return error 500 in development, but 400 in production.
    // TODO: Tell client when it is duplicate key error, or when it is not.
    const updatedUser = await User.findByIdAndUpdate(req.user!.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
);
