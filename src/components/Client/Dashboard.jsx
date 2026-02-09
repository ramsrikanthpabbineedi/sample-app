import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/client.service';
import MealTracker from './MealTracker';
import FeedbackView from './FeedbackView';
import './Client.css';

const Dashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    weight: 0,
    height: 0,
    bmi: 0,
    daily_calories: 0,
    fitness_goals: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      console.log('Profile loaded:', response.data);
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      if (error.response?.status === 403) {
        alert('Please enter your client code first');
        window.location.href = '/client-access';
      }
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const calculateBMI = () => {
    if (profile.weight && profile.height) {
      const heightInMeters = profile.height / 100;
      const bmi = (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
      setProfile({
        ...profile,
        bmi: parseFloat(bmi)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateProfile(profile);
      setMessage('Profile updated successfully! ✅');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* 3D Gym Visual */}
      <div className="gym-visual-header">
        <div className="gym-illustration">
          <div className="dumbbell">💪</div>
          <div className="trophy">🏆</div>
          <div className="fire">🔥</div>
        </div>
        <h1>Welcome, {profile.name || 'Client'}!</h1>
        <p className="dashboard-subtitle">Track your fitness journey</p>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          📊 Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'meals' ? 'active' : ''}`}
          onClick={() => setActiveTab('meals')}
        >
          🍽️ Meals
        </button>
        <button
          className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          💬 Feedback
        </button>
      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>My Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name || ''}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email || ''}
                    disabled
                    className="disabled-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight || ''}
                    onChange={handleInputChange}
                    onBlur={calculateBMI}
                    placeholder="70"
                    step="0.1"
                  />
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={profile.height || ''}
                    onChange={handleInputChange}
                    onBlur={calculateBMI}
                    placeholder="175"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>BMI</label>
                  <input
                    type="number"
                    name="bmi"
                    value={profile.bmi || ''}
                    onChange={handleInputChange}
                    placeholder="22.9"
                    step="0.1"
                  />
                  <small>
                    {profile.bmi < 18.5 && 'Underweight'}
                    {profile.bmi >= 18.5 && profile.bmi < 25 && 'Normal weight'}
                    {profile.bmi >= 25 && profile.bmi < 30 && 'Overweight'}
                    {profile.bmi >= 30 && 'Obese'}
                  </small>
                </div>
                <div className="form-group">
                  <label>Daily Calories</label>
                  <input
                    type="number"
                    name="daily_calories"
                    value={profile.daily_calories || ''}
                    onChange={handleInputChange}
                    placeholder="2000"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Fitness Goals</label>
                <textarea
                  name="fitness_goals"
                  value={profile.fitness_goals || ''}
                  onChange={handleInputChange}
                  placeholder="Describe your fitness goals (e.g., lose 10kg, build muscle, run 5k...)"
                  rows="4"
                />
              </div>

              {message && (
                <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'meals' && <MealTracker />}
        {activeTab === 'feedback' && <FeedbackView />}
      </div>
    </div>
  );
};

export default Dashboard;