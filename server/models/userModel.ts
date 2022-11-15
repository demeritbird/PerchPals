import mongoose, { Schema, SchemaValidator } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { InputUser, UserDocument, UserModel, Roles } from './../utils/types';

//// Schema ////
const userSchema = new Schema<UserDocument, UserModel>({
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
        return el === (this as InputUser & SchemaValidator<string>).password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

//// Middlwares ////
/**
 * Before creating User Document in database,
 * hash user's password and remove passwordConfirm field.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  (this.passwordConfirm as unknown) = undefined;
  next();
});

//// Methods ////
/**
 * Compares user's input password against user's actual password and checks if they are the same.
 *
 * @param candidatePassword Incoming password from user during authentication.
 * @param userPassword User's currently saved password in database.
 * @returns a Promise<boolean> whether both hashed passwords are the same.
 */
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
export default User;
