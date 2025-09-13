import * as factory from './handlerFactory';
import { ModuleUser } from './../models';

export const getAllModuleUsers = factory.getAll(ModuleUser);
export const getModuleUser = factory.getOne(ModuleUser);
export const updateModuleUser = factory.updateOne(ModuleUser);
export const deleteModuleUser = factory.deleteOne(ModuleUser);
