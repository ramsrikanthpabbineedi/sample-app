import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut, getCurrentUser } from '../../services/cognito.service';
import './Navigation.css';

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location]);

  const checkAuth = () => {
    const user = getCurrentUser();
    setIsAuthenticated(!!user);
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  };

  const handleLogout = () => {
    signOut();
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Don't show navigation on auth pages
  const authPages = ['/login', '/signup', '/verify-email'];
  if (authPages.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          💪 FitnessTracker
        </Link>

        <button className="nav-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
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

              {/* Client Menu */}
              {(userRole === 'client' || userRole === 'admin') && (
                <li className="nav-item">
                  <Link to="/client/dashboard" className="nav-link nav-link-highlight" onClick={closeMenu}>
                    📊 My Dashboard
                  </Link>
                </li>
              )}

              {!userRole && (
                <li className="nav-item">
                  <Link to="/client-access" className="nav-link nav-link-highlight" onClick={closeMenu}>
                    🔐 Client Access
                  </Link>
                </li>
              )}

              {/* Admin Menu */}
              {userRole === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-link nav-link-admin" onClick={closeMenu}>
                    👨‍🏫 Admin
                  </Link>
                </li>
              )}

              {!userRole && (
                <li className="nav-item">
                  <Link to="/admin-access" className="nav-link" onClick={closeMenu}>
                    Admin Login
                  </Link>
                </li>
              )}

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