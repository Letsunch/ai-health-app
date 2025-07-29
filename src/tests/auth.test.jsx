import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import PrivateRoute from '../auth/PrivateRoute';
import { AuthContext } from '../auth/AuthProvider';

describe('🔐 PrivateRoute', () => {
  it('✅ renders child component if user is authenticated', () => {
    const fakeUser = { uid: '123', email: 'test@example.com' };

    render(
      <AuthContext.Provider value={{ user: fakeUser }}>
        <MemoryRouter initialEntries={['/profile']}>
          <Routes>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <h1>Protected Page</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Protected Page')).toBeInTheDocument();
  });

  it('🚫 redirects to /login if user is not authenticated', () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter initialEntries={['/profile']}>
          <Routes>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <h1>Protected Page</h1>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
