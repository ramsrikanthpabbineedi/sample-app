import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateClientCode } from '../../services/client.service';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.css';

const AdminCodeEntry = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateRole, userRole, refreshAuth } = useAuth();

  useEffect(() => {
    // If user already has admin role, redirect
    if (userRole === 'admin') {
      console.log('✅ User already has admin access, redirecting...');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanCode = code.replace('CODE#', '').trim().toUpperCase();

    try {
      console.log('📤 Validating admin code');
      
      const response = await validateClientCode(cleanCode, 'admin');
      
      console.log('📥 Response:', response.data);

      if (response.data.success && response.data.role === 'admin') {
        console.log('✅ Admin code validated!');
        
        // Update role in context
        updateRole('admin');
        
        // Refresh auth state
        await refreshAuth();
        
        // Navigate to admin dashboard
        setTimeout(() => {
          console.log('🚀 Navigating to admin dashboard...');
          navigate('/admin/dashboard', { replace: true });
        }, 200);
      }
    } catch (err) {
      console.error('❌ Admin validation error:', err);
      
      if (err.response?.status === 403) {
        setError('Invalid admin code. Access denied.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid admin code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-code-entry-container">
      <div className="admin-code-entry-card">
        <div className="admin-code-entry-header">
          <h2>🔐 Admin Access</h2>
          <p>Enter your admin code to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-code-entry-form">
          <div className="form-group">
            <label>Admin Code</label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter admin code"
              required
              className="admin-code-input"
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Validating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCodeEntry;