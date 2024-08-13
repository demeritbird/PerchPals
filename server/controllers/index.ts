import * as authController from './authController';
import * as userController from './userController';
import * as classController from './classController';
const globalErrorHandler = require('./errorController');
export { authController, userController, classController, globalErrorHandler };
