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
// src/components/patient/ViewDietChart.jsx
// src/components/patient/ViewDietChart.jsx - FIXED FOR YOUR BACKEND
/*import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import { getPatientDietCharts } from '../../services/api';
import { formatDate } from '../../utils/helpers';

function ViewDietChart({ user, setUser }) {
  const [dietCharts, setDietCharts] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('ViewDietChart mounted with user:', user);
    loadDietCharts();
  }, []);

  const loadDietCharts = async () => {
    try {
      console.log('Fetching diet charts for patient profile ID:', user.profileId);
      const response = await getPatientDietCharts(user.profileId);
      console.log('Diet charts API response:', response.data);
      
      if (!response.data || response.data.length === 0) {
        console.log('No diet charts found');
        setDietCharts([]);
        setLoading(false);
        return;
      }

      setDietCharts(response.data);
      setSelectedChart(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading diet charts:', error);
      setError('Failed to load diet charts');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-layout">
        <Sidebar user={user} setUser={setUser} />
        <div className="main-content">
          <Navbar title="My Diet Chart" user={user} />
          <div className="card">
            <div className="alert alert-danger">{error}</div>
            <button className="btn btn-primary" onClick={loadDietCharts}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  if (dietCharts.length === 0) {
    return (
      <div className="dashboard-layout">
        <Sidebar user={user} setUser={setUser} />
        <div className="main-content">
          <Navbar title="My Diet Chart" user={user} />
          <div className="card" style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>📋</div>
            <h3 style={{color: 'var(--text-secondary)'}}>No Diet Chart Yet</h3>
            <p style={{color: 'var(--text-secondary)'}}>
              Your dietitian will create a personalized diet chart for you after consultation.
            </p>
            <a href="/patient/appointments" className="btn btn-primary" style={{marginTop: '20px'}}>
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Group meals by day
  const mealsByDay = {};
  if (selectedChart?.meals) {
    selectedChart.meals.forEach(meal => {
      if (!mealsByDay[meal.dayNumber]) {
        mealsByDay[meal.dayNumber] = [];
      }
      mealsByDay[meal.dayNumber].push(meal);
    });
  }

  // Prepare chart data
  const macroData = {
    labels: ['Protein', 'Carbohydrates', 'Fats'],
    datasets: [{
      data: [
        selectedChart?.totalProtein || 0,
        selectedChart?.totalCarbs || 0,
        selectedChart?.totalFats || 0
      ],
      backgroundColor: [
        'rgba(244, 164, 96, 0.8)',
        'rgba(151, 198, 128, 0.8)',
        'rgba(255, 193, 7, 0.8)'
      ],
      borderWidth: 2
    }]
  };

  const getMealIcon = (mealType) => {
    switch(mealType) {
      case 'BREAKFAST': return '🍳';
      case 'LUNCH': return '🍛';
      case 'SNACK': return '🍵';
      case 'DINNER': return '🍲';
      default: return '🍽️';
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} setUser={setUser} />
      <div className="main-content">
        <Navbar title="My Diet Chart" user={user} />

        <div className="card">
          <div className="card-header">📋 Diet Chart History</div>
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            {dietCharts.map((chart) => (
              <button
                key={chart.id}
                className={`btn ${selectedChart?.id === chart.id ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedChart(chart)}
              >
                {formatDate(chart.startDate)} - {chart.durationDays} Days
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <div className="card-header">📊 Daily Nutrient Summary</div>
            <div style={{maxWidth: '300px', margin: '0 auto 24px'}}>
              <Doughnut data={macroData} />
            </div>

            <div className="nutrient-grid" style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
              <div className="nutrient-item">
                <div className="nutrient-value">{Math.round(selectedChart?.totalCalories / selectedChart?.durationDays) || 0}</div>
                <div className="nutrient-label">Daily Calories</div>
              </div>
              <div className="nutrient-item">
                <div className="nutrient-value">{Math.round(selectedChart?.totalProtein / selectedChart?.durationDays) || 0}g</div>
                <div className="nutrient-label">Daily Protein</div>
              </div>
              <div className="nutrient-item">
                <div className="nutrient-value">{Math.round(selectedChart?.totalCarbs / selectedChart?.durationDays) || 0}g</div>
                <div className="nutrient-label">Daily Carbs</div>
              </div>
              <div className="nutrient-item">
                <div className="nutrient-value">{Math.round(selectedChart?.totalFats / selectedChart?.durationDays) || 0}g</div>
                <div className="nutrient-label">Daily Fats</div>
              </div>
              <div className="nutrient-item">
                <div className="nutrient-value">{Math.round(selectedChart?.totalFiber / selectedChart?.durationDays) || 0}g</div>
                <div className="nutrient-label">Daily Fiber</div>
              </div>
              <div className="nutrient-item">
                <div className="nutrient-value">{selectedChart?.durationDays}</div>
                <div className="nutrient-label">Total Days</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">📅 Chart Details</div>
            <div style={{padding: '20px'}}>
              <div style={{marginBottom: '16px', padding: '16px', background: 'var(--light-green)', borderRadius: '8px'}}>
                <h4 style={{color: 'var(--primary-color)', marginBottom: '12px'}}>Duration</h4>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <strong>Start Date:</strong>
                  <span>{formatDate(selectedChart?.startDate)}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <strong>End Date:</strong>
                  <span>{formatDate(selectedChart?.endDate)}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <strong>Status:</strong>
                  <span className={`badge ${selectedChart?.status === 'ACTIVE' ? 'badge-success' : 'badge-secondary'}`}>
                    {selectedChart?.status}
                  </span>
                </div>
              </div>

              <div style={{marginTop: '20px', padding: '16px', background: 'var(--bg-light)', borderRadius: '8px'}}>
                <h4 style={{color: 'var(--primary-color)', marginBottom: '12px'}}>Created By</h4>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className="patient-avatar" style={{width: '50px', height: '50px', fontSize: '20px'}}>
                    {selectedChart?.dietitian?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{fontWeight: '600'}}>{selectedChart?.dietitian?.name}</div>
                    <div style={{fontSize: '14px', color: 'var(--text-secondary)'}}>
                      {selectedChart?.dietitian?.qualification}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">🍽️ Complete Meal Plan</div>
          {Object.keys(mealsByDay).sort((a, b) => a - b).map((dayNumber) => (
            <div key={dayNumber} style={{marginBottom: '24px', padding: '20px', background: 'var(--bg-light)', borderRadius: '12px'}}>
              <h3 style={{color: 'var(--primary-color)', marginBottom: '16px'}}>
                Day {dayNumber} - {formatDate(new Date(selectedChart.startDate).setDate(new Date(selectedChart.startDate).getDate() + parseInt(dayNumber) - 1))}
              </h3>

              <div className="grid grid-2" style={{gap: '16px'}}>
                {mealsByDay[dayNumber].sort((a, b) => {
                  const order = ['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER'];
                  return order.indexOf(a.mealType) - order.indexOf(b.mealType);
                }).map((meal, idx) => (
                  <div key={idx} style={{padding: '16px', background: 'white', borderRadius: '8px', border: '2px solid var(--light-green)'}}>
                    <h4 style={{color: 'var(--primary-color)', marginBottom: '8px'}}>
                      {getMealIcon(meal.mealType)} {meal.mealType}
                    </h4>
                    <div style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px'}}>
                      ⏰ {meal.timing}
                    </div>

                    <div style={{marginBottom: '12px'}}>
                      <strong>Food Items:</strong>
                      <p style={{marginTop: '4px', fontSize: '14px'}}>{meal.foodItems}</p>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '12px', padding: '12px', background: 'var(--bg-light)', borderRadius: '6px'}}>
                      <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)'}}>
                          {Math.round(meal.calories)}
                        </div>
                        <div style={{fontSize: '12px', color: 'var(--text-secondary)'}}>Calories</div>
                      </div>
                      <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)'}}>
                          {Math.round(meal.protein)}g
                        </div>
                        <div style={{fontSize: '12px', color: 'var(--text-secondary)'}}>Protein</div>
                      </div>
                      <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)'}}>
                          {Math.round(meal.carbs)}g
                        </div>
                        <div style={{fontSize: '12px', color: 'var(--text-secondary)'}}>Carbs</div>
                      </div>
                    </div>

                    {meal.rasa && (
                      <div style={{marginTop: '12px', padding: '12px', background: 'var(--light-green)', borderRadius: '6px'}}>
                        <div style={{fontSize: '12px', marginBottom: '4px'}}>
                          <strong>Rasa:</strong> {meal.rasa}
                        </div>
                        <div style={{fontSize: '12px', marginBottom: '4px'}}>
                          <strong>Virya:</strong> {meal.virya}
                        </div>
                        <div style={{fontSize: '12px', marginBottom: '4px'}}>
                          <strong>Dosha:</strong> {meal.dosha}
                        </div>
                        {meal.benefits && (
                          <div style={{fontSize: '12px', marginTop: '8px'}}>
                            <strong>Benefits:</strong> {meal.benefits}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewDietChart;*/
