// PatientProfile.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPatientProfile, generateDietChart } from '../../services/api';
import { formatDate, getBMICategory } from '../../utils/helpers';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../../styles/dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PatientProfile({ user }) {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [healthParameters, setHealthParameters] = useState([]);
  const [dietCharts, setDietCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [durationDays, setDurationDays] = useState(7);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchPatientProfile();
  }, [patientId]);

  const fetchPatientProfile = async () => {
    try {
      const response = await getPatientProfile(patientId);
      setPatient(response.data.patient);
      setHealthParameters(response.data.healthParameters);
      setDietCharts(response.data.dietCharts);
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDietChart = async () => {
    setGenerating(true);
    try {
      await generateDietChart({
        patientId: parseInt(patientId),
        dietitianId: user.profileId,
        durationDays: parseInt(durationDays)
      });
      setShowGenerateModal(false);
      fetchPatientProfile(); // Refresh data
      alert('Diet chart generated successfully!');
    } catch (error) {
      console.error('Error generating diet chart:', error);
      alert('Failed to generate diet chart. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading patient profile...</div>;
  }

  if (!patient) {
    return <div className="card">Patient not found</div>;
  }

  // Prepare chart data
  const weightChartData = {
    labels: healthParameters.slice(0, 10).reverse().map(p => formatDate(p.date)),
    datasets: [
      {
        label: 'Weight (kg)',
        data: healthParameters.slice(0, 10).reverse().map(p => p.weight),
        borderColor: 'rgb(45, 106, 79)',
        backgroundColor: 'rgba(45, 106, 79, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Weight Tracking'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{patient.name}'s Profile</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowGenerateModal(true)}
        >
          + Generate New Diet Chart
        </button>
      </div>

    
      <div className="card">
        <h2 className="section-title">Patient Information</h2>
        <div className="grid grid-4">
          <div>
            <p className="text-muted">Age</p>
            <h3>{patient.age} years</h3>
          </div>
          <div>
            <p className="text-muted">Gender</p>
            <h3>{patient.gender}</h3>
          </div>
          <div>
            <p className="text-muted">Weight</p>
            <h3>{patient.weight} kg</h3>
          </div>
          <div>
            <p className="text-muted">Height</p>
            <h3>{patient.height} cm</h3>
          </div>
          <div>
            <p className="text-muted">BMI</p>
            <h3>{patient.bmi?.toFixed(1)} <span className="text-muted" style={{fontSize: '14px'}}>({getBMICategory(patient.bmi)})</span></h3>
          </div>
          <div>
            <p className="text-muted">Health Condition</p>
            <h3 style={{fontSize: '16px'}}>{patient.healthCondition || 'None'}</h3>
          </div>
          <div>
            <p className="text-muted">Allergies</p>
            <h3 style={{fontSize: '16px'}}>{patient.allergies || 'None'}</h3>
          </div>
        </div>
      </div>

      {healthParameters.length > 0 && (
        <div className="card">
          <h2 className="section-title">Health Tracking</h2>
          <div className="grid grid-2">
            <div>
              <Line data={weightChartData} options={chartOptions} />
            </div>
            <div>
              <h3 className="mb-3">Recent Health Parameters</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {healthParameters.slice(0, 5).map((param) => (
                  <div key={param.id} style={{ 
                    background: 'var(--bg-light)', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    marginBottom: '12px' 
                  }}>
                    <p><strong>Date:</strong> {formatDate(param.date)}</p>
                    <p><strong>Weight:</strong> {param.weight} kg</p>
                    <p><strong>Meal Frequency:</strong> {param.mealFrequency} times/day</p>
                    <p><strong>Water Intake:</strong> {param.waterIntake} liters</p>
                    <p><strong>Bowel Movement:</strong> {param.bowelMovement}</p>
                    <p><strong>Sleep:</strong> {param.sleepHours} hours</p>
                    <p><strong>Stress Level:</strong> {param.stressLevel}</p>
                    <p><strong>Energy Level:</strong> {param.energyLevel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="section-title">Previous Diet Charts</h2>
        {dietCharts.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Duration</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Total Calories</th>
                </tr>
              </thead>
              <tbody>
                {dietCharts.map((chart) => (
                  <tr key={chart.id}>
                    <td>{formatDate(chart.createdDate)}</td>
                    <td>{chart.durationDays} days</td>
                    <td>{formatDate(chart.startDate)}</td>
                    <td>{formatDate(chart.endDate)}</td>
                    <td>
                      <span className={`badge badge-${chart.status === 'ACTIVE' ? 'success' : 'info'}`}>
                        {chart.status}
                      </span>
                    </td>
                    <td>{chart.totalCalories?.toFixed(0)} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Diet Charts Yet</h3>
            <p>Generate a diet chart to get started</p>
          </div>
        )}
      </div>

    
      {showGenerateModal && (
        <div className="modal-overlay" onClick={() => setShowGenerateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h2 className="card-title">Generate Diet Chart</h2>
              <button className="close-btn" onClick={() => setShowGenerateModal(false)}>×</button>
            </div>
            <div className="form-group">
              <label className="form-label">Duration (Days)</label>
              <input
                type="number"
                className="form-control"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                min="1"
                max="30"
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                className="btn btn-primary"
                onClick={handleGenerateDietChart}
                disabled={generating}
              >
                {generating ? 'Generating...' : 'Generate'}
              </button>
              <button className="btn btn-outline" onClick={() => setShowGenerateModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientProfile;
// components/dietitian/PatientProfile.jsx
/*import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientProfile, generateDietChart } from '../../services/api';
import { formatDate, getBMICategory } from '../../utils/helpers';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../../styles/dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PatientProfile({ user }) {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [healthParameters, setHealthParameters] = useState([]);
  const [dietCharts, setDietCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [durationDays, setDurationDays] = useState(7);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchPatientProfile();
  }, [patientId]);

  const fetchPatientProfile = async () => {
    try {
      const response = await getPatientProfile(patientId);
      setPatient(response.data.patient);
      setHealthParameters(response.data.healthParameters);
      setDietCharts(response.data.dietCharts);
    } catch (error) {
      console.error('Error fetching patient profile:', error);
      alert('Failed to load patient profile');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDietChart = async () => {
    setGenerating(true);
    try {
      const response = await generateDietChart({
        patientId: parseInt(patientId),
        dietitianId: user.profileId,
        durationDays: parseInt(durationDays)
      });
      
      setShowGenerateModal(false);
      alert('Diet chart generated successfully!');
      
      // Navigate to editor to view/edit the new diet chart
      navigate(`/dietitian/diet-chart/${response.data.id}/edit`);
    } catch (error) {
      console.error('Error generating diet chart:', error);
      alert('Failed to generate diet chart. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleViewDietChart = (chartId) => {
    navigate(`/dietitian/diet-chart/${chartId}/edit`);
  };

  if (loading) {
    return <div className="loading">Loading patient profile...</div>;
  }

  if (!patient) {
    return <div className="card">Patient not found</div>;
  }

  // Prepare chart data
  const weightChartData = {
    labels: healthParameters.slice(0, 10).reverse().map(p => formatDate(p.date)),
    datasets: [
      {
        label: 'Weight (kg)',
        data: healthParameters.slice(0, 10).reverse().map(p => p.weight),
        borderColor: 'rgb(45, 106, 79)',
        backgroundColor: 'rgba(45, 106, 79, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Weight Tracking'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{patient.name}'s Profile</h1>
          <p className="page-subtitle">{patient.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/dietitian/patients')}
          >
            ← Back to Patients
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowGenerateModal(true)}
          >
            + Generate Diet Chart
          </button>
        </div>
      </div>

  
      <div className="card">
        <h2 className="section-title">Patient Information</h2>
        <div className="grid grid-4">
          <div>
            <p className="text-muted">Age</p>
            <h3>{patient.age} years</h3>
          </div>
          <div>
            <p className="text-muted">Gender</p>
            <h3>{patient.gender}</h3>
          </div>
          <div>
            <p className="text-muted">Weight</p>
            <h3>{patient.weight} kg</h3>
          </div>
          <div>
            <p className="text-muted">Height</p>
            <h3>{patient.height} cm</h3>
          </div>
          <div>
            <p className="text-muted">BMI</p>
            <h3>
              {patient.bmi?.toFixed(1)} 
              <span className="text-muted" style={{fontSize: '14px'}}>
                ({getBMICategory(patient.bmi)})
              </span>
            </h3>
          </div>
          <div>
            <p className="text-muted">Health Condition</p>
            <h3 style={{fontSize: '16px'}}>{patient.healthCondition || 'None'}</h3>
          </div>
          <div>
            <p className="text-muted">Allergies</p>
            <h3 style={{fontSize: '16px'}}>{patient.allergies || 'None'}</h3>
          </div>
          <div>
            <p className="text-muted">Contact</p>
            <h3 style={{fontSize: '16px'}}>{patient.phone || 'N/A'}</h3>
          </div>
        </div>
      </div>

   
      {healthParameters.length > 0 && (
        <div className="card">
          <h2 className="section-title">Health Tracking</h2>
          <div className="grid grid-2">
            <div>
              <Line data={weightChartData} options={chartOptions} />
            </div>
            <div>
              <h3 className="mb-3">Recent Health Parameters</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {healthParameters.slice(0, 5).map((param) => (
                  <div key={param.id} style={{ 
                    background: 'var(--bg-light)', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    marginBottom: '12px' 
                  }}>
                    <p><strong>Date:</strong> {formatDate(param.date)}</p>
                    <p><strong>Weight:</strong> {param.weight} kg</p>
                    <p><strong>Meal Frequency:</strong> {param.mealFrequency} times/day</p>
                    <p><strong>Water Intake:</strong> {param.waterIntake} liters</p>
                    <p><strong>Bowel Movement:</strong> {param.bowelMovement}</p>
                    <p><strong>Sleep:</strong> {param.sleepHours} hours</p>
                    <p><strong>Stress Level:</strong> {param.stressLevel}</p>
                    <p><strong>Energy Level:</strong> {param.energyLevel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

     
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Diet Charts</h2>
          {dietCharts.length > 0 && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => navigate(`/dietitian/diet-charts/patient/${patientId}`)}
            >
              View All Diet Charts
            </button>
          )}
        </div>
        
        {dietCharts.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Duration</th>
                  <th>Date Range</th>
                  <th>Status</th>
                  <th>Calories/Day</th>
                  <th>Version</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dietCharts.slice(0, 5).map((chart) => (
                  <tr key={chart.id}>
                    <td>{formatDate(chart.createdDate)}</td>
                    <td>{chart.durationDays} days</td>
                    <td>
                      {formatDate(chart.startDate)} to {formatDate(chart.endDate)}
                    </td>
                    <td>
                      <span className={`badge badge-${chart.status === 'ACTIVE' ? 'success' : 'info'}`}>
                        {chart.status}
                      </span>
                    </td>
                    <td>{Math.round(chart.totalCalories / chart.durationDays)} kcal</td>
                    <td>
                      {chart.versionNumber ? `v${chart.versionNumber}` : 'v1'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewDietChart(chart.id)}
                      >
                        View & Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {dietCharts.length > 5 && (
              <p className="text-muted" style={{ marginTop: '12px', textAlign: 'center' }}>
                Showing 5 of {dietCharts.length} diet charts
              </p>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Diet Charts Yet</h3>
            <p>Generate a personalized diet chart to get started</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowGenerateModal(true)}
            >
              Generate Diet Chart
            </button>
          </div>
        )}
      </div>

      {showGenerateModal && (
        <div className="modal-overlay" onClick={() => setShowGenerateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="card-title">Generate Diet Chart</h2>
              <button className="close-btn" onClick={() => setShowGenerateModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Duration (Days)</label>
                <input
                  type="number"
                  className="form-control"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  min="1"
                  max="30"
                />
                <small className="text-muted">Recommended: 7-14 days</small>
              </div>

              <div style={{ 
                background: 'var(--bg-light)', 
                padding: '16px', 
                borderRadius: '8px', 
                marginTop: '16px' 
              }}>
                <h4>What will be generated:</h4>
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                  <li>Personalized meal plans for {durationDays} days</li>
                  <li>4 meals per day (Breakfast, Lunch, Snack, Dinner)</li>
                  <li>Nutritional breakdown for each meal</li>
                  <li>Ayurvedic properties (Rasa, Virya, Vipaka, Dosha)</li>
                  <li>Editable food items from database</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer" style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                className="btn btn-primary"
                onClick={handleGenerateDietChart}
                disabled={generating}
              >
                {generating ? 'Generating...' : 'Generate Diet Chart'}
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => setShowGenerateModal(false)}
                disabled={generating}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientProfile;*/
