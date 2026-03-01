import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';

import { User, Module, ModuleUser, Invitation } from './../models';
import { importMockDatabaseData } from './helpers';

chai.use(chaiHttp);
const { expect } = chai;
const { app } = require('./../app');

import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri).then((con) => {
    console.log('<TEST> Mock DB connection successful!');
  });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in mongoose.connection.collections) {
    await collections[key].deleteMany({});
  }

  const { users, moduleUsers, invitations, modules } = importMockDatabaseData();

  await User.create(users, { validateBeforeSave: false });
  await ModuleUser.create(moduleUsers, { validateBeforeSave: false });
  await Invitation.create(invitations, { validateBeforeSave: false });
  await Module.create(modules, { validateBeforeSave: false });
});

describe('Mock Server Connection', function () {
  it('should respond with status 200 when pinged', function (done) {
    chai
      .request(app)
      .get('/')
      .end(function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('Hello from the server side development!');
        done();
      });
  });
});
