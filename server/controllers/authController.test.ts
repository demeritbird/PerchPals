import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
const { app } = require('./../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('log in', function () {
  it('respond with status 200 when correct login credentials is provided', function (done) {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({ email: 'admin@example.com', password: 'test1234' })
      .end(function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('respond with status 401 when incorrect login credentials is provided', function (done) {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({ email: 'admin@example.com', password: 'wrongpassword' })
      .end(function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(401);
        done();
      });
  });
});
