import express from 'express';
import { authController, classController } from '../controllers';

const router = express.Router();

router.use(authController.protect);

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClass);
router.post('/createClass', classController.createClass);
router.post('/createGroup', classController.createGroupInClass);

router.patch('/assignClass', classController.assignUsersToClass);
router.patch('/acceptClass', classController.userAcceptClassInvitation);

module.exports = router;
