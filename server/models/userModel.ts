import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

import { InputUser, Roles } from './../utils/types';

//// Schema ////
const userSchema = new Schema<InputUser>({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: String,
  role: {
    type: String,
    enum: [Roles.USER, Roles.ADMIN, Roles.MASTER],
    default: Roles.USER,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el: string): boolean {
        return el === (this as InputUser).password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

//// Methods ////
// TODO: Add methods here.

const User = mongoose.model<InputUser>('User', userSchema);
module.exports = User;
