// 📁 ai-health-app/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';

import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import AlertsDashboard from './pages/AlertsDashboard';
import DiagnosticTests from './pages/DiagnosticTests';

// 🚨 DEV ONLY: remove after seeding!
import seedAlerts from './scripts/seedAlerts';

const App = () => {
  useEffect(() => {
    seedAlerts();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Private Routes */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/alerts" element={<PrivateRoute><AlertsDashboard /></PrivateRoute>} />
          <Route path="/tests" element={<PrivateRoute><DiagnosticTests /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
