import * as factory from './handlerFactory';
import { Invitation } from './../models';

export const getAllInvitations = factory.getAll(Invitation);
export const getInvitation = factory.getOne(Invitation);
export const updateInvitation = factory.updateOne(Invitation);
export const deleteInvitation = factory.deleteOne(Invitation);
