import { db } from '../../config/firebaseConfig';
import logger from '../../config/logger';

export async function testFirestore() {
  try {
    logger.info('TestFirestore beginn!');
    const docRef = db.collection('test2').doc('testDoc2');
    await docRef.set({ test: 'testValue2' });
    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
}
