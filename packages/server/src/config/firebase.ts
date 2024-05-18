import { initializeApp } from 'firebase/app';
import 
 { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
   sendPasswordResetEmail
 } from "firebase/auth";

import config from './config.js';

const firebase = initializeApp(config.firebaseConfig);

export default firebase;
export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
}