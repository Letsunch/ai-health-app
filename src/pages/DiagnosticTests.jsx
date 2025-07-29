import React, { useEffect, useState } from 'react';
import { getTests, addTest, updateTest, deleteTest } from '../services/testsService';
import DiagnosticTestForm from '../components/DiagnosticTestForm';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import moment from 'moment';

const DiagnosticTests = () => {
  const [tests, setTests] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTests = async () => {
    try {
      setIsLoading(true);
      const data = await getTests();
      setTests(data);
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
    } catch (err) {
      setError('Failed to update test. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Diagnostic Tests</h2>
        {editing ? (
          <button onClick={handleCancelEdit} style={styles.cancelButton}>
            <FiX style={styles.buttonIcon} /> Cancel
          </button>
        ) : (
          <button 
            onClick={() => setEditing({ id: null, name: '', result: '', date: '' })} 
            style={styles.addButton}
          >
            <FiPlus style={styles.buttonIcon} /> Add Test
          </button>
        )}
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.formContainer}>
        <DiagnosticTestForm 
          onSubmit={editing ? handleUpdate : handleAdd} 
          initialData={editing} 
          isSubmitting={isLoading}
        />
      </div>

      {isLoading && !tests.length ? (
        <div style={styles.loading}>Loading tests...</div>
      ) : (
        <div style={styles.testList}>
          {tests.map(test => (
            <div key={test.id} style={styles.testCard}>
              <div style={styles.testContent}>
                <h3 style={styles.testName}>{test.name}</h3>
                <div style={styles.testDetails}>
                  <span style={styles.testResult}>
                    <strong>Result:</strong> {test.result}
                  </span>
                  <span style={styles.testDate}>
                    <strong>Date:</strong> {moment(test.date).format('MMM D, YYYY')}
                  </span>
                </div>
              </div>
              <div style={styles.testActions}>
                <button 
                  onClick={() => setEditing(test)} 
                  style={styles.editButton}
                  disabled={isLoading}
                >
                  <FiEdit2 style={styles.actionIcon} />
                </button>
                <button 
                  onClick={() => handleDelete(test.id)} 
                  style={styles.deleteButton}
                  disabled={isLoading}
                >
                  <FiTrash2 style={styles.actionIcon} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !tests.length && (
        <div style={styles.emptyState}>
          <p>No diagnostic tests found. Add your first test above.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  },
  testList: {
    display: 'grid',
    gap: '1rem',
  },
  testCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    padding: '1rem 1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  testCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  testContent: {
    flex: 1,
  },
  testName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0 0 0.5rem 0',
  },
  testDetails: {
    display: 'flex',
    gap: '1.5rem',
    fontSize: '0.875rem',
    color: '#4a5568',
  },
  testActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  addButtonHover: {
    backgroundColor: '#2c5282',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    border: 'none',
    borderRadius: '0.375rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  cancelButtonHover: {
    backgroundColor: '#cbd5e0',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    border: 'none',
    borderRadius: '0.375rem',
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  editButtonHover: {
    backgroundColor: '#bee3f8',
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    border: 'none',
    borderRadius: '0.375rem',
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#fed7d7',
  },
  actionIcon: {
    fontSize: '1rem',
  },
  buttonIcon: {
    fontSize: '1rem',
  },
  error: {
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    padding: '0.75rem 1rem',
    borderRadius: '0.375rem',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
  },
  loading: {
    textAlign: 'center',
    color: '#718096',
    padding: '2rem',
  },
  emptyState: {
    textAlign: 'center',
    color: '#718096',
    padding: '2rem',
    backgroundColor: '#f7fafc',
    borderRadius: '0.5rem',
  },
};

// Add hover effects
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .test-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .add-button:hover {
    background-color: #2c5282;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .cancel-button:hover {
    background-color: #cbd5e0;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .edit-button:hover {
    background-color: #bee3f8;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .delete-button:hover {
    background-color: #fed7d7;
  }
`, styleSheet.cssRules.length);

export default DiagnosticTests;