// Only run this in dev/test! NEVER in production.
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const seedAlerts = async () => {
  const alerts = [
    {
      title: 'High blood pressure detected',
      status: 'critical',
      timestamp: new Date('2025-07-29T08:30:00Z'),
    },
    {
      title: 'Heart rate dropped below 40 BPM',
      status: 'critical',
      timestamp: new Date('2025-07-29T09:15:00Z'),
    },
    {
      title: 'Oxygen saturation warning',
      status: 'warning',
      timestamp: new Date('2025-07-28T15:40:00Z'),
    },
    {
      title: 'Routine glucose test available',
      status: 'info',
      timestamp: new Date('2025-07-27T10:00:00Z'),
    },
    {
      title: 'Blood sample not received',
      status: 'warning',
      timestamp: new Date('2025-07-26T12:25:00Z'),
    },
  ];

  try {
    const collectionRef = collection(db, 'alerts');
    for (const alert of alerts) {
      await addDoc(collectionRef, alert);
    }
    console.log('✅ Alerts seeded successfully!');
  } catch (err) {
    console.error('❌ Failed to seed alerts:', err);
  }
};

export default seedAlerts;
