import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization;

  admin.auth().verifyIdToken(idToken)
  .then((decodedToken) => {
    req.user = decodedToken;
    next();
  })
  .catch((error) => {
    console.log('Error verifying ID token:', error);
    res.status(401).json({ error: 'Invalid token' });
  });
};
