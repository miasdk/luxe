import admin from 'firebase-admin';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

config();

const serviceAccountPath = path.resolve(process.env.FIREBASE_ADMIN_SDK_PATH);

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export { firebaseApp, admin as default };