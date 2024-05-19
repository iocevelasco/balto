import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import config from './config/commons';
import connect from './config/db';
import routes from './config/routes';

import auth from './middleware/auth';

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())
connect(config.dbUrl);
routes(app);

app.use('/api', auth);

app.get('/api/protected', (req: Request, res: Response) => {
  const user = (req as any).user;
  res.send(`Hello ${user.name}, you have access to this route!`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.host}:${config.port}`),
);




