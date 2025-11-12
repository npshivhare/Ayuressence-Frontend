// components/patient/ViewDietChart.jsx
import { useState, useEffect } from 'react';
import { getPatientDietCharts } from '../../services/api';
import { formatDate } from '../../utils/helpers';
import '../../styles/patient.css';

function ViewDietChart({ user }) {
  const [dietCharts, setDietCharts] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDietCharts();
  }, [user.profileId]);

  const fetchDietCharts = async () => {
    try {
      const response = await getPatientDietCharts(user.profileId);
      setDietCharts(response.data);
      if (response.data.length > 0) {
        setSelectedChart(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching diet charts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading diet charts...</div>;
  }

  if (dietCharts.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">My Diet Chart</h1>
          <p className="page-subtitle">View your personalized Ayurvedic diet plans</p>
        </div>
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Diet Charts Yet</h3>
            <p>Your dietitian will create a personalized diet chart for you after your consultation</p>
          </div>
        </div>
      </div>
    );
  }

  const dayMeals = selectedChart ? selectedChart.meals.filter(m => m.dayNumber === selectedDay) : [];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Diet Chart</h1>
        <p className="page-subtitle">Follow your personalized Ayurvedic meal plan</p>
      </div>

      <div className="card">
        <div className="form-group">
          <label className="form-label">Select Diet Chart</label>
          <select
            className="form-control"
            value={selectedChart?.id || ''}
            onChange={(e) => {
              const chart = dietCharts.find(c => c.id === parseInt(e.target.value));
              setSelectedChart(chart);
              setSelectedDay(1);
            }}
          >
            {dietCharts.map((chart) => (
              <option key={chart.id} value={chart.id}>
                {formatDate(chart.createdDate)} - {chart.durationDays} days ({chart.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedChart && (
        <>
          <div className="card">
            <h2 className="section-title">Diet Chart Overview</h2>
            <div className="grid grid-4">
              <div>
                <p className="text-muted">Duration</p>
                <h3>{selectedChart.durationDays} days</h3>
              </div>
              <div>
                <p className="text-muted">Total Calories/Day</p>
                <h3>{Math.round(selectedChart.totalCalories / selectedChart.durationDays)} kcal</h3>
              </div>
              <div>
                <p className="text-muted">Status</p>
                <h3>
                  <span className={`badge badge-${selectedChart.status === 'ACTIVE' ? 'success' : 'info'}`}>
                    {selectedChart.status}
                  </span>
                </h3>
              </div>
              <div>
                <p className="text-muted">Dietitian</p>
                <h3 style={{fontSize: '16px'}}>{selectedChart.dietitian.name}</h3>
              </div>
            </div>

            <div className="nutrition-summary-box">
              <h4>Daily Nutritional Breakdown (Average)</h4>
              <div className="nutrition-bars">
                <div className="nutrition-bar-item">
                  <div className="nutrition-bar-label">
                    <span>Protein</span>
                    <span>{Math.round(selectedChart.totalProtein / selectedChart.durationDays)}g</span>
                  </div>
                  <div className="nutrition-bar">
                    <div className="nutrition-bar-fill protein" 
                         style={{width: `${(selectedChart.totalProtein / selectedChart.durationDays) / 2}%`}}></div>
                  </div>
                </div>
                <div className="nutrition-bar-item">
                  <div className="nutrition-bar-label">
                    <span>Carbs</span>
                    <span>{Math.round(selectedChart.totalCarbs / selectedChart.durationDays)}g</span>
                  </div>
                  <div className="nutrition-bar">
                    <div className="nutrition-bar-fill carbs" 
                         style={{width: `${(selectedChart.totalCarbs / selectedChart.durationDays) / 3}%`}}></div>
                  </div>
                </div>
                <div className="nutrition-bar-item">
                  <div className="nutrition-bar-label">
                    <span>Fats</span>
                    <span>{Math.round(selectedChart.totalFats / selectedChart.durationDays)}g</span>
                  </div>
                  <div className="nutrition-bar">
                    <div className="nutrition-bar-fill fats" 
                         style={{width: `${(selectedChart.totalFats / selectedChart.durationDays) / 1}%`}}></div>
                  </div>
                </div>
                <div className="nutrition-bar-item">
                  <div className="nutrition-bar-label">
                    <span>Fiber</span>
                    <span>{Math.round(selectedChart.totalFiber / selectedChart.durationDays)}g</span>
                  </div>
                  <div className="nutrition-bar">
                    <div className="nutrition-bar-fill fiber" 
                         style={{width: `${(selectedChart.totalFiber / selectedChart.durationDays) * 2}%`}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="section-title">Select Day</h2>
            <div className="day-selector">
              {Array.from({ length: selectedChart.durationDays }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  Day {day}
                </button>
              ))}
            </div>
          </div>

          <div className="meals-container">
            {dayMeals.map((meal) => (
              <div key={meal.id} className="meal-card">
                <div className="meal-card-header">
                  <div className="meal-type-badge">{meal.mealType}</div>
                  <div className="meal-timing">{meal.timing}</div>
                </div>

                <div className="meal-content">
                  <h3>Food Items</h3>
                  <p className="meal-items">{meal.foodItems}</p>

                  <div className="meal-nutrition">
                    <h4>Nutritional Information</h4>
                    <div className="nutrition-grid-compact">
                      <div className="nutrition-item-compact">
                        
                        <div>
                          <div className="nutrition-value-compact">{meal.calories}</div>
                          <span className="nutrition-label-compact">Calories</span>
                        </div>
                      </div>
                      <div className="nutrition-item-compact">
                        <div>
                          <div className="nutrition-value-compact">{meal.protein}g</div>
                          <div className="nutrition-label-compact">Protein</div>
                        </div>
                      </div>
                      <div className="nutrition-item-compact">
                        <div>
                          <div className="nutrition-value-compact">{meal.carbs}g</div>
                          <div className="nutrition-label-compact">Carbs</div>
                        </div>
                      </div>
                      <div className="nutrition-item-compact">
                        <div>
                          <div className="nutrition-value-compact">{meal.fats}g</div>
                          <div className="nutrition-label-compact">Fats</div>
                        </div>
                      </div>
                      <div className="nutrition-item-compact">
                        <div>
                          <div className="nutrition-value-compact">{meal.fiber}g</div>
                          <div className="nutrition-label-compact">Fiber</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ayurvedic-properties-compact">
                    <h4>Ayurvedic Properties</h4>
                    <div className="ayurvedic-grid-compact">
                      <div className="ayurvedic-item-compact">
                        <span className="ayurvedic-label">Rasa:</span> {meal.rasa}
                      </div>
                      <div className="ayurvedic-item-compact">
                        <span className="ayurvedic-label">Virya:</span> {meal.virya}
                      </div>
                      <div className="ayurvedic-item-compact">
                        <span className="ayurvedic-label">Vipaka:</span> {meal.vipaka}
                      </div>
                      <div className="ayurvedic-item-compact">
                        <span className="ayurvedic-label">Dosha:</span> {meal.dosha}
                      </div>
                    </div>
                    <div className="benefits-box">
                      <strong>Benefits:</strong> {meal.benefits}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewDietChart;
