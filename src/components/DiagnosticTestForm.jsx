import React, { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';

const DiagnosticTestForm = ({ initialData = {}, onSubmit, isSubmitting }) => {
  const [form, setForm] = useState({
    name: '',
    result: '',
    date: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Test Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Result</label>
        <input
          name="result"
          value={form.result}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Date</label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      
      <button 
        type="submit" 
        style={styles.submitButton}
        disabled={isSubmitting}
      >
        <FiSave style={styles.buttonIcon} />
        {isSubmitting ? 'Saving...' : 'Save Test'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4a5568',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  'input:focus': {
    borderColor: '#3182ce',
    boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '0.5rem',
  },
  'submitButton:hover': {
    backgroundColor: '#2c5282',
  },
  'submitButton:disabled': {
    backgroundColor: '#a0aec0',
    cursor: 'not-allowed',
  },
  buttonIcon: {
    fontSize: '1rem',
  },
};

// Add focus styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  input:focus {
    border-color: #3182ce !important;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2) !important;
  }
`, styleSheet.cssRules.length);

export default DiagnosticTestForm;