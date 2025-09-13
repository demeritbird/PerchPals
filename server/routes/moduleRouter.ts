import express from 'express';
import { authController, moduleController } from '../controllers';
import { UserRoles } from '../utils/types';

const router = express.Router();

//// User-Restricted Information ////
router.use(authController.protect);

//// Admin-Restricted Information ////
router.use(authController.restrictTo(UserRoles.ADMIN));

router.route('/').get(moduleController.getAllModules);
router
  .route('/:id')
  .get(moduleController.getModule)
  .patch(moduleController.updateModule)
  .delete(moduleController.deleteModule);

module.exports = router;
