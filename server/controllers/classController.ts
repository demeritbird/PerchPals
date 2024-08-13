// import mongoose from 'mongoose';
import { Class, User } from '../models';
import { AppError, catchAsync } from '../utils/helpers';
import { NextFunction, Response } from 'express';
import { ClassRequest } from '../utils/types';
import * as factory from './handlerFactory';

export const getAllClasses = factory.getAll(Class);
export const getClass = factory.getOne(Class);
export const createClass = factory.createOne(Class);
export const updateClass = factory.updateOne(Class);
export const deleteClass = factory.deleteOne(Class);
