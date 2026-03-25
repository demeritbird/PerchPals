import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import { User } from '../models';
const { app } = require('./../app');

chai.use(chaiHttp);
const { expect } = chai;

const INVALID_USER_ID = '123adbb1b0d29a9a93ef1234';
const ACTIVE_USER_ID = '637adbb1b0d29a9a93ef3630';
const PENDING_USER_ID = '637adbb1b0d29a9a93ef3632';

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

describe('send activation', function () {
  it('will not send email if user id does not exist', function (done) {
    chai
      .request(app)
      .post(`/api/v1/users/${INVALID_USER_ID}/resendActivate`)
      .end(async function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(404);
        done();
      });
  });

  it('will not send email if user already is active', function (done) {
    chai
      .request(app)
      .post(`/api/v1/users/${ACTIVE_USER_ID}/resendActivate`)
      .end(async function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        done();
      });
  });

  it('cannot change user active if user id is incorrect', function (done) {
    chai
      .request(app)
      .post(`/api/v1/users/${PENDING_USER_ID}/resendActivate`)
      .end(async function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        done();
      });
  });
});

describe('confirm activation', function () {
  it('cannot change user active if user id is incorrect', function (done) {
    chai
      .request(app)
      .patch(`/api/v1/users/${INVALID_USER_ID}/confirmActivate`)
      .send({
        token: '3ab9d7',
      })
      .end(async function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(404); // user not found

        done();
      });
  });

  it('using wrong token for activation will reject request', function (done) {
    chai
      .request(app)
      .patch(`/api/v1/users/${PENDING_USER_ID}/confirmActivate`)
      .send({
        token: '123456', // incorrect token
      })
      .end(async function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(400); // wrong input

        done();
      });
  });

  it('using correct token for activation will correctly make user active', function (done) {
    chai
      .request(app)
      .patch(`/api/v1/users/${PENDING_USER_ID}/confirmActivate`)
      .send({
        token: '3ab9d7',
      })
      .end(async function (err: Error, res: ChaiHttp.Response) {
        if (err) return done(err);
        expect(res.status).to.eql(200);

        const foundUser = await User.findById(PENDING_USER_ID);
        if (!foundUser) return done('no users found with that id.');

        // check if user active has been updated
        expect(foundUser.active).to.equal('active');

        done();
      });
  });
});
