import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../auth/AuthProvider';
import { FiAlertCircle, FiActivity, FiUser, FiLogOut, FiHome } from 'react-icons/fi';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Format the user display name
  const getUserDisplay = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user?.firstName) {
      return user.firstName;
    } else if (user?.lastName) {
      return user.lastName;
    }
    return user?.email || '';
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logo}>HealthMonitor</Link>
      </div>
      
      <div style={styles.navLinks}>
        <Link to="/alerts" style={styles.navLink}>
          <FiAlertCircle style={styles.navIcon} />
          <span style={styles.navText}>Alerts</span>
        </Link>
        <Link to="/tests" style={styles.navLink}>
          <FiActivity style={styles.navIcon} />
          <span style={styles.navText}>Tests</span>
        </Link>
        <Link to="/profile" style={styles.navLink}>
          <FiUser style={styles.navIcon} />
          <span style={styles.navText}>Profile</span>
        </Link>
      </div>
      
      {user && (
        <div style={styles.userSection}>
          <span style={styles.userName}>{getUserDisplay()}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <FiLogOut style={styles.logoutIcon} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#3182ce',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#4a5568',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
  },
  navIcon: {
    fontSize: '1.2rem',
  },
  navText: {
    marginLeft: '0.5rem',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  userName: {
    fontSize: '0.875rem',
    color: '#4a5568',
    fontWeight: 500,
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid #e2e8f0',
    color: '#e53e3e',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
};

// Add hover effects
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  [style*="navLink"]:hover {
    background-color: #ebf8ff;
    color: #3182ce;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  [style*="logoutButton"]:hover {
    background-color: #fff5f5;
    border-color: #fed7d7;
  }
`, styleSheet.cssRules.length);

export default Navbar;