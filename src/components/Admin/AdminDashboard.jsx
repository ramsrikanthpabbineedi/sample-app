import React, { useState, useEffect } from 'react';
import { getAllClients } from '../../services/admin.service';
import ClientList from './ClientList';
import './Admin.css';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClients: 0,
    activeToday: 0
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await getAllClients();
      console.log('Clients loaded:', response.data);
      const clientList = response.data.clients || [];
      setClients(clientList);
      
      setStats({
        totalClients: clientList.length,
        activeToday: 0 // Can be calculated based on meal tracking
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading clients:', error);
      if (error.response?.status === 403) {
        alert('Admin access required. Please enter admin code first.');
        window.location.href = '/admin-access';
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1>👨‍🏫 Trainer Dashboard</h1>
        <p>Manage and monitor your clients</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Clients</h3>
            <p className="stat-number">{stats.totalClients}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>Active Today</h3>
            <p className="stat-number">{stats.activeToday}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Completion Rate</h3>
            <p className="stat-number">
              {stats.totalClients > 0
                ? Math.round((stats.activeToday / stats.totalClients) * 100)
                : 0}%
            </p>
          </div>
        </div>
      </div>

      <ClientList clients={clients} onUpdate={loadClients} />
    </div>
  );
};

export default AdminDashboard;