import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase/config';
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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Extract names from Google display name (format is usually "FirstName LastName")
      const names = user.displayName ? user.displayName.split(' ') : [];
      const googleFirstName = names[0] || '';
      const googleLastName = names.length > 1 ? names[names.length - 1] : '';
      
      await setDoc(doc(db, 'users', user.uid), {
        firstName: googleFirstName,
        middleName: '',
        lastName: googleLastName,
        email: user.email,
        preferences: {
          notifications: true,
          threshold: 5,
        },
      });
      
      navigate('/alerts');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGoogleLoading(false);
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

        <div style={styles.socialLoginContainer}>
          <button
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading}
            style={styles.googleButton}
          >
            {isGoogleLoading ? (
              <>
                <svg style={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up with Google...
              </>
            ) : (
              <>
                <svg style={styles.googleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </>
            )}
          </button>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <div style={styles.dividerText}>or</div>
          <div style={styles.dividerLine}></div>
        </div>

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

// Updated styles object with new styles for OAuth
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
  socialLoginContainer: {
    marginBottom: '24px',
  },
  googleButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    color: '#4a5568',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  googleIcon: {
    height: '20px',
    width: '20px',
    marginRight: '12px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  dividerLine: {
    flex: '1',
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    padding: '0 16px',
    fontSize: '14px',
    color: '#718096',
  },
  loginForm: {
    marginTop: '0',
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
  loginLink: {
    color: '#667eea',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
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

styleSheet.insertRule(`
  .googleButton:hover {
    background-color: #f8fafc !important;
  }
`, styleSheet.cssRules.length);

export default Register;