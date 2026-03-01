import fs from 'fs';
import {
  InvitationDocument,
  ModuleDocument,
  ModuleUserDocument,
  UserDocument,
} from '../types';
import { HydratedDocument } from 'mongoose';

/**
 * @desc reads seeded data from dev-data/collections folder and
 *       returns object form of this json
 * @returns all seeded data as documents in an object
 */
export function importMockDatabaseData(): Record<string, HydratedDocument<any>> {
  const users: UserDocument = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/collections/users.json`, 'utf-8')
  ).map((user: UserDocument) => {
    if (user.photo) {
      user.photo = bufferConvertToString(user.photo);
    }
    return user;
  });
  const modules: ModuleDocument = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/collections/modules.json`, 'utf-8')
  ).map((moduleItem: ModuleDocument) => {
    if (moduleItem.photo) {
      moduleItem.photo = bufferConvertToString(moduleItem.photo);
    }
    return moduleItem;
  });
  const moduleUsers: ModuleUserDocument = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/collections/moduleUsers.json`, 'utf-8')
  );
  const invitations: InvitationDocument = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/collections/invitations.json`, 'utf-8')
  );

  return { users, modules, moduleUsers, invitations };
}

export function bufferConvertToString(fileString: string): string {
  const filePath: string = `${__dirname}/../../public/img/${fileString}`;
  const buffer = fs.readFileSync(filePath).toString('base64');

  return buffer;
}
