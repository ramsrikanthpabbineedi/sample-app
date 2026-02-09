import React, { useState, useEffect } from 'react';
import { getMeals, updateMeals } from '../../services/client.service';
import './Client.css';

const MealTracker = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
    dinner: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMeals();
  }, [selectedDate]);

  const loadMeals = async () => {
    setLoading(true);
    try {
      const response = await getMeals(selectedDate);
      console.log('Meals loaded:', response.data);
      if (response.data) {
        setMeals({
          breakfast: response.data.breakfast || false,
          lunch: response.data.lunch || false,
          snacks: response.data.snacks || false,
          dinner: response.data.dinner || false
        });
      }
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealToggle = async (mealType) => {
    const updatedMeals = {
      ...meals,
      [mealType]: !meals[mealType]
    };

    setMeals(updatedMeals);

    try {
      await updateMeals({
        date: selectedDate,
        ...updatedMeals
      });
    } catch (error) {
      console.error('Error updating meals:', error);
      // Revert on error
      setMeals(meals);
    }
  };

  const completionPercentage = () => {
    const completed = Object.values(meals).filter(Boolean).length;
    return (completed / 4) * 100;
  };

  const mealItems = [
    { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { key: 'lunch', label: 'Lunch', icon: '🌞' },
    { key: 'snacks', label: 'Snacks', icon: '🍎' },
    { key: 'dinner', label: 'Dinner', icon: '🌙' }
  ];

  return (
    <div className="meal-tracker">
      <h2>Meal Tracker</h2>

      <div className="date-selector">
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="progress-section">
        <h3>Daily Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage()}%` }}
          >
            {completionPercentage()}%
          </div>
        </div>
        <p className="progress-text">
          {Object.values(meals).filter(Boolean).length} of 4 meals completed
        </p>
      </div>

      {loading ? (
        <div className="loading-meals">Loading meals...</div>
      ) : (
        <div className="meals-grid">
          {mealItems.map((item) => (
            <div
              key={item.key}
              className={`meal-card ${meals[item.key] ? 'completed' : ''}`}
              onClick={() => handleMealToggle(item.key)}
            >
              <div className="meal-icon">{item.icon}</div>
              <h3>{item.label}</h3>
              <div className="meal-checkbox">
                {meals[item.key] ? '✅' : '⬜'}
              </div>
              <p className="meal-status">
                {meals[item.key] ? 'Completed' : 'Not completed'}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="meal-tips">
        <h3>💡 Meal Tips</h3>
        <ul>
          <li>Stay consistent with your meal timing</li>
          <li>Include protein in every meal</li>
          <li>Stay hydrated throughout the day</li>
          <li>Track your meals daily for best results</li>
        </ul>
      </div>
    </div>
  );
};

export default MealTracker;