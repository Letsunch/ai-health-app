import React, { useEffect, useState } from 'react';
import { getTests, addTest, updateTest, deleteTest } from '../services/testsService';
import DiagnosticTestForm from '../components/DiagnosticTestForm';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiFileText, FiCalendar, FiBarChart2 } from 'react-icons/fi';
import moment from 'moment';

const DiagnosticTests = () => {
  const [tests, setTests] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const loadTests = async () => {
    try {
      setIsLoading(true);
      const data = await getTests();
      setTests(data);
      setError('');
    } catch (err) {
      setError('Failed to load tests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleAdd = async (test) => {
    try {
      setIsLoading(true);
      await addTest(test);
      await loadTests();
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to add test. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (test) => {
    try {
      setIsLoading(true);
      await updateTest(test.id, test);
      setEditing(null);
      await loadTests();
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to update test. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this test?')) return;
    try {
      setIsLoading(true);
      await deleteTest(id);
      await loadTests();
    } catch (err) {
      setError('Failed to delete test. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setEditing(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Diagnostic Tests</h2>
        <button 
          onClick={toggleFormVisibility}
          style={isFormVisible ? styles.cancelButton : styles.addButton}
        >
          {isFormVisible ? (
            <>
              <FiX style={styles.buttonIcon} />
              <span style={styles.buttonText}>Cancel</span>
            </>
          ) : (
            <>
              <FiPlus style={styles.buttonIcon} />
              <span style={styles.buttonText}>Add Test</span>
            </>
          )}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {isFormVisible && (
        <div style={styles.formContainer}>
          <DiagnosticTestForm 
            onSubmit={editing ? handleUpdate : handleAdd} 
            initialData={editing || { id: null, name: '', result: '', date: '' }}
            isSubmitting={isLoading}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {isLoading && !tests.length ? (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading tests...</p>
        </div>
      ) : (
        <div style={styles.testList}>
          {tests.map(test => (
            <div key={test.id} style={styles.testCard}>
              <div style={styles.testContent}>
                <div style={styles.testHeader}>
                  <FiFileText style={styles.testIcon} />
                  <h3 style={styles.testName}>{test.name}</h3>
                </div>
                <div style={styles.testDetails}>
                  <span style={styles.testDetail}>
                    <FiBarChart2 style={styles.detailIcon} />
                    <strong>Result:</strong> {test.result}
                  </span>
                  <span style={styles.testDetail}>
                    <FiCalendar style={styles.detailIcon} />
                    <strong>Date:</strong> {moment(test.date).format('MMM D, YYYY')}
                  </span>
                </div>
              </div>
              <div style={styles.testActions}>
                <button 
                  onClick={() => {
                    setEditing(test);
                    setIsFormVisible(true);
                  }} 
                  style={styles.editButton}
                  disabled={isLoading}
                  aria-label="Edit test"
                >
                  <FiEdit2 style={styles.actionIcon} />
                  <span style={styles.buttonText}>Edit</span>
                </button>
                <button 
                  onClick={() => handleDelete(test.id)} 
                  style={styles.deleteButton}
                  disabled={isLoading}
                  aria-label="Delete test"
                >
                  <FiTrash2 style={styles.actionIcon} />
                  <span style={styles.buttonText}>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !tests.length && (
        <div style={styles.emptyState}>
          <FiFileText style={styles.emptyIcon} />
          <p>No diagnostic tests found</p>
          <button 
            onClick={() => setIsFormVisible(true)}
            style={styles.addButton}
          >
            <FiPlus style={styles.buttonIcon} /> Add Test
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px',
    fontFamily: 'system-ui, sans-serif',
    '@media (min-width: 768px)': {
      padding: '24px'
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '16px',
    '@media (min-width: 768px)': {
      marginBottom: '24px',
      flexWrap: 'nowrap'
    }
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
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px',
    '@media (min-width: 768px)': {
      padding: '24px'
    }
  },
  testList: {
    display: 'grid',
    gap: '16px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  testCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  testContent: {
    flex: 1,
    marginBottom: '12px',
    '@media (min-width: 768px)': {
      marginBottom: 0
    }
  },
  testHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  },
  testIcon: {
    color: '#3182ce',
    fontSize: '18px',
    flexShrink: 0
  },
  testName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0
  },
  testDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  testDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#4a5568'
  },
  detailIcon: {
    color: '#718096',
    fontSize: '14px',
    flexShrink: 0
  },
  testActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    '@media (min-width: 768px)': {
      justifyContent: 'flex-start'
    }
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    '@media (min-width: 768px)': {
      width: 'auto'
    }
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    '@media (min-width: 768px)': {
      width: 'auto'
    }
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '80px'
  },
  actionIcon: {
    fontSize: '16px'
  },
  buttonIcon: {
    fontSize: '16px'
  },
  buttonText: {
    '@media (max-width: 400px)': {
      display: 'none'
    }
  },
  error: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
    borderLeft: '4px solid #c53030'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    color: '#4a5568',
    gap: '16px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#3182ce',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    color: '#a0aec0',
    gap: '16px',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '32px',
    color: '#cbd5e0'
  }
};

// Add animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

// Add hover effects only on devices that support hover
styleSheet.insertRule(`
  @media (hover: hover) {
    [style*="testCard"]:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    [style*="addButton"]:hover {
      background-color: #2c5282;
    }
    [style*="cancelButton"]:hover {
      background-color: #cbd5e0;
    }
    [style*="editButton"]:hover {
      background-color: #bee3f8;
    }
    [style*="deleteButton"]:hover {
      background-color: #fed7d7;
    }
  }
`, styleSheet.cssRules.length);

export default DiagnosticTests;