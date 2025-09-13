import * as factory from './handlerFactory';
import { Module } from './../models';

export const getAllModules = factory.getAll(Module);
export const getModule = factory.getOne(Module);
export const updateModule = factory.updateOne(Module);
export const deleteModule = factory.deleteOne(Module);
