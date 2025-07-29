import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtext}>Enter your email to receive a reset link</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
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
    backgroundColor: '#f9fafb',
    padding: '16px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '12px'
  },
  subtext: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  success: {
    marginTop: '16px',
    color: '#38a169',
    fontSize: '14px'
  },
  error: {
    marginTop: '16px',
    color: '#e53e3e',
    fontSize: '14px'
  }
};

export default ForgotPassword;
