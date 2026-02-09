import React, { useState, useEffect } from 'react';
import { getFeedback } from '../../services/client.service';
import './Client.css';

const FeedbackView = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const response = await getFeedback();
      console.log('Feedback loaded:', response.data);
      setFeedback(response.data.feedback || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading feedback:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading-container">Loading feedback...</div>;
  }

  return (
    <div className="feedback-view">
      <h2>Trainer Feedback</h2>

      {feedback.length === 0 ? (
        <div className="no-feedback">
          <div className="no-feedback-icon">💬</div>
          <h3>No feedback yet</h3>
          <p>Your trainer hasn't added any feedback yet. Keep up the good work!</p>
        </div>
      ) : (
        <div className="feedback-list">
          {feedback.map((item, index) => (
            <div key={index} className="feedback-card">
              <div className="feedback-header">
                <span className="feedback-icon">👨‍🏫</span>
                <span className="feedback-date">{formatDate(item.created_at)}</span>
              </div>
              <div className="feedback-content">
                <p>{item.feedback_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackView;