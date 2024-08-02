import { db } from '../../config/firebaseConfig';
import logger from '../../config/logger';

export async function testFirestore() {
  try {
    logger.info('TestFirestore beginn!');
    console.log('db value : ', db);
    const docRef = db.collection('test3').doc('testDoc3');
    await docRef.set({ test: 'testValue3' });
    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
}
