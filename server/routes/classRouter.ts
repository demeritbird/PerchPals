import express from 'express';
import { authController, classController } from '../controllers';

const router = express.Router();

router.use(authController.protect);

router.route('/').get(classController.getAllClasses).post(classController.createClass);
router.get('/:id', classController.getClass);

router.patch('/:classId/assign', classController.assignUsersToClass);
router.patch('/:classId/users/:userId/accept', classController.userAcceptClassInvitation);

router.post('/group', classController.createGroupInClass);

module.exports = router;
