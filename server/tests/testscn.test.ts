export {};

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
const { app } = require('./../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Server Connection', function () {
  before(() => {
    process.env.NODE_ENV = 'development';
  });

  after(() => {
    Object.keys(process.env).forEach((key) => delete process.env[key]);
  });

  it('should respond with status 200 and greeting text', function (done) {
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
