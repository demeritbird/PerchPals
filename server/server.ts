import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { app } from './app';

const DB: string = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

const PORT: string | number = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
