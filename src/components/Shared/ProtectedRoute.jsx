import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../services/cognito.service';

const ProtectedRoute = ({ children, requireRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location.pathname]); // Re-check when path changes

  const checkAuth = async () => {
    try {
      const user = getCurrentUser();
      
      if (user) {
        user.getSession((err, session) => {
          if (err || !session.isValid()) {
            console.log('❌ Session invalid or expired');
            setIsAuthenticated(false);
            return;
          }
          
          console.log('✅ Session valid');
          setIsAuthenticated(true);
          
          // Get role from localStorage
          const role = localStorage.getItem('userRole');
          console.log('👤 User role from localStorage:', role);
          setUserRole(role);
        });
      } else {
        console.log('❌ No user found');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('❌ Auth check error:', error);
      setIsAuthenticated(false);
    }
  };

  // Show loading state
  if (isAuthenticated === null) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('🔄 Redirecting to login (not authenticated)');
    return <Navigate to="/login" replace />;
  }

  // Check role requirement
  if (requireRole) {
    console.log('🔍 Checking role requirement:', requireRole);
    console.log('🔍 User has role:', userRole);
    
    // Client role required
    if (requireRole === 'client') {
      if (userRole !== 'client' && userRole !== 'admin') {
        console.log('🔄 Redirecting to client-access (no client role)');
        return <Navigate to="/client-access" replace />;
      }
    }
    
    // Admin role required
    if (requireRole === 'admin') {
      if (userRole !== 'admin') {
        console.log('🔄 Redirecting to admin-access (no admin role)');
        return <Navigate to="/admin-access" replace />;
      }
    }
  }

  console.log('✅ Access granted to:', location.pathname);
  return children;
};

export default ProtectedRoute;