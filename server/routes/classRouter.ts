import express from 'express';
import { authController, classController } from '../controllers';

const router = express.Router();

router.use(authController.protect);

router.get('/getAllClasses', classController.getAllClasses);
router.post('/createClass', classController.createClass);

module.exports = router;
