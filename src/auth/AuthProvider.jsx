import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setLoading(true);
        setError(null);
        
        if (currentUser) {
          // Fetch additional user data from Firestore
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              setUserData({
                uid: currentUser.uid,
                firstName: data.firstName || '',
                middleName: data.middleName || '',
                lastName: data.lastName || '',
                email: data.email || currentUser.email,
                preferences: data.preferences || {
                  notifications: true,
                  threshold: 5
                },
                // Include any other fields you might need
                ...data // Spread any additional fields from Firestore
              });
            } else {
              // Handle case where user document doesn't exist
              setUserData({
                uid: currentUser.uid,
                firstName: '',
                middleName: '',
                lastName: '',
                email: currentUser.email,
                preferences: {
                  notifications: true,
                  threshold: 5
                }
              });
            }
          } catch (firestoreError) {
            console.error("Error fetching user data:", firestoreError);
            setError(firestoreError);
            // Still set basic user data even if Firestore fails
            setUserData({
              uid: currentUser.uid,
              firstName: '',
              middleName: '',
              lastName: '',
              email: currentUser.email,
              preferences: {
                notifications: true,
                threshold: 5
              }
            });
          }
        } else {
          // User is signed out
          setUserData(null);
        }
        
        setUser(currentUser);
      } catch (authError) {
        console.error("Auth state change error:", authError);
        setError(authError);
        setUser(null);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userData,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};