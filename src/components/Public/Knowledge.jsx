import React from 'react';
import './Public.css';

const Knowledge = () => {
  const tips = [
    {
      category: 'Nutrition',
      title: 'Protein Intake',
      content: 'Consume 1.6-2.2g of protein per kg of bodyweight for optimal muscle growth and recovery.'
    },
    {
      category: 'Training',
      title: 'Progressive Overload',
      content: 'Gradually increase weight, reps, or volume over time to continue making gains.'
    },
    {
      category: 'Recovery',
      title: 'Sleep Quality',
      content: 'Aim for 7-9 hours of quality sleep per night for optimal muscle recovery and hormone regulation.'
    },
    {
      category: 'Nutrition',
      title: 'Meal Timing',
      content: 'Eat protein within 2 hours post-workout to maximize muscle protein synthesis.'
    },
    {
      category: 'Training',
      title: 'Compound Movements',
      content: 'Focus on squats, deadlifts, bench press, and rows for maximum muscle development.'
    },
    {
      category: 'Mindset',
      title: 'Consistency Over Perfection',
      content: 'Being consistent with 80% effort beats being perfect 20% of the time.'
    }
  ];

  const workoutPrinciples = [
    {
      principle: 'Volume',
      description: 'Total sets x reps x weight. Aim for 10-20 sets per muscle group per week.'
    },
    {
      principle: 'Intensity',
      description: 'Train with weights that challenge you in the 6-12 rep range for hypertrophy.'
    },
    {
      principle: 'Frequency',
      description: 'Train each muscle group 2-3 times per week for optimal growth.'
    },
    {
      principle: 'Rest',
      description: 'Rest 48-72 hours between training the same muscle group.'
    }
  ];

  return (
    <div className="public-page">
      <div className="public-header">
        <h1>Fitness Knowledge Hub</h1>
        <p>Evidence-Based Training & Nutrition Advice</p>
      </div>

      <div className="knowledge-content">
        <section className="knowledge-section">
          <h2>Essential Fitness Tips</h2>
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-category">{tip.category}</div>
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="knowledge-section">
          <h2>Training Principles</h2>
          <div className="principles-list">
            {workoutPrinciples.map((item, index) => (
              <div key={index} className="principle-item">
                <h3>{item.principle}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="knowledge-section">
          <h2>Nutrition Guidelines</h2>
          <div className="nutrition-info">
            <div className="macro-card">
              <h3>Macronutrient Split</h3>
              <ul>
                <li><strong>Protein:</strong> 25-35% of total calories</li>
                <li><strong>Carbohydrates:</strong> 40-50% of total calories</li>
                <li><strong>Fats:</strong> 20-30% of total calories</li>
              </ul>
            </div>

            <div className="macro-card">
              <h3>Daily Calorie Calculation</h3>
              <ul>
                <li><strong>Maintenance:</strong> Bodyweight (kg) × 33</li>
                <li><strong>Cutting:</strong> Maintenance - 300-500 calories</li>
                <li><strong>Bulking:</strong> Maintenance + 300-500 calories</li>
              </ul>
            </div>

            <div className="macro-card">
              <h3>Hydration</h3>
              <ul>
                <li><strong>Daily:</strong> Bodyweight (kg) × 35ml water</li>
                <li><strong>During Training:</strong> +500-1000ml extra</li>
                <li><strong>Indicator:</strong> Urine should be pale yellow</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="knowledge-section">
          <h2>Common Mistakes to Avoid</h2>
          <div className="mistakes-list">
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div>
                <h4>Skipping Warm-up</h4>
                <p>Always warm up for 5-10 minutes to prevent injuries</p>
              </div>
            </div>
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div>
                <h4>Neglecting Form</h4>
                <p>Perfect form prevents injuries and maximizes results</p>
              </div>
            </div>
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div>
                <h4>Overtraining</h4>
                <p>More is not always better - recovery is when growth happens</p>
              </div>
            </div>
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div>
                <h4>Inconsistent Diet</h4>
                <p>Nutrition matters every day, not just on training days</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Knowledge;