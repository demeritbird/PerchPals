import { StatusCode } from '../types';

// TODO: Documentation

class AppError extends Error {
  status: string;
  isOperational: string;

  constructor(public message: string, public statusCode: StatusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = 'true';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
