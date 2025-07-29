import React, { useEffect, useState } from 'react';
import { getAlerts } from '../services/alertsService';
import AlertCard from '../components/AlertCard';

const AlertsDashboard = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts().then(setAlerts);
  }, []);

  return (
    <div>
      <h2>Alerts</h2>
      {alerts.map(alert => <AlertCard key={alert.id} alert={alert} />)}
    </div>
  );
};

export default AlertsDashboard;