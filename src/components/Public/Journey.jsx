import React from 'react';
import './Public.css';

const Journey = () => {
  return (
    <div className="public-page">
      <div className="public-header">
        <h1>My Fitness Journey</h1>
        <p>Transformation Through Dedication</p>
      </div>

      <div className="journey-content">
        <section className="journey-section">
          <h2>How It All Started</h2>
          <p>
            My fitness journey began in 2020 when I decided to take control of my health
            and well-being. What started as a simple goal to lose weight transformed into
            a passion for bodybuilding and helping others achieve their fitness goals.
          </p>
        </section>

        <section className="journey-section">
          <h2>The Transformation</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Starting Weight</h3>
              <p className="stat-number">95 kg</p>
            </div>
            <div className="stat-card">
              <h3>Current Weight</h3>
              <p className="stat-number">78 kg</p>
            </div>
            <div className="stat-card">
              <h3>Body Fat</h3>
              <p className="stat-number">12%</p>
            </div>
            <div className="stat-card">
              <h3>Years Training</h3>
              <p className="stat-number">4+</p>
            </div>
          </div>
        </section>

        <section className="journey-section">
          <h2>Key Milestones</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h4>The Beginning</h4>
                <p>Started my fitness journey, joined a gym, learned the basics</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h4>First Competition</h4>
                <p>Competed in my first bodybuilding competition, placed 3rd</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h4>Became a Trainer</h4>
                <p>Got certified and started coaching clients</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h4>Championship Win</h4>
                <p>Won regional bodybuilding championship</p>
              </div>
            </div>
          </div>
        </section>

        <section className="journey-section">
          <h2>My Philosophy</h2>
          <blockquote className="philosophy-quote">
            "Fitness is not about being better than someone else. It's about being better
            than you used to be. Every day is an opportunity to improve, to grow stronger,
            and to inspire others through your dedication."
          </blockquote>
        </section>
      </div>
    </div>
  );
};

export default Journey;