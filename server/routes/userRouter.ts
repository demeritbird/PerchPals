import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/refresh', authController.refresh);
router.get('/test', authController.protect, authController.testProtect);

router.post('/logout', authController.logout);

module.exports = router;
