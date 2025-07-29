import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isPasswordStrong = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!isPasswordStrong(password)) {
      setPasswordError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        middleName,
        lastName,
        email,
        preferences: {
          notifications: true,
          threshold: 5,
        },
      });
      navigate('/alerts');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <h2 style={styles.loginTitle}>Create your account</h2>
          <p style={styles.loginSubheader}>
            Or{' '}
            <a href="#" style={styles.loginLink} onClick={() => navigate('/login')}>
              sign in to your existing account
            </a>
          </p>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            <div style={styles.errorContent}>
              <div style={styles.errorIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={styles.errorIconSvg} viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={styles.errorText}>
                <p style={styles.errorTextP}>{error}</p>
              </div>
            </div>
          </div>
        )}

        <form style={styles.loginForm} onSubmit={handleRegister}>
          <div style={styles.formInputs}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>First Name</label>
              <input 
                type="text" 
                required 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                style={styles.inputField} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Middle Name (Optional)</label>
              <input 
                type="text" 
                value={middleName} 
                onChange={(e) => setMiddleName(e.target.value)} 
                style={styles.inputField} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Last Name</label>
              <input 
                type="text" 
                required 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                style={styles.inputField} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={styles.inputField} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={styles.inputField} 
              />
              {passwordError && <p style={styles.errorTextP}>{passwordError}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Confirm Password</label>
              <input 
                type="password" 
                required 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                style={styles.inputField} 
              />
              {confirmPasswordError && <p style={styles.errorTextP}>{confirmPasswordError}</p>}
            </div>
          </div>

          <div style={styles.submitButtonContainer}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonLoading : {}),
              }}
            >
              {isLoading ? (
                <>
                  <svg style={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : 'Register'}
            </button>
          </div>
        </form>

        <div style={styles.termsText}>
          By registering, you agree to our{' '}
          <a href="#" style={styles.loginLink}>Terms</a> and{' '}
          <a href="#" style={styles.loginLink}>Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: '16px',
    fontFamily: 'system-ui, sans-serif',
  },
  loginCard: {
    maxWidth: '448px',
    width: '100%',
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  loginTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a202c',
  },
  loginSubheader: {
    fontSize: '14px',
    color: '#4a5568',
    marginTop: '8px',
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    borderLeft: '4px solid #f56565',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '6px',
  },
  errorContent: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  errorIcon: {
    marginTop: '2px',
  },
  errorIconSvg: {
    height: '20px',
    width: '20px',
    color: '#f56565',
  },
  errorText: {
    marginLeft: '12px',
  },
  errorTextP: {
    color: '#b91c1c',
    fontSize: '13px',
    margin: '4px 0 0 0',
  },
  loginForm: {
    marginTop: '24px',
  },
  formInputs: {
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  inputLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#4a5568',
    fontSize: '14px',
  },
  inputField: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
  },
  'inputField:focus': {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.2)',
  },
  submitButtonContainer: {
    marginTop: '24px',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#667eea',
    color: 'white',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonLoading: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  submitButtonHover: {
    backgroundColor: '#5a67d8',
  },
  loginLink: {
    color: '#667eea',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  'loginLink:hover': {
    color: '#5a67d8',
  },
  termsText: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#718096',
    marginTop: '24px',
    lineHeight: '1.5',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    height: '20px',
    width: '20px',
    marginRight: '12px',
  },
  spinnerCircle: {
    opacity: '0.25',
    stroke: 'currentColor',
  },
  spinnerPath: {
    opacity: '0.75',
    fill: 'currentColor',
  },
};

// Add the animation to the document's styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

// Add focus styles
styleSheet.insertRule(`
  input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2) !important;
  }
`, styleSheet.cssRules.length);

// Add hover styles
styleSheet.insertRule(`
  button:hover {
    background-color: #5a67d8 !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  a:hover {
    color: #5a67d8 !important;
  }
`, styleSheet.cssRules.length);

export default Register;