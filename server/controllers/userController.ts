import * as factory from './handlerFactory';
import { User } from './../models';

export const getAllUsers = factory.getAll(User);
export const getUser = factory.getOne(User);

export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
