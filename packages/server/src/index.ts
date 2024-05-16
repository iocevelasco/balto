import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/config.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);




