import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Components
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import VerifyEmail from './components/Auth/VerifyEmail';

// Public Components
import Journey from './components/Public/Journey';
import Rewards from './components/Public/Rewards';
import Knowledge from './components/Public/Knowledge';

// Client Components
import CodeEntry from './components/Client/CodeEntry';
import ClientDashboard from './components/Client/Dashboard';

// Admin Components
import AdminCodeEntry from './components/Admin/AdminCodeEntry';
import AdminDashboard from './components/Admin/AdminDashboard';

// Shared Components
import ProtectedRoute from './components/Shared/ProtectedRoute';
import Navigation from './components/Shared/Navigation';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Public Routes (Protected - requires login) */}
          <Route
            path="/journey"
            element={
              <ProtectedRoute>
                <Journey />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rewards"
            element={
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/knowledge"
            element={
              <ProtectedRoute>
                <Knowledge />
              </ProtectedRoute>
            }
          />

          {/* Client Routes */}
          <Route
            path="/client-access"
            element={
              <ProtectedRoute>
                <CodeEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/dashboard"
            element={
              <ProtectedRoute requireRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-access"
            element={
              <ProtectedRoute>
                <AdminCodeEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;