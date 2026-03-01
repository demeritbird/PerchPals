import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { app } from './app';

let DB: string = '';
switch (process.env.NODE_ENV) {
  case 'development':
    DB = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
    break;
  case 'production':
    DB = process.env.PROD_DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
    break;
  default:
    throw new Error('wrong environment set for database connection');
}

mongoose.set('strictQuery', true);
mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

const PORT: string | number = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err.name, err.message);

  mongoose.disconnect().then(() => {
    console.log('DB connection closed!');
  });
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('Sigterm Received. Shutting down gracefully...');

  mongoose.disconnect().then(() => {
    console.log('DB connection closed!');
  });
  server.close(() => {
    console.log('Process terminated!');
  });
});
