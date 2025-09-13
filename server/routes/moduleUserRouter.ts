import express from 'express';
import { authController, moduleUserController } from '../controllers';
import { UserRoles } from '../utils/types';

const router = express.Router();

//// User-Restricted Information ////
router.use(authController.protect);

//// Admin-Restricted Information ////
router.use(authController.restrictTo(UserRoles.ADMIN));

router.route('/').get(moduleUserController.getAllModuleUsers);
router
  .route('/:id')
  .get(moduleUserController.getModuleUser)
  .patch(moduleUserController.updateModuleUser)
  .delete(moduleUserController.deleteModuleUser);

module.exports = router;
