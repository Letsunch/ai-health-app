import React from 'react';

const AlertCard = ({ alert }) => (
  <div>
    <h4>{alert.title}</h4>
    <p>Status: {alert.status}</p>
    <p>{new Date(alert.timestamp).toLocaleString()}</p>
  </div>
);

export default AlertCard;