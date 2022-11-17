import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/helpers';

interface CastError extends AppError {
  path: string;
  value: string;
}
const handleCastErrorDB = (err: CastError): AppError => {
  const message: string = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

interface DuplicateError extends AppError {
  code: number;
  keyPattern: {
    [key: string]: number;
  };
}
const handleDuplicateFieldsDB = (err: DuplicateError): AppError => {
  const errors: string[] = Object.keys(err.keyPattern).map((el) => {
    return el;
  });
  const message: string = `Duplicate Field(s) Found: ${errors
    .map((error, idx) => {
      return `${idx + 1}. ${error}`;
    })
    .join(' ')}`;
  return new AppError(message, 400);
};

interface ValidationError extends AppError {
  errors: symbol;
}
const handleValidationErrorDB = (err: ValidationError): AppError => {
  const errors: string[] = Object.values(err.errors).map((el) => {
    return el.message;
  });
  const message: string = `Invalid Input Data! Fields: ${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError => {
  const message: string = `Invalid Token. Please log in again!`;
  return new AppError(message, 401);
};

const handleJWTExpiredTokenError = (): AppError => {
  const message: string = `Token has expired. Please log in again!`;
  return new AppError(message, 401);
};

type JSONEndpoint = Response<string, Record<string, string>>;

function sendErrorDev(err: AppError, req: Request, res: Response): JSONEndpoint {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  console.error('ERROR', err);
  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    message: err.message,
  });
}

function sendErrorProd(err: AppError, req: Request, res: Response): JSONEndpoint {
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).json({
      title: 'Something went wrong!',
      message: err.message,
    });
  }

  console.error('ERROR', err);
  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    message: 'Please try again later.',
  });
}

const globalErrorHandler: ErrorRequestHandler = (
  err: CastError & ValidationError & DuplicateError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name, message: err.message };

    if (error.name === 'CastError') (error as AppError) = handleCastErrorDB(error);
    if (error.code === 11000) (error as AppError) = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') (error as AppError) = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') (error as AppError) = handleJWTError();
    if (error.name === 'TokenExpiredError') (error as AppError) = handleJWTExpiredTokenError();

    sendErrorProd(error, req, res);
  }
};

module.exports = globalErrorHandler;
