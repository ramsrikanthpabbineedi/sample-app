import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireRole }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute check:', { 
    path: location.pathname,
    isAuthenticated, 
    userRole, 
    requireRole,
    loading 
  });

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('🔄 Not authenticated, redirecting to login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check role requirement
  if (requireRole) {
    console.log('🔍 Checking role requirement:', requireRole, 'vs', userRole);
    
    // Client role required
    if (requireRole === 'client') {
      if (userRole !== 'client' && userRole !== 'admin') {
        console.log('🔄 No client access, redirecting to code entry');
        return <Navigate to="/client-access" replace />;
      }
    }
    
    // Admin role required
    if (requireRole === 'admin') {
      if (userRole !== 'admin') {
        console.log('🔄 No admin access, redirecting to code entry');
        return <Navigate to="/admin-access" replace />;
      }
    }
  }

  console.log('✅ Access granted to:', location.pathname);
  return children;
};

export default ProtectedRoute;