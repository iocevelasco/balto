import admin from "firebase-admin";
import config from "../commons";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.serviceAccount.project_id,
    clientEmail: config.serviceAccount.client_email,
    privateKey: config.serviceAccount.private_key,
  })
});

export { admin };