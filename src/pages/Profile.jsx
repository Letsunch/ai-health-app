import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { FiUser, FiMail, FiBell, FiAlertTriangle, FiSave } from 'react-icons/fi';

const Profile = () => {
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    threshold: 5, 
    notifications: true 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const ref = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            threshold: data.preferences?.threshold || 5,
            notifications: data.preferences?.notifications || false
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const ref = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(ref, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        preferences: {
          threshold: Number(form.threshold),
          notifications: form.notifications
        }
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Profile Settings</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.nameFields}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FiUser style={styles.icon} />
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your first name"
                required
                disabled={isLoading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FiUser style={styles.icon} />
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your last name"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FiMail style={styles.icon} />
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FiAlertTriangle style={styles.icon} />
              Alert Threshold
            </label>
            <input
              name="threshold"
              type="number"
              min="1"
              max="10"
              value={form.threshold}
              onChange={handleChange}
              style={styles.input}
              disabled={isLoading}
            />
            <p style={styles.hint}>Set alert severity level (1-10)</p>
          </div>

          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                name="notifications"
                type="checkbox"
                checked={form.notifications}
                onChange={handleChange}
                style={styles.checkbox}
                disabled={isLoading}
              />
              <FiBell style={styles.checkboxIcon} />
              Receive Email Notifications
            </label>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(isLoading && styles.buttonLoading)
            }}
            disabled={isLoading}
          >
            <FiSave style={styles.buttonIcon} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>

          {isSuccess && (
            <div style={styles.successMessage}>
              Profile updated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '2rem',
    width: '100%',
    maxWidth: '600px'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e2e8f0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  nameFields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#475569'
  },
  icon: {
    color: '#64748b'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    outline: 'none'
  },
  'input:focus': {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  },
  hint: {
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: '0.25rem'
  },
  checkboxGroup: {
    margin: '1rem 0'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#475569',
    cursor: 'pointer'
  },
  checkbox: {
    width: '1rem',
    height: '1rem',
    accentColor: '#3b82f6',
    cursor: 'pointer'
  },
  checkboxIcon: {
    color: '#64748b'
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '1rem'
  },
  'submitButton:hover': {
    backgroundColor: '#2563eb'
  },
  buttonLoading: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed'
  },
  buttonIcon: {
    fontSize: '1rem'
  },
  successMessage: {
    backgroundColor: '#ecfdf5',
    color: '#059669',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginTop: '1rem',
    fontSize: '0.875rem',
    textAlign: 'center'
  }
};

// Add dynamic styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  input:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  button:hover {
    background-color: #2563eb !important;
  }
`, styleSheet.cssRules.length);

export default Profile;