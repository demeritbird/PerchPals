import { StatusCode } from './../constants/types.contants';

// TODO: Documentation

class AppError extends Error {
  status: string;
  isOperational: string;

  constructor(public message: string, protected statusCode: StatusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = 'true';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
