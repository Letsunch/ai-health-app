import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
          <h2 style={styles.loginTitle}>Sign in to your account</h2>
          <p style={styles.loginSubheader}>
            Or{' '}
            <a href="#" style={styles.loginLink}>
              start your 14-day free trial
            </a>
          </p>
        </div>
        
        {error && (
          <div style={styles.errorMessage}>
            <div style={styles.errorContent}>
              <div style={styles.errorIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={styles.errorIconSvg}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={styles.errorText}>
                <p style={styles.errorTextP}>{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form style={styles.loginForm} onSubmit={handleLogin}>
          <div style={styles.formInputs}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.inputLabel}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputField}
                placeholder="you@example.com"
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.inputLabel}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div style={styles.formOptions}>
            <div style={styles.rememberMe}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                style={styles.checkbox}
              />
              <label htmlFor="remember-me" style={styles.checkboxLabel}>
                Remember me
              </label>
            </div>

            <div style={styles.forgotPassword}>
              <a href="#" style={styles.loginLink}>
                Forgot your password?
              </a>
            </div>
          </div>

          <div style={styles.submitButtonContainer}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonLoading : {})
              }}
            >
              {isLoading ? (
                <>
                  <svg style={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
        
        <div style={styles.signupLink}>
          Don't have an account?{' '}
          <a href="#" style={styles.loginLink}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

// All styles in a single object
const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: '16px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
  },
  loginCard: {
    maxWidth: '448px',
    width: '100%',
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  loginTitle: {
    margin: '0',
    fontSize: '30px',
    fontWeight: '800',
    color: '#1a202c',
    lineHeight: '1.25'
  },
  loginSubheader: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#4a5568',
    lineHeight: '1.5'
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    borderLeft: '4px solid #f56565',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '4px'
  },
  errorContent: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  errorIcon: {
    flexShrink: '0',
    marginTop: '2px'
  },
  errorIconSvg: {
    height: '20px',
    width: '20px',
    color: '#f56565'
  },
  errorText: {
    marginLeft: '12px'
  },
  errorTextP: {
    margin: '0',
    fontSize: '14px',
    color: '#b91c1c',
    lineHeight: '1.5'
  },
  loginForm: {
    marginTop: '32px'
  },
  formInputs: {
    marginBottom: '24px'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  inputLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
    marginBottom: '8px',
    lineHeight: '1.5'
  },
  inputField: {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#4a5568',
    backgroundColor: 'white',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
  },
  formOptions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    height: '16px',
    width: '16px',
    color: '#667eea',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    marginRight: '8px',
    cursor: 'pointer'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#1a202c',
    lineHeight: '1.5',
    cursor: 'pointer'
  },
  forgotPassword: {
    fontSize: '14px'
  },
  submitButtonContainer: {
    marginTop: '16px'
  },
  submitButton: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    border: '1px solid transparent',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    color: 'white',
    backgroundColor: '#667eea',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    height: '40px'
  },
  submitButtonLoading: {
    opacity: '0.75',
    cursor: 'not-allowed'
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    height: '20px',
    width: '20px',
    marginRight: '12px'
  },
  spinnerCircle: {
    opacity: '0.25',
    stroke: 'currentColor'
  },
  spinnerPath: {
    opacity: '0.75',
    fill: 'currentColor'
  },
  loginLink: {
    color: '#667eea',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.15s ease-in-out'
  },
  signupLink: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#4a5568',
    marginTop: '16px',
    lineHeight: '1.5'
  },
  // Keyframes for spinner animation
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  }
};

// Add the animation to the document's styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Login;