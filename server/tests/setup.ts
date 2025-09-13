import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
const { app } = require('./../app');

chai.use(chaiHttp);
const { expect } = chai;

before(async () => {
  const DB: string = process.env.TEST_DATABASE!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!
  );

  mongoose.set('strictQuery', true);
  await mongoose.connect(DB).then((con) => {
    console.log('<TEST> DB connection successful!');
  });
});

after(async () => {
  await mongoose.disconnect().then(() => {
    console.log('<TEST> DB connection closed!');
  });
});

describe('Server Connection', function () {
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
