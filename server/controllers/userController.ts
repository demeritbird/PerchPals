const factory = require('./handlerFactory');
import { User } from './../models';

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
