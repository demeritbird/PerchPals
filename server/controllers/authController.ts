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

  (user.password as unknown) = undefined;
  res.cookie('jwt', token, cookieOptions);
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

interface AuthUserRequest extends Request {
  user: UserDocument;
}
interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}
exports.protect = catchAsync(
  async (req: AuthUserRequest, res: Response, next: NextFunction) => {
    // Get JSON Web Token and check if it's there.
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // Verification of token
    const decoded: JWTPayload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    // Check if user still exists
    const freshUser: UserDocument | null = await User.findById(decoded.id);
    if (!freshUser) {
      return next(new AppError('Your token has expired! Please log in to get access.', 401));
    }

    // TODO:
    // Check if user changed password after the JWT was issued.

    // Grant Access to Protected Route
    req.user = freshUser;
    res.locals.user = freshUser;
    next();
  }
);

// TODO: remove me
exports.testProtect = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    foo: 'bar',
  });
};
