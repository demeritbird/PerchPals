import express, { Express, Request, Response } from 'express';
export { app };

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello from the server side!');
});

app.use(express.static(`${__dirname}/../../cilent/public`));

// import NextFunction --> next: NextFunction
