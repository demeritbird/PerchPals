import express from 'express';
import { authController, userController } from '../controllers';
import { Roles } from '../utils/types';

const router = express.Router();

//// User Authentication ////
router.post('/signup', authController.signup, authController.sendActivate);
router.post('/activate', authController.confirmActivate);
router.post('/login', authController.login);

router.get('/refresh', authController.refresh);
router.post('/logout', authController.logout);

router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//// User-Restricted Information ////
router.use(authController.protect);

router.get('/test', authController.testProtect); // TODO: remove me
router.get('/email', authController.testEmail);

// TODO: Add 'getMe' Route

//// Admin-Restricted Information ////
router.use(authController.restrictTo(Roles.ADMIN, Roles.MASTER));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
