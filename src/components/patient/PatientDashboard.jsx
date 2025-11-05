// PatientDashboard.jsx
import { useState, useEffect } from 'react';
import { getPatientDashboard, addHealthParameter } from '../../services/api';
import { formatDateTime, getBMICategory } from '../../utils/helpers';
import { BOWEL_MOVEMENT_OPTIONS, STRESS_LEVEL_OPTIONS, ENERGY_LEVEL_OPTIONS } from '../../utils/constants';
import '../../styles/dashboard.css';

function PatientDashboard({ user }) {
  const [dashboard, setDashboard] = useState(null);
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [healthData, setHealthData] = useState({
    weight: '',
    mealFrequency: '',
    bowelMovement: '',
    waterIntake: '',
    caloriesBurnt: '',
    sleepHours: '',
    stressLevel: '',
    energyLevel: ''
  });

  useEffect(() => {
    fetchDashboard();
  }, [user.profileId]);

  const fetchDashboard = async () => {
    try {
      const response = await getPatientDashboard(user.profileId);
      setDashboard(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHealthDataChange = (e) => {
    setHealthData({
      ...healthData,
      [e.target.name]: e.target.value
    });
  };

  const handleHealthSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addHealthParameter({
        patientId: user.profileId,
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(healthData.weight),
        mealFrequency: parseInt(healthData.mealFrequency),
        bowelMovement: healthData.bowelMovement,
        waterIntake: parseFloat(healthData.waterIntake),
        caloriesBurnt: parseInt(healthData.caloriesBurnt),
        sleepHours: parseInt(healthData.sleepHours),
        stressLevel: healthData.stressLevel,
        energyLevel: healthData.energyLevel
      });
      
      setShowHealthForm(false);
      fetchDashboard();
      alert('Health data added successfully!');
      
      // Reset form
      setHealthData({
        weight: '',
        mealFrequency: '',
        bowelMovement: '',
        waterIntake: '',
        caloriesBurnt: '',
        sleepHours: '',
        stressLevel: '',
        energyLevel: ''
      });
    } catch (error) {
      console.error('Error adding health data:', error);
      alert('Failed to add health data. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const patient = dashboard.patient;
  const healthParam = dashboard.healthParameters;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome, {user.name}!</h1>
        <button className="btn btn-primary" onClick={() => setShowHealthForm(true)}>
          + Add Today's Health Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">⚖️</div>
          <div className="stat-details">
            <h3>{patient.weight} kg</h3>
            <p>Current Weight</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">📏</div>
          <div className="stat-details">
            <h3>{patient.bmi?.toFixed(1)}</h3>
            <p>BMI ({getBMICategory(patient.bmi)})</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">📅</div>
          <div className="stat-details">
            <h3>{dashboard.recentAppointments?.length || 0}</h3>
            <p>Total Appointments</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">👨‍⚕️</div>
          <div className="stat-details">
            <h3>{patient.assignedDietitian?.name || 'Not Assigned'}</h3>
            <p>Your Dietitian</p>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        {/* Current Health Status */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Current Health Status</h2>
          </div>
          <div className="card-body">
            {healthParam ? (
              <div>
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div>
                    <p className="text-muted">Weight</p>
                    <h3>{healthParam.weight} kg</h3>
                  </div>
                  <div>
                    <p className="text-muted">Water Intake</p>
                    <h3>{healthParam.waterIntake} L</h3>
                  </div>
                  <div>
                    <p className="text-muted">Meal Frequency</p>
                    <h3>{healthParam.mealFrequency} times/day</h3>
                  </div>
                  <div>
                    <p className="text-muted">Sleep Hours</p>
                    <h3>{healthParam.sleepHours} hours</h3>
                  </div>
                  <div>
                    <p className="text-muted">Bowel Movement</p>
                    <h3>{healthParam.bowelMovement}</h3>
                  </div>
                  <div>
                    <p className="text-muted">Calories Burnt</p>
                    <h3>{healthParam.caloriesBurnt} kcal</h3>
                  </div>
                  <div>
                    <p className="text-muted">Stress Level</p>
                    <h3>{healthParam.stressLevel}</h3>
                  </div>
                  <div>
                    <p className="text-muted">Energy Level</p>
                    <h3>{healthParam.energyLevel}</h3>
                  </div>
                </div>
                <p className="text-muted mt-3" style={{ fontSize: '14px' }}>
                  Last updated: {new Date(healthParam.date).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📊</div>
                <h3>No Health Data Yet</h3>
                <p>Add your daily health parameters to track your progress</p>
                <button className="btn btn-primary mt-2" onClick={() => setShowHealthForm(true)}>
                  Add Health Data
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Appointments</h2>
            <a href="/patient/schedule-appointment" className="btn btn-sm btn-outline">Book New</a>
          </div>
          <div className="card-body">
            {dashboard.recentAppointments && dashboard.recentAppointments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dashboard.recentAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-header">
                      <div className="appointment-patient">
                        Dr. {appointment.dietitian.name}
                      </div>
                      <span className={`badge badge-${
                        appointment.status === 'PENDING' ? 'warning' : 
                        appointment.status === 'COMPLETED' ? 'success' : 'danger'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="appointment-date">
                      📅 {formatDateTime(appointment.appointmentDate)}
                    </div>
                    {appointment.notes && (
                      <div className="appointment-notes">"{appointment.notes}"</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <h3>No Appointments Yet</h3>
                <p>Schedule your first consultation with a dietitian</p>
                <a href="/patient/schedule-appointment" className="btn btn-primary mt-2">
                  Schedule Now
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Condition & Allergies */}
      <div className="card">
        <h2 className="section-title">Health Information</h2>
        <div className="grid grid-2">
          <div>
            <p className="text-muted mb-2">Health Condition</p>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>
              {patient.healthCondition || 'None reported'}
            </p>
          </div>
          <div>
            <p className="text-muted mb-2">Allergies</p>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>
              {patient.allergies || 'None reported'}
            </p>
          </div>
        </div>
      </div>

      {/* Health Data Form Modal */}
      {showHealthForm && (
        <div className="modal-overlay" onClick={() => setShowHealthForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="card-header">
              <h2 className="card-title">Add Today's Health Data</h2>
              <button className="close-btn" onClick={() => setShowHealthForm(false)}>×</button>
            </div>
            
            <form onSubmit={handleHealthSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    className="form-control"
                    value={healthData.weight}
                    onChange={handleHealthDataChange}
                    required
                    step="0.1"
                    placeholder="e.g., 70.5"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Meal Frequency *</label>
                  <input
                    type="number"
                    name="mealFrequency"
                    className="form-control"
                    value={healthData.mealFrequency}
                    onChange={handleHealthDataChange}
                    required
                    min="1"
                    max="10"
                    placeholder="Times per day"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Bowel Movement *</label>
                  <select
                    name="bowelMovement"
                    className="form-control"
                    value={healthData.bowelMovement}
                    onChange={handleHealthDataChange}
                    required
                  >
                    <option value="">Select</option>
                    {BOWEL_MOVEMENT_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Water Intake (liters) *</label>
                  <input
                    type="number"
                    name="waterIntake"
                    className="form-control"
                    value={healthData.waterIntake}
                    onChange={handleHealthDataChange}
                    required
                    step="0.1"
                    placeholder="e.g., 2.5"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Calories Burnt *</label>
                  <input
                    type="number"
                    name="caloriesBurnt"
                    className="form-control"
                    value={healthData.caloriesBurnt}
                    onChange={handleHealthDataChange}
                    required
                    placeholder="e.g., 300"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Sleep Hours *</label>
                  <input
                    type="number"
                    name="sleepHours"
                    className="form-control"
                    value={healthData.sleepHours}
                    onChange={handleHealthDataChange}
                    required
                    min="0"
                    max="24"
                    placeholder="e.g., 7"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stress Level *</label>
                  <select
                    name="stressLevel"
                    className="form-control"
                    value={healthData.stressLevel}
                    onChange={handleHealthDataChange}
                    required
                  >
                    <option value="">Select</option>
                    {STRESS_LEVEL_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Energy Level *</label>
                  <select
                    name="energyLevel"
                    className="form-control"
                    value={healthData.energyLevel}
                    onChange={handleHealthDataChange}
                    required
                  >
                    <option value="">Select</option>
                    {ENERGY_LEVEL_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setShowHealthForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;