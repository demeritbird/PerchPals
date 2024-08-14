import express from 'express';
import { authController, classController } from '../controllers';

const router = express.Router();

router.use(authController.protect);

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClass);
router.post('/createClass', classController.createClass);
router.post('/assignClassToUser', classController.assignClassToUser);
router.post('/createGroup', classController.createGroupInClass);

module.exports = router;
