import React, { useEffect, useState } from 'react';
import { getAlerts } from '../services/alertsService';
import AlertCard from '../components/AlertCard';
import { FiAlertTriangle, FiLoader } from 'react-icons/fi';

const AlertsDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAlerts()
      .then(data => {
        setAlerts(data);
        setError(null);
      })
      .catch(err => {
        setError('Failed to load alerts. Please try again later.');
        console.error('Error fetching alerts:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <FiAlertTriangle style={styles.headerIcon} />
        <h2 style={styles.title}>Alerts Dashboard</h2>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div style={styles.loadingContainer}>
          <FiLoader style={styles.spinner} />
          <p>Loading alerts...</p>
        </div>
      ) : alerts.length > 0 ? (
        <div style={styles.alertsGrid}>
          {alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <FiAlertTriangle style={styles.emptyIcon} />
          <p>No alerts found</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 64px)',
    '@media (min-width: 768px)': {
      padding: '24px'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e2e8f0'
  },
  headerIcon: {
    fontSize: '24px',
    color: '#dd6b20',
    marginRight: '12px'
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0,
    '@media (min-width: 768px)': {
      fontSize: '24px'
    }
  },
  alertsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    color: '#4a5568'
  },
  spinner: {
    fontSize: '32px',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    color: '#a0aec0'
  },
  emptyIcon: {
    fontSize: '32px',
    marginBottom: '16px'
  },
  errorMessage: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    padding: '16px',
    borderRadius: '4px',
    marginBottom: '24px',
    borderLeft: '4px solid #c53030'
  }
};

// Add spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default AlertsDashboard;