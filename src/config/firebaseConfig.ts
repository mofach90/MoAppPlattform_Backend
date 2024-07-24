import admin, { ServiceAccount } from 'firebase-admin';
import { Auth } from 'firebase-admin/lib/auth/auth';

const serviceAccount: ServiceAccount = {
  projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID,
  privateKey:process.env?.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
  clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
};

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth: Auth = firebaseApp.auth();

export const db: admin.firestore.Firestore = admin.firestore();



