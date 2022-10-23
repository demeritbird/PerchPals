import { app } from './app';
import dotenv from 'dotenv';

dotenv.config({ path: './../config.env' });

const PORT: string | number = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(process.env.NODE_ENV);
  console.log(`App running on port ${PORT}...`);
});
