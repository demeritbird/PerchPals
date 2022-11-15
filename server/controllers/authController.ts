import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from './../models';
import { InputUser, UserDocument, Roles, StatusCode } from './../utils/types';
import { AppError, catchAsync } from '../utils/helpers';

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
  user: UserDocument,
  statusCode: StatusCode,
  req: Request,
  res: Response
): void {
  const token: string = signToken(user._id.toString());
  const jwtExpiryTime: number = +process.env.JWT_COOKIE_EXPIRES_IN!;

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + jwtExpiryTime * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  (user.password as unknown) = undefined;
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
    const inputUser: InputUser = {
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: Roles.USER,
    };
    const newUser: UserDocument = await User.create(inputUser);

    createSendToken(newUser, 201, req, res);
  }
);

interface LoginRequest {
  email: string;
  password: string;
}
exports.login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password }: LoginRequest = req.body;

    // 1) Check if email and password field exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user: UserDocument | null = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password!', 401));
    }

    createSendToken(user, 200, req, res);
  }
);
