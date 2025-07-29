import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const alertsCollection = collection(db, 'alerts');

export const getAlerts = async () => {
  const snapshot = await getDocs(alertsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
