import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';

import { User, Module, ModuleUser, Invitation } from './../../models';
import { ModuleDocument, UserDocument } from '../types';
import { bufferConvertToString } from '../helpers';

dotenv.config({ path: __dirname + './../../.env' });
const DB: string = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
mongoose.set('strictQuery', true);
mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

function createCmdPrompt(): boolean {
  const userInput: string = readlineSync
    .question('This action is irreversible! Proceed...? (y/n): ')
    .toLowerCase();

  if (userInput.match(/^(yes|y)$/gi)) return true;
  else if (userInput.match(/^(no|n)$/gi)) return false;
  else return createCmdPrompt();
}

// Read JSON file
const users = JSON.parse(
  fs.readFileSync(`${__dirname}` + `/collections/users.json`, 'utf-8')
).map((user: UserDocument) => {
  if (user.photo) {
    user.photo = bufferConvertToString(user.photo);
  }
  return user;
});
const modules = JSON.parse(
  fs.readFileSync(`${__dirname}` + `/collections/modules.json`, 'utf-8')
).map((moduleItem: ModuleDocument) => {
  if (moduleItem.photo) {
    moduleItem.photo = bufferConvertToString(moduleItem.photo);
  }
  return moduleItem;
});
const moduleUsers = JSON.parse(
  fs.readFileSync(`${__dirname}` + `/collections/moduleUsers.json`, 'utf-8')
);
const invitations = JSON.parse(
  fs.readFileSync(`${__dirname}` + `/collections/invitations.json`, 'utf-8')
);

// Import Data into Collection
const importData = async (): Promise<void> => {
  try {
    const selection = createCmdPrompt();
    if (!selection) return;

    await User.create(users, { validateBeforeSave: false });
    await ModuleUser.create(moduleUsers, { validateBeforeSave: false });
    await Invitation.create(invitations, { validateBeforeSave: false });
    await Module.create(modules, { validateBeforeSave: false });

    console.log('Data successfully imported!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

// Delete All Data from Collection
const deleteData = async (): Promise<void> => {
  try {
    const selection = createCmdPrompt();
    if (!selection) return;

    await User.deleteMany();
    await Module.deleteMany();
    await ModuleUser.deleteMany();
    await Invitation.deleteMany();

    console.log('Data successfully deleted!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
