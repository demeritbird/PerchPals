import { Appraisal } from '../models';
import * as factory from './handlerFactory';

export const getAllAppraisals = factory.getAll(Appraisal);
export const getAppraisal = factory.getOne(Appraisal);
export const createAppraisal = factory.createOne(Appraisal);
export const updateAppraisal = factory.updateOne(Appraisal);
export const deleteAppraisal = factory.deleteOne(Appraisal);
