import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { CreatedUser, StatusCode } from './../utils/constants/types.contants';

const User = require('./../models/userModel');
const catchAsync = require('./../utils/helpers/catchAsync.helpers');

interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
}

function signToken(id: string): string {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
function createSendToken(
  user: CreatedUser,
  statusCode: StatusCode,
  req: Request,
  res: Response
): void {
  const token: string = signToken(user._id);
  const jwtExpiryTime: number = +process.env.JWT_COOKIE_EXPIRES_IN!;

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + jwtExpiryTime * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
}

exports.signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newUser: CreatedUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
      });

      createSendToken(newUser, 201, req, res);
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  }
);
