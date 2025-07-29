import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../auth/AuthProvider';
import { FiAlertCircle, FiActivity, FiUser, FiLogOut, FiHome, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logo}>HealthMonitor</Link>
        <button 
          onClick={toggleMobileMenu}
          style={styles.mobileMenuButton}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      <div style={{
        ...styles.navLinks,
        ...(mobileMenuOpen ? styles.navLinksMobileOpen : {}),
        ...(!mobileMenuOpen ? styles.navLinksMobileClosed : {})
      }}>
        <Link 
          to="/alerts" 
          style={styles.navLink}
          onClick={() => setMobileMenuOpen(false)}
        >
          <FiAlertCircle style={styles.navIcon} />
          <span style={styles.navText}>Alerts</span>
        </Link>
        <Link 
          to="/tests" 
          style={styles.navLink}
          onClick={() => setMobileMenuOpen(false)}
        >
          <FiActivity style={styles.navIcon} />
          <span style={styles.navText}>Tests</span>
        </Link>
        <Link 
          to="/profile" 
          style={styles.navLink}
          onClick={() => setMobileMenuOpen(false)}
        >
          <FiUser style={styles.navIcon} />
          <span style={styles.navText}>Profile</span>
        </Link>
      </div>
      
      {user && (
        <div style={{
          ...styles.userSection,
          ...(mobileMenuOpen ? styles.userSectionMobileOpen : {}),
          ...(!mobileMenuOpen ? styles.userSectionMobileClosed : {})
        }}>
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
    padding: '1rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    flexWrap: 'wrap',
    '@media (min-width: 768px)': {
      padding: '1rem 2rem',
      flexWrap: 'nowrap',
    }
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    '@media (min-width: 768px)': {
      width: 'auto',
      justifyContent: 'flex-start',
    }
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#3182ce',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 768px)': {
      fontSize: '1.5rem',
    }
  },
  mobileMenuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4a5568',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    '@media (min-width: 768px)': {
      display: 'none',
    }
  },
  navLinks: {
    display: 'none',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: '1rem',
    '@media (min-width: 768px)': {
      display: 'flex',
      flexDirection: 'row',
      gap: '2rem',
      alignItems: 'center',
      width: 'auto',
      marginTop: 0,
    }
  },
  navLinksMobileOpen: {
    display: 'flex',
  },
  navLinksMobileClosed: {
    display: 'none',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#4a5568',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
    width: '100%',
    '@media (min-width: 768px)': {
      width: 'auto',
      padding: '0.5rem 1rem',
    }
  },
  navIcon: {
    fontSize: '1.2rem',
  },
  navText: {
    marginLeft: '0.5rem',
  },
  userSection: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
    width: '100%',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    '@media (min-width: 768px)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1.5rem',
      width: 'auto',
      marginTop: 0,
      paddingTop: 0,
      borderTop: 'none',
    }
  },
  userSectionMobileOpen: {
    display: 'flex',
  },
  userSectionMobileClosed: {
    display: 'none',
  },
  userName: {
    fontSize: '0.875rem',
    color: '#4a5568',
    fontWeight: 500,
    padding: '0.5rem 1rem',
    '@media (min-width: 768px)': {
      padding: 0,
    }
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid #e2e8f0',
    color: '#e53e3e',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    width: '100%',
    '@media (min-width: 768px)': {
      width: 'auto',
      padding: '0.5rem 1rem',
    }
  },
};

// Add hover effects
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @media (hover: hover) {
    [style*="navLink"]:hover {
      background-color: #ebf8ff;
      color: #3182ce;
    }
    [style*="logoutButton"]:hover {
      background-color: #fff5f5;
      border-color: #fed7d7;
    }
  }
`, styleSheet.cssRules.length);

export default Navbar;