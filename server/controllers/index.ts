import * as authController from './authController';
import * as userController from './userController';
import * as classController from './classController';
import * as appraisalController from './appraisalController';
const globalErrorHandler = require('./errorController');

export {
  authController,
  userController,
  classController,
  appraisalController,
  globalErrorHandler,
};
