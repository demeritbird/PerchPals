import * as authController from './authController';
import * as userController from './userController';
import * as moduleController from './moduleController';
import * as moduleUserController from './moduleUserController';
import * as invitationController from './invitationController';
const globalErrorHandler = require('./errorController');

export {
  authController,
  userController,
  moduleController,
  moduleUserController,
  invitationController,
  globalErrorHandler,
};
