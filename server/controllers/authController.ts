import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from './../models';
import { InputUser, UserDocument, Roles, StatusCode } from './../utils/types';
import { AppError, catchAsync, EmailService } from '../utils/helpers';

interface AuthUserRequest extends Request {
  user?: UserDocument;
}
interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}
interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
  sameSite: 'none' | 'lax' | 'strict' | boolean | undefined;
}

/**
 * Sign user's _id payload as a JWT token.
 *
 * @param id          UserDocument's _id
 * @param tokenSecret JWT secret string
 * @param expiresIn   time before this token expires (in seconds) as a string
 * @returns a JWT-signed token as a string
 */
function signToken(id: string, tokenSecret: string, expiresIn: string): string {
  return jwt.sign({ id }, tokenSecret, { expiresIn });
}
/**
 * Verifies JWT token against JWT secret.
 * - If valid, returns decoded string.
 * - Otherwise, return an error.
 *
 * @param token       JWT-signed token
 * @param tokenSecret JWT secret string
 * @returns decoded _id previously signed.
 */
function verifyToken(token: string, tokenSecret: string): JWTPayload {
  // FIXME: should catch error here if validation fails instead of at parent middleware.
  return jwt.verify(token, tokenSecret) as JWTPayload;
}

/**
 * Returns two tokens and user information upon successful Authentication:
 * - Access Token  --> short-lived token for processing auth requests via protect route,
 *                     saved in memory
 * - Refresh Token --> long-lived token used to refresh accesstokens upon new access in client,
 *                     saved in JWT cookie.
 *
 * Then removes password field from response.
 * - By this time, confirmPassword field should have already been removed.
 *
 * @param user       Authenticated User Document from Model
 * @param statusCode Success HTTP code to send to browser
 * @param req        passed on Request from controller.
 * @param res        passed on Response from controller.
 */
function createSendToken(
  user: UserDocument,
  statusCode: StatusCode,
  req: Request,
  res: Response
): void {
  const accessToken: string = signToken(
    user._id.toString(),
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!
  );
  const refreshToken: string = signToken(
    user._id.toString(),
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!
  );

  const jwtExpiryTime: number = +process.env.JWT_COOKIE_EXPIRES_IN!;
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + jwtExpiryTime * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  (user.password as unknown) = undefined;
  res.cookie('jwt', refreshToken, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token: accessToken,
    data: {
      user,
    },
  });
}

type SignupRequest = Omit<InputUser, 'refreshToken'>;
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const inputUser: SignupRequest = {
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
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    const user: UserDocument | null = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password!', 401));
    }

    createSendToken(user, 200, req, res);
  }
);

export const restrictTo = (...roles: Roles[]) => {
  return (req: AuthUserRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      return next(new AppError('You do not have permission to perform this action!', 403));
    }

    next();
  };
};

export const protect = catchAsync(
  async (req: AuthUserRequest, res: Response, next: NextFunction) => {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
      accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    let decoded: JWTPayload;
    try {
      decoded = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET!);
    } catch {
      return next(new AppError('Your access token has expired!', 403));
    }
    const currentUser: UserDocument | null = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('No user with that id was found! Please log in to get access.', 401)
      );
    }

    // TODO: Check if user changed password after the JWT was issued.

    // Make available user information to next middleware
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
);

export const refresh = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let refreshToken;
  if (req.cookies.jwt) refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return next(new AppError('User was not detected! Please log in to get access.', 401));
  }

  let decoded: JWTPayload;
  try {
    decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!);
  } catch {
    return next(new AppError('Your session has expired! Please log in to get access.', 401));
  }
  const currentUser: UserDocument | null = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('No user with that id was found! Please log in to get access.', 401)
    );
  }

  const accessToken: string = signToken(
    currentUser._id.toString(),
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!
  );

  res.status(200).json({
    status: 'success',
    token: accessToken,
    data: {
      user: currentUser,
    },
  });
});

export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');

  res.status(204).json({
    status: 'success',
  });
};
