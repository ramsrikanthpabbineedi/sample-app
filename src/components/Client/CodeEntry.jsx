import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateClientCode } from '../../services/client.service';
import { useAuth } from '../../contexts/AuthContext';
import './Client.css';

const CodeEntry = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateRole, userRole, refreshAuth } = useAuth();

  useEffect(() => {
    // If user already has client role, redirect
    if (userRole === 'client' || userRole === 'admin') {
      console.log('✅ User already has client access, redirecting...');
      navigate('/client/dashboard', { replace: true });
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const cleanCode = code.replace('CODE#', '').trim().toUpperCase();

    try {
      console.log('📤 Validating client code');
      
      const response = await validateClientCode(cleanCode, 'client');
      
      console.log('📥 Response:', response.data);

      if (response.data && response.data.success) {
        const assignedRole = response.data.role;
        
        console.log('✅ Code validated! Role:', assignedRole);
        
        // Update role in context
        updateRole(assignedRole);
        
        // Refresh auth state
        await refreshAuth();
        
        // Navigate to dashboard
        setTimeout(() => {
          console.log('🚀 Navigating to dashboard...');
          navigate('/client/dashboard', { replace: true });
        }, 200);
        
      } else {
        setError('Validation failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Validation error:', err);
      
      if (err.response?.status === 400) {
        setError('Invalid client code. Please contact your trainer.');
      } else if (err.response?.status === 403) {
        setError('Access denied. Invalid client code.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to validate code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-entry-container">
      <div className="code-entry-card">
        <div className="code-entry-header">
          <h2>🔐 Client Access</h2>
          <p>Enter your client code to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="code-entry-form">
          <div className="form-group">
            <label>Client Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter your code"
              required
              className="code-input"
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Validating...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="code-entry-info">
          <p><strong>Benefits:</strong></p>
          <ul style={{ textAlign: 'left', paddingLeft: '20px', marginTop: '10px' }}>
            <li>Track your fitness progress</li>
            <li>Monitor daily nutrition</li>
            <li>Receive trainer feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeEntry;