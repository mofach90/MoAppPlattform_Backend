import admin, { ServiceAccount } from 'firebase-admin';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { Messaging } from 'firebase-admin/lib/messaging/messaging';

const serviceAccount: ServiceAccount = {
  projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID,
  privateKey:
    process.env?.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
  clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
};

const firestoreSettings = {
  ignoreUndefinedProperties: true,
};

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
});



export const messaging: any = admin.messaging()
// messaging.usePublicVapidKey('BMyrgk4-oc7Z53E99SZb0MdWaIquk2x7CClDfYamWfUwgeSVrwkkGI2w4E-aroPwEHQMEhhg0vnlBpvUWnVD_ac');
// messaging.usePrivateVapidKey('JWRTwq1rnR1nefoK2ISvsbOZHxVba96HxmoejlM8Xeg');

export const auth: Auth = firebaseApp.auth();

export const db: admin.firestore.Firestore = admin.firestore();
 db.settings(firestoreSettings);


