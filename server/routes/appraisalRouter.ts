import express from 'express';
import { authController, appraisalController } from '../controllers';

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(appraisalController.getAllAppraisals)
  .post(appraisalController.createAppraisal);

router.get('/:id', appraisalController.getAppraisal);

module.exports = router;
