import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/test', authController.protect, authController.testProtect);

module.exports = router;
