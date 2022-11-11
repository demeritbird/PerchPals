import express, { Express, Request, Response } from 'express';
import cors from 'cors';
export { app };

const userRouter = require('./routes/userRouter');
import { globalErrorHandler } from './controllers';

import { AppError } from './utils/helpers';

const app: Express = express();

app.use(cors());
app.options('*', cors());

// Development Logging
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`Hello from the server side ${process.env.NODE_ENV}!`);
});

app.get('/testdata', (req: Request, res: Response) => {
  res.json({ foo: 'test' });
});

app.use(express.static(`${__dirname}/../../cilent/public`));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
