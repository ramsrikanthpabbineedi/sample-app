import React from 'react';
import './Public.css';

const Rewards = () => {
  const achievements = [
    {
      year: 2023,
      title: 'Regional Bodybuilding Champion',
      description: 'First place in Men\'s Physique category',
      icon: '🏆'
    },
    {
      year: 2023,
      title: 'Certified Personal Trainer',
      description: 'ACE Certified Personal Trainer',
      icon: '📜'
    },
    {
      year: 2022,
      title: 'Nutrition Specialist',
      description: 'Certified Sports Nutrition Specialist',
      icon: '🥗'
    },
    {
      year: 2021,
      title: 'State Championship - 3rd Place',
      description: 'Bronze medal in bodybuilding competition',
      icon: '🥉'
    },
    {
      year: 2021,
      title: 'Transformation Coach Award',
      description: 'Recognized for outstanding client results',
      icon: '⭐'
    },
    {
      year: 2020,
      title: 'First Competition Participation',
      description: 'Completed first bodybuilding show',
      icon: '💪'
    }
  ];

  const certifications = [
    'ACE Certified Personal Trainer',
    'Sports Nutrition Specialist',
    'Functional Training Specialist',
    'Corrective Exercise Specialist',
    'First Aid & CPR Certified'
  ];

  return (
    <div className="public-page">
      <div className="public-header">
        <h1>Achievements & Certifications</h1>
        <p>Milestones in My Fitness Career</p>
      </div>

      <div className="rewards-content">
        <section className="rewards-section">
          <h2>Competition Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-year">{achievement.year}</div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rewards-section">
          <h2>Professional Certifications</h2>
          <div className="certifications-list">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <span className="cert-checkmark">✓</span>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rewards-section">
          <h2>Client Success Stories</h2>
          <div className="stats-showcase">
            <div className="success-stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Clients Trained</div>
            </div>
            <div className="success-stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">Kg Total Weight Lost</div>
            </div>
            <div className="success-stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rewards;