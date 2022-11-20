import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
