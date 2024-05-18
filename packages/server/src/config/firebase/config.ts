import admin from "firebase-admin";
import config from "../commons";
import fs from 'fs';

const pepe = fs.writeFileSync('serviceAccountKey.json', JSON.stringify(config.serviceAccount, null, 2));
console.log({pepe})
admin.initializeApp({
  credential: admin.credential.cert(pepe as any)
});

export { admin };