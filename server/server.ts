import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { app } from './app';

const DB: string = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
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
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('Sigterm Received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated!');
  });
});
