import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto, { createHmac } from 'crypto';

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

function signToken(id: string, tokenSecret: string, expiresIn: string): string {
  return jwt.sign({ id }, tokenSecret, { expiresIn });
}
function verifyToken(token: string, tokenSecret: string): JWTPayload {
  return jwt.verify(token, tokenSecret) as JWTPayload;
}

/**
 * Creates 2 tokens upon successful Authentication:
 * - Access Token --> short-lived token for processing user requests via protect route.
 * - Refresh Token --> long-lived token used to refresh accesstokens upon new access in client.
 *
 * Then removes password field from response.
 * - By this time, confirmPassword field should have already been remove.
 *
 * @param user Authenticated User Document from Model
 * @param statusCode Success HTTP code to send to browser
 * @param req passed on Request from controller.
 * @param res passed on Response from controller.
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
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN! // 15s
  );
  const refreshToken: string = signToken(
    user._id.toString(),
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN! // 1d
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
  async (req: AuthUserRequest, res: Response, next: NextFunction): Promise<void> => {
    const inputUser: SignupRequest = {
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: Roles.USER,
      active: true,
    };
    const newUser: UserDocument = await User.create(inputUser);

    // pass user information into sendActivate route
    req.user = newUser;
    res.locals.user = newUser;
    next();
  }
);

export const sendActivate = catchAsync(
  async (req: AuthUserRequest, res: Response, next: NextFunction): Promise<void> => {
    // User is either from previous signup request or resent via a req.body
    const user: UserDocument | null =
      req.user ?? (await User.findOne({ email: req.body.email }));
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const activationToken: string = user.createActivationToken();
    await user.save({ validateBeforeSave: false });

    try {
      await new EmailService(
        user,
        `${req.protocol}://${req.get('host')}/api/v1/newUsers/activate/${user._id}`
      ).sendWelcomeEmail(activationToken);

      res.status(204).json({
        status: 'success',
      });
    } catch (err) {
      // Cancel request entirely if error
      user.activationToken = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
  }
);

export const confirmActivate = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const hashedToken: string = crypto
      .createHash('sha256')
      .update(req.body.token)
      .digest('hex');

    const user: UserDocument | null = await User.findOne({
      activationToken: hashedToken,
    });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    user.isActivated = true;
    user.activationToken = undefined;
    await user.save({ validateBeforeSave: false });
    createSendToken(user, 200, req, res);
  }
);

interface LoginRequest {
  email: string;
  password: string;
}
export const login = catchAsync(
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
    // Get JSON Web Token and check if it's there.
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
      accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 1) Verification of Access Token
    let decoded: JWTPayload;
    try {
      decoded = verifyToken(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET!);
    } catch {
      return next(new AppError('Your access token has expired!', 403));
    }

    // 2) Check if user still exists
    const currentUser: UserDocument | null = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('No user with that id was found! Please log in to get access.', 401)
      );
    }

    // TODO:
    // Check if user changed password after the JWT was issued.

    // 3) Grant Access to Protected Route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
);

// TODO: remove me
export const testProtect = (req: Request, res: Response) => {
  res.status(200).json({
    foo: 'bar',
  });
};
export const testEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: UserDocument | null = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }
    await new EmailService(
      user,
      `${req.protocol}://${req.get('host')}/api/v1/users/me`
    ).sendWelcomeEmail('test');

    res.status(204).json({
      status: 'success',
    });
  }
);

export const refresh = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let refreshToken;
  if (req.cookies.jwt) refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return next(new AppError('User was not detected! Please log in to get access.', 401));
  }

  // 1) Verification of Refresh Token

  let decoded: JWTPayload;
  try {
    decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!);
  } catch {
    return next(new AppError('Your session has expired! Please log in to get access.', 401));
  }

  // 2) Check if user still exists
  const currentUser: UserDocument | null = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('No user with that id was found! Please log in to get access.', 401)
    );
  }

  // 3) Pass in new Access Token to useContext
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

export const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: UserDocument | null = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      // Hashed token sent as a link to user
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/resetPassword/${resetToken}`;
      await new EmailService(user, resetURL).sendPasswordResetEmail();

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      // Cancel request entirely if error
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
  }
);

/**
 * Requires user to go through /forgotpassword route first before being able to use this.
 * // TODO: Is there any way to undefine unwanted fields if request is ignored?
 */
export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // req.params.token is a 64 character long random string.
    // param from email sent from /forgotpassword route inside a link,
    const hashedToken: string = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user: UserDocument | null = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }, // fail request if token is expired
    });
    if (!user) {
      return next(new AppError('Password Reset Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    // We will need to remove unnecessary fields as well.
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(204).json({
      status: 'success',
    });
  }
);
