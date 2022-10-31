import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';

import { Roles } from './../utils/constants/types.contants';

interface User {
  name: string;
  email: string;
  photo?: string;
  role: string;
  password: string;
  passwordConfirm: string | undefined;
}
interface Password {
  password: string;
}

//// Schema ////
const userSchema = new Schema<User>({
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
        // NOTE: use 'this as any' if somehow this does not work.
        return el === (this as Password).password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

//// Methods ////
// TODO: Add methods here.

const User = mongoose.model<User>('User', userSchema);
module.exports = User;
