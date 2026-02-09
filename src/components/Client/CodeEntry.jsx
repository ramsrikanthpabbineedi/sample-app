import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateClientCode } from '../../services/client.service';
import { getSession } from '../../services/cognito.service';
import './Client.css';

const CodeEntry = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    checkExistingRole();
  }, []);

  const checkAuthentication = async () => {
    try {
      const session = await getSession();
      console.log('✅ Authenticated successfully');
      setDebugInfo('✅ You are logged in');
    } catch (err) {
      console.error('❌ Not authenticated:', err);
      setDebugInfo('❌ Authentication error - please login again');
      setError('Please login first');
    }
  };

  const checkExistingRole = () => {
    const existingRole = localStorage.getItem('userRole');
    if (existingRole === 'client' || existingRole === 'admin') {
      console.log('User already has role:', existingRole);
      setDebugInfo(`ℹ️ You already have ${existingRole} access`);
      // Optionally auto-redirect
      // navigate('/client/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Clean the code - remove CODE# prefix if user typed it
    const cleanCode = code.replace('CODE#', '').trim().toUpperCase();
    
    setDebugInfo(`Validating code: "${cleanCode}"`);

    try {
      console.log('📤 Sending validation request...');
      console.log('Code:', cleanCode);
      
      const response = await validateClientCode(cleanCode, 'client');
      
      console.log('📥 Full Response:', response);
      console.log('Response Data:', response.data);
      console.log('Success:', response.data.success);
      console.log('Role:', response.data.role);

      if (response.data && response.data.success) {
        const assignedRole = response.data.role;
        
        console.log('✅ Code validated! Role assigned:', assignedRole);
        
        // Store role in localStorage
        localStorage.setItem('userRole', assignedRole);
        
        // Verify it was stored
        const storedRole = localStorage.getItem('userRole');
        console.log('✅ Role stored in localStorage:', storedRole);
        
        setDebugInfo(`✅ Success! Role: ${assignedRole}`);
        
        // Small delay to ensure state updates
        setTimeout(() => {
          console.log('🚀 Navigating to dashboard...');
          navigate('/client/dashboard', { replace: true });
          
          // Force page refresh if navigation doesn't work
          setTimeout(() => {
            window.location.href = '/client/dashboard';
          }, 500);
        }, 100);
        
      } else {
        setError('Validation response was not successful');
        setDebugInfo('❌ Validation failed');
        console.error('Unexpected response format:', response.data);
      }
    } catch (err) {
      console.error('❌ Full error:', err);
      console.error('Error response:', err.response);
      
      let errorMessage = 'Failed to validate code. ';
      let debugMessage = '';

      if (err.response) {
        debugMessage = `Status: ${err.response.status}`;
        
        if (err.response.status === 400) {
          errorMessage = `The code "${cleanCode}" was not found. Please check with your trainer.`;
        } else if (err.response.status === 403) {
          errorMessage = 'Access denied. Invalid client code.';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        errorMessage = 'No response from server.';
        debugMessage = 'Network error';
      } else {
        errorMessage = err.message;
        debugMessage = 'Request failed';
      }

      setError(errorMessage);
      setDebugInfo(`❌ ${debugMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-entry-container">
      <div className="code-entry-card">
        <div className="code-entry-header">
          <h2>🔐 Client Access</h2>
          <p>Enter your personal client code to access your dashboard</p>
        </div>

        {/* Debug Info Panel */}
        <div style={{
          padding: '10px',
          background: '#f0f0f0',
          borderRadius: '5px',
          marginBottom: '20px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <strong>Debug Info:</strong><br/>
          API: {process.env.REACT_APP_API_GATEWAY_URL || 'NOT SET'}<br/>
          Current Role: {localStorage.getItem('userRole') || 'none'}<br/>
          Status: {debugInfo}
        </div>

        <form onSubmit={handleSubmit} className="code-entry-form">
          <div className="form-group">
            <label>Client Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter: FITNESS2024"
              required
              className="code-input"
            />
            <small>Enter code WITHOUT the CODE# prefix</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Validating...' : 'Validate Code'}
          </button>
        </form>

        <div className="code-entry-info">
          <p><strong>What you'll get access to:</strong></p>
          <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <li>Personal fitness dashboard</li>
            <li>Track your weight, BMI, and goals</li>
            <li>Daily meal tracking</li>
            <li>Feedback from your trainer</li>
          </ul>
        </div>

        {/* Test Navigation Button */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => {
              console.log('Test navigation clicked');
              localStorage.setItem('userRole', 'client');
              navigate('/client/dashboard');
            }}
            style={{
              padding: '10px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🧪 Test Direct Navigation (Debug)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEntry;