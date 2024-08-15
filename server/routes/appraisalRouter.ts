import express from 'express';
import { authController, appraisalController } from '../controllers';

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(appraisalController.getAllAppraisals)
  .post(appraisalController.createAppraisal);

router.get('/:appraisalId', appraisalController.getAppraisal);

router.post('/:appraisalId/questions/:questionId/reviews', appraisalController.createReview);

module.exports = router;
