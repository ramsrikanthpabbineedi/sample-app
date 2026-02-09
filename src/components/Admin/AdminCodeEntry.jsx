import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateClientCode } from '../../services/client.service';
import './Admin.css';

const AdminCodeEntry = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await validateClientCode(code, 'admin');
      console.log('Admin code validation response:', response.data);

      if (response.data.success && response.data.role === 'admin') {
        localStorage.setItem('userRole', 'admin');
        alert('Admin access granted!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Admin code validation error:', err);
      if (err.response?.status === 403) {
        setError('This admin code is not assigned to your account.');
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
          <p>Enter the admin code to access the trainer dashboard</p>
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
            />
            <small>This is your secure trainer access code</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Validating...' : 'Access Admin Dashboard'}
          </button>
        </form>

        <div className="admin-security-notice">
          <p>⚠️ <strong>Security Notice:</strong></p>
          <p>This area is restricted to authorized trainers only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminCodeEntry;