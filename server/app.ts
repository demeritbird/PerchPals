import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
export { app };

const userRouter = require('./routes/userRouter');
const moduleRouter = require('./routes/moduleRouter');
const moduleUserRouter = require('./routes/moduleUserRouter');
const invitationRouter = require('./routes/invitationRouter');

import { globalErrorHandler } from './controllers';

import { AppError } from './utils/helpers';

const app: Express = express();

// https://stackoverflow.com/questions/24897801/enable-access-control-allow-origin-for-multiple-domains-in-node-js
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// Development Logging
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`Hello from the server side ${process.env.NODE_ENV}!`);
});

app.use(express.static(`${__dirname}/../../cilent/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/modules', moduleRouter);
app.use('/api/v1/moduleUsers', moduleUserRouter);
app.use('/api/v1/invitations', invitationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
