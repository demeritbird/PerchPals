import express from 'express';
import { authController, userController } from '../controllers';
import { UserRoles } from '../utils/types';

const router = express.Router();

//// User Authentication ////
router.post('/signup', authController.signup, authController.sendActivate);
router.post('/resendActivate', authController.sendActivate);
router.patch('/confirmActivate/:token', authController.confirmActivate);
router.post('/login', authController.login);

router.get('/refresh', authController.refresh);
router.post('/logout', authController.logout);

router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//// User-Restricted Information ////
router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.post(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

//// Admin-Restricted Information ////
router.use(authController.restrictTo(UserRoles.ADMIN));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
