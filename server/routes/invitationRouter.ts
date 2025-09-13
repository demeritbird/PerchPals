import express from 'express';
import { authController, invitationController } from '../controllers';
import { UserRoles } from '../utils/types';

const router = express.Router();

//// User-Restricted Information ////
router.use(authController.protect);

//// Admin-Restricted Information ////
router.use(authController.restrictTo(UserRoles.ADMIN));

router.route('/').get(invitationController.getAllInvitations);
router
  .route('/:id')
  .get(invitationController.getInvitation)
  .patch(invitationController.updateInvitation)
  .delete(invitationController.deleteInvitation);

module.exports = router;
