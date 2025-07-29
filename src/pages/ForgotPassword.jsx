import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { FiMail, FiArrowRight, FiLoader } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Forgot Password?</h2>
          <p style={styles.subtext}>
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FiMail style={styles.inputIcon} />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !email} 
            style={{
              ...styles.button,
              ...(isLoading && styles.buttonLoading),
              ...(!email && styles.buttonDisabled)
            }}
          >
            {isLoading ? (
              <>
                <FiLoader style={styles.spinner} />
                Sending...
              </>
            ) : (
              <>
                Send Reset Link
                <FiArrowRight style={styles.buttonIcon} />
              </>
            )}
          </button>
        </form>

        {message && (
          <div style={styles.success}>
            <p style={styles.messageText}>{message}</p>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <p style={styles.messageText}>{error}</p>
          </div>
        )}

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Remember your password?{' '}
            <a href="/login" style={styles.footerLink}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    '@media (max-width: 480px)': {
      padding: '24px'
    }
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
    '@media (max-width: 480px)': {
      fontSize: '22px'
    }
  },
  subtext: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.5'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%'
  },
  inputGroup: {
    position: 'relative',
    width: '100%'
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '18px'
  },
  input: {
    width: '100%',
    padding: '12px 16px 12px 42px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    ':focus': {
      outline: 'none',
      borderColor: '#6366f1',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)'
    }
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '14px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#6366f1',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#4f46e5'
    }
  },
  buttonLoading: {
    backgroundColor: '#818cf8',
    cursor: 'not-allowed'
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e1',
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: '#cbd5e1'
    }
  },
  buttonIcon: {
    fontSize: '16px'
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    fontSize: '18px'
  },
  success: {
    marginTop: '24px',
    padding: '12px 16px',
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center'
  },
  error: {
    marginTop: '24px',
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center'
  },
  messageText: {
    margin: '0',
    lineHeight: '1.5'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0'
  },
  footerLink: {
    color: '#6366f1',
    fontWeight: '600',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
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

// Add focus styles for mobile
styleSheet.insertRule(`
  input:focus {
    outline: none;
    border-color: #6366f1 !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2) !important;
  }
`, styleSheet.cssRules.length);

export default ForgotPassword;