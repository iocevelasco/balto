import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { admin } from './config/firebase';
import config from './config/commons';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(401).send('Unauthorized');
  }
};

app.use('/api', authenticate);

app.get('/api/protected', (req: Request, res: Response) => {
  const user = (req as any).user;
  res.send(`Hello ${user.name}, you have access to this route!`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);




