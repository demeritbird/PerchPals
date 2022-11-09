import express from 'express';
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

module.exports = router;
