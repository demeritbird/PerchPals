import { app } from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './../config.env' });

const DB: string = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

const PORT: string | number = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
