import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AlertsDashboard from './pages/AlertsDashboard';
import DiagnosticTests from './pages/DiagnosticTests';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/alerts" element={<PrivateRoute><AlertsDashboard /></PrivateRoute>} />
        <Route path="/tests" element={<PrivateRoute><DiagnosticTests /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
