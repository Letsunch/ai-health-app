import React from 'react';
import { FiAlertTriangle, FiInfo, FiBell } from 'react-icons/fi';

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'critical':
      return { 
        backgroundColor: '#fff5f5',
        borderColor: '#ff4d4d',
        icon: <FiAlertTriangle style={{ color: '#ff4d4d' }} />,
        textColor: '#ff4d4d'
      };
    case 'warning':
      return { 
        backgroundColor: '#fffaf0',
        borderColor: '#ffa500',
        icon: <FiAlertTriangle style={{ color: '#ffa500' }} />,
        textColor: '#d97706'
      };
    case 'info':
      return { 
        backgroundColor: '#f0f9ff',
        borderColor: '#2196f3',
        icon: <FiInfo style={{ color: '#2196f3' }} />,
        textColor: '#0284c7'
      };
    default:
      return { 
        backgroundColor: '#f9fafb',
        borderColor: '#ccc',
        icon: <FiBell style={{ color: '#6b7280' }} />,
        textColor: '#6b7280'
      };
  }
};

const AlertCard = ({ alert }) => {
  const { title, status, timestamp, description } = alert;
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleString()
    : 'No timestamp';
  const { backgroundColor, borderColor, icon, textColor } = getStatusStyle(status);

  return (
    <div
      style={{
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: '8px',
        marginBottom: '1rem',
        padding: '1.25rem',
        backgroundColor: backgroundColor,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="alert-card"
    >
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{ marginTop: '2px' }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ 
              margin: 0,
              marginBottom: '0.5rem',
              color: textColor,
              fontWeight: '600'
            }}>
              {title || 'Untitled Alert'}
            </h4>
            <span
              style={{
                color: textColor,
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {status || 'UNKNOWN'}
            </span>
          </div>
          
          {description && (
            <p style={{ 
              margin: '0.5rem 0 0 0',
              color: '#4b5563',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}>
              {description}
            </p>
          )}
          
          <div style={{ 
            marginTop: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <small style={{ 
              color: '#6b7280',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              {formattedTime}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add hover effect
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .alert-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`, styleSheet.cssRules.length);

export default AlertCard;