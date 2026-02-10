import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, userRole, isAuthenticated, signOut, loading } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('🔄 Navigation state updated:', { 
      isAuthenticated, 
      userRole,
      user: user?.email 
    });
  }, [isAuthenticated, userRole, user]);

  const handleLogout = () => {
    signOut();
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Handle logo click with conditional navigation
  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu();
    
    if (isAuthenticated) {
      // If logged in, go to journey page (or any default home page)
      navigate('/journey');
    } else {
      // If not logged in, go to login page
      navigate('/login');
    }
  };

  // Don't show navigation on auth pages
  const authPages = ['/login', '/signup', '/verify-email'];
  if (authPages.includes(location.pathname)) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <nav className="navigation">
        <div className="nav-container">
          <a href="/" onClick={handleLogoClick} className="nav-logo">
            💪 FitnessTracker
          </a>
          <div className="nav-loading">Loading...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo with conditional navigation */}
        <a href="/" onClick={handleLogoClick} className="nav-logo">
          💪 FitnessTracker
        </a>

        <button className="nav-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              {/* Public Pages */}
              <li className="nav-item">
                <Link to="/journey" className="nav-link" onClick={closeMenu}>
                  Journey
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rewards" className="nav-link" onClick={closeMenu}>
                  Rewards
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/knowledge" className="nav-link" onClick={closeMenu}>
                  Knowledge
                </Link>
              </li>

              {/* Client Access */}
              {userRole === 'client' || userRole === 'admin' ? (
                <li className="nav-item">
                  <Link 
                    to="/client/dashboard" 
                    className="nav-link nav-link-highlight" 
                    onClick={closeMenu}
                  >
                    📊 Client Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link 
                    to="/client-access" 
                    className="nav-link nav-link-highlight" 
                    onClick={closeMenu}
                  >
                    🔐 Get Client Access
                  </Link>
                </li>
              )}

              {/* Admin Access */}
              {userRole === 'admin' ? (
                <li className="nav-item">
                  <Link 
                    to="/admin/dashboard" 
                    className="nav-link nav-link-admin" 
                    onClick={closeMenu}
                  >
                    👨‍🏫 Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link 
                    to="/admin-access" 
                    className="nav-link" 
                    onClick={closeMenu}
                  >
                    Admin Access
                  </Link>
                </li>
              )}

              {/* User Info & Logout */}
              <li className="nav-item nav-user-info">
                <span className="nav-username">{user?.name || user?.email}</span>
                {userRole && (
                  <span className="nav-role-badge">{userRole}</span>
                )}
              </li>

              <li className="nav-item">
                <button className="nav-link nav-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link nav-link-highlight" onClick={closeMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;