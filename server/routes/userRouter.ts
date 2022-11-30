import express from 'express';
import { authController, userController } from '../controllers';

const router = express.Router();

//// User Authentication ////
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/refresh', authController.refresh);
router.get('/test', authController.protect, authController.testProtect);
router.post('/logout', authController.logout);

//// User Information ////
// TODO: Restrict to Admin-Only operations
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
