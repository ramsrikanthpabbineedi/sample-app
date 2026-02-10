import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, signOut as cognitoSignOut, getSession } from '../services/cognito.service';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      console.log('🔍 Checking auth state...');
      const cognitoUser = getCurrentUser();

      if (cognitoUser) {
        const session = await getSession();
        
        if (session && session.isValid()) {
          const userAttributes = session.getIdToken().payload;
          
          setUser({
            id: userAttributes.sub,
            email: userAttributes.email,
            name: userAttributes.name || userAttributes.email
          });
          
          // Get role from localStorage
          const storedRole = localStorage.getItem('userRole');
          console.log('👤 Stored role:', storedRole);
          
          setUserRole(storedRole);
          setIsAuthenticated(true);
          
          console.log('✅ Auth state loaded:', { 
            user: userAttributes.email, 
            role: storedRole 
          });
        } else {
          console.log('❌ Invalid session');
          clearAuthState();
        }
      } else {
        console.log('❌ No user found');
        clearAuthState();
      }
    } catch (error) {
      console.error('❌ Auth check error:', error);
      clearAuthState();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthState = () => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userRole');
  };

  const signIn = async (email, password) => {
    // Sign in logic handled by Login component
    // After successful sign in, call checkAuthState
    await checkAuthState();
  };

  const signOut = () => {
    console.log('🚪 Signing out...');
    cognitoSignOut();
    clearAuthState();
  };

  const updateRole = (newRole) => {
    console.log('🔄 Updating role to:', newRole);
    localStorage.setItem('userRole', newRole);
    setUserRole(newRole);
  };

  const value = {
    user,
    userRole,
    isAuthenticated,
    loading,
    signIn,
    signOut,
    updateRole,
    refreshAuth: checkAuthState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};