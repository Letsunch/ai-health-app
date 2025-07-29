import React, { useEffect, useState } from 'react';
import { getAlerts } from '../services/alertsService';
import AlertCard from '../components/AlertCard';

const AlertsDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlerts()
      .then(data => setAlerts(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Alerts Dashboard</h2>
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length > 0 ? (
        alerts.map(alert => <AlertCard key={alert.id} alert={alert} />)
      ) : (
        <p>No alerts found.</p>
      )}
    </div>
  );
};

export default AlertsDashboard;
