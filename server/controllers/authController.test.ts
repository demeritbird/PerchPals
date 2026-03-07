import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
const { app } = require('./../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('log in', function () {
  it('should respond with status 200 when correct login credentials is provided', function (done) {
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

  it('should respond with status 401 when incorrect login credentials is provided', function (done) {
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

  it('should respond with status 401 when user cannot be found', function (done) {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({ email: 'thisusercannotbefound@example.com', password: 'test1234' })
      .end(function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(401);
        done();
      });
  });
});

describe('sign up', function () {
  it('should respond with status 200 when correct signup credentials are provided', function (done) {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'newuser@example.com',
        name: 'newuser',
        password: 'test1234',
        passwordConfirm: 'test1234',
      })
      .end(function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should respond with status 400 when password not same as passwordConfirm', function (done) {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'newuser@example.com',
        name: 'newuser',
        password: 'test1234',
        passwordConfirm: 'not the same password',
      })
      .end(function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        done();
      });
  });

  it('should respond with status 400 when there already exists an account with that email', function (done) {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        email: 'admin@example.com',
        name: 'admin',
        password: 'test1234',
        passwordConfirm: 'test1234',
      })
      .end(function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        done();
      });
  });
});
