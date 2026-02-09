import React, { useState } from 'react';
import { addFeedback, getClientMeals } from '../../services/admin.service';
import './Admin.css';

const ClientList = ({ clients, onUpdate }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [clientMeals, setClientMeals] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showMealsModal, setShowMealsModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleViewClient = (client) => {
    setSelectedClient(client);
  };

  const handleAddFeedback = (client) => {
    setSelectedClient(client);
    setFeedbackText('');
    setShowFeedbackModal(true);
  };

  const handleViewMeals = async (client) => {
    setSelectedClient(client);
    setLoading(true);
    setShowMealsModal(true);

    try {
      // Extract user ID from PK (format: USER#{id})
      const userId = client.PK.replace('USER#', '');
      const today = new Date().toISOString().split('T')[0];
      const response = await getClientMeals(userId, today);
      console.log('Client meals:', response.data);
      setClientMeals(response.data);
    } catch (error) {
      console.error('Error loading client meals:', error);
      setClientMeals(null);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = selectedClient.PK.replace('USER#', '');
      await addFeedback(userId, feedbackText);
      alert('Feedback added successfully!');
      setShowFeedbackModal(false);
      setFeedbackText('');
      onUpdate();
    } catch (error) {
      console.error('Error adding feedback:', error);
      alert('Failed to add feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: '#ffc107' };
    if (bmi < 25) return { text: 'Normal', color: '#4caf50' };
    if (bmi < 30) return { text: 'Overweight', color: '#ff9800' };
    return { text: 'Obese', color: '#f44336' };
  };

  return (
    <div className="client-list-section">
      <h2>Client List ({clients.length})</h2>

      {clients.length === 0 ? (
        <div className="no-clients">
          <p>No clients found. Clients will appear here once they enter their access code.</p>
        </div>
      ) : (
        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Weight (kg)</th>
                <th>Height (cm)</th>
                <th>BMI</th>
                <th>Daily Cal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => {
                const bmiCategory = client.bmi ? calculateBMICategory(client.bmi) : null;
                return (
                  <tr key={index}>
                    <td>{client.name || 'N/A'}</td>
                    <td>{client.email || 'N/A'}</td>
                    <td>{client.weight || 'N/A'}</td>
                    <td>{client.height || 'N/A'}</td>
                    <td>
                      {client.bmi ? (
                        <span
                          className="bmi-badge"
                          style={{ backgroundColor: bmiCategory.color }}
                        >
                          {client.bmi} ({bmiCategory.text})
                        </span>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>{client.daily_calories || 'N/A'}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-view"
                          onClick={() => handleViewClient(client)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          className="btn-action btn-meals"
                          onClick={() => handleViewMeals(client)}
                          title="View Meals"
                        >
                          🍽️
                        </button>
                        <button
                          className="btn-action btn-feedback"
                          onClick={() => handleAddFeedback(client)}
                          title="Add Feedback"
                        >
                          💬
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Client Details Modal */}
      {selectedClient && !showFeedbackModal && !showMealsModal && (
        <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Client Details</h3>
              <button className="modal-close" onClick={() => setSelectedClient(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Name:</strong>
                <span>{selectedClient.name || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Email:</strong>
                <span>{selectedClient.email || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Weight:</strong>
                <span>{selectedClient.weight || 'N/A'} kg</span>
              </div>
              <div className="detail-row">
                <strong>Height:</strong>
                <span>{selectedClient.height || 'N/A'} cm</span>
              </div>
              <div className="detail-row">
                <strong>BMI:</strong>
                <span>{selectedClient.bmi || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Daily Calories:</strong>
                <span>{selectedClient.daily_calories || 'N/A'}</span>
              </div>
              <div className="detail-row full-width">
                <strong>Fitness Goals:</strong>
                <p>{selectedClient.fitness_goals || 'No goals specified'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="modal-overlay" onClick={() => setShowFeedbackModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Feedback for {selectedClient.name}</h3>
              <button className="modal-close" onClick={() => setShowFeedbackModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={submitFeedback} className="modal-body">
              <div className="form-group">
                <label>Feedback Message</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Enter your feedback for the client..."
                  rows="6"
                  required
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meals Modal */}
      {showMealsModal && (
        <div className="modal-overlay" onClick={() => setShowMealsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Today's Meals - {selectedClient.name}</h3>
              <button className="modal-close" onClick={() => setShowMealsModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {loading ? (
                <p>Loading meals...</p>
              ) : clientMeals ? (
                <div className="meals-status">
                  <div className={`meal-status-item ${clientMeals.breakfast ? 'completed' : ''}`}>
                    <span className="meal-label">🌅 Breakfast:</span>
                    <span className="meal-check">{clientMeals.breakfast ? '✅' : '❌'}</span>
                  </div>
                  <div className={`meal-status-item ${clientMeals.lunch ? 'completed' : ''}`}>
                    <span className="meal-label">🌞 Lunch:</span>
                    <span className="meal-check">{clientMeals.lunch ? '✅' : '❌'}</span>
                  </div>
                  <div className={`meal-status-item ${clientMeals.snacks ? 'completed' : ''}`}>
                    <span className="meal-label">🍎 Snacks:</span>
                    <span className="meal-check">{clientMeals.snacks ? '✅' : '❌'}</span>
                  </div>
                  <div className={`meal-status-item ${clientMeals.dinner ? 'completed' : ''}`}>
                    <span className="meal-label">🌙 Dinner:</span>
                    <span className="meal-check">{clientMeals.dinner ? '✅' : '❌'}</span>
                  </div>
                  <div className="meals-summary">
                    <strong>Completion:</strong>{' '}
                    {Object.values(clientMeals).filter((v) => v === true).length} / 4 meals
                  </div>
                </div>
              ) : (
                <p>No meal data available for today.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;