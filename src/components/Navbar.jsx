import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div>
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/tests">Diagnostic Tests</Link> |{' '}
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        {user && (
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;