import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');

    try {
      await signInWithPopup(auth, googleProvider);
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
          <h2 style={styles.loginTitle}>Sign in to your account</h2>
          <p style={styles.loginSubheader}>
            Or{' '}
            <Link to="/register" style={styles.loginLink}>
              start your 14-day free trial
            </Link>
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

        <div style={styles.socialLoginContainer}>
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            style={styles.googleButton}
          >
            {isGoogleLoading ? (
              <>
                <svg style={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in with Google...
              </>
            ) : (
              <>
                <svg style={styles.googleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <div style={styles.dividerText}>or</div>
          <div style={styles.dividerLine}></div>
        </div>

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
              <Link to="/forgot-password" style={styles.loginLink}>
                Forgot your password?
              </Link>
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
          <Link to="/register" style={styles.loginLink}>
            Sign up
          </Link>
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
  socialLoginContainer: {
    marginBottom: '24px'
  },
  googleButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    color: '#4a5568',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    height: '40px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f8fafc'
    }
  },
  googleIcon: {
    height: '20px',
    width: '20px',
    marginRight: '12px'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px'
  },
  dividerLine: {
    flex: '1',
    height: '1px',
    backgroundColor: '#e2e8f0'
  },
  dividerText: {
    padding: '0 16px',
    fontSize: '14px',
    color: '#718096'
  },
  loginForm: {
    marginTop: '0'
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
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#4a5568',
    backgroundColor: 'white'
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
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    marginRight: '8px',
    cursor: 'pointer'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#1a202c',
    cursor: 'pointer'
  },
  forgotPassword: {
    fontSize: '14px'
  },
  submitButtonContainer: {
    marginTop: '16px'
  },
  submitButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    color: 'white',
    backgroundColor: '#667eea',
    cursor: 'pointer',
    border: 'none',
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
    textDecoration: 'none'
  },
  signupLink: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#4a5568',
    marginTop: '16px'
  }
};

// Add spinner keyframes
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Login;