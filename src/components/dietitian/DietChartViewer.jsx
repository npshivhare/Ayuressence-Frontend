// components/dietitian/DietChartViewer.jsx
/*import { useState, useEffect } from 'react';
import { getAllPatients, getDietitianDietCharts } from '../../services/api';
import { formatDate } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import '../../styles/dietitian.css';

function DietChartViewer({ user }) {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dietCharts, setDietCharts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, [user.profileId]);

  const fetchPatients = async () => {
    try {
      const response = await getAllPatients(user.profileId);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDietCharts = async (patientId) => {
    try {
      const response = await getDietitianDietCharts(patientId);
      setDietCharts(response.data);
    } catch (error) {
      console.error('Error fetching diet charts:', error);
    }
  };

  const handlePatientSelect = (e) => {
    const patientId = parseInt(e.target.value);
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient);
    if (patientId) {
      fetchDietCharts(patientId);
    } else {
      setDietCharts([]);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">View & Edit Diet Charts</h1>
        <p className="page-subtitle">View and modify patient diet plans</p>
      </div>

      <div className="card">
        <div className="form-group">
          <label className="form-label">Select Patient</label>
          <select
            className="form-control"
            value={selectedPatient?.id || ''}
            onChange={handlePatientSelect}
          >
            <option value="">Choose a patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} - {patient.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPatient && dietCharts.length > 0 && (
        <div className="card">
          <h2 className="section-title">Diet Charts for {selectedPatient.name}</h2>
          <div className="diet-charts-list">
            {dietCharts.map((chart) => (
              <div key={chart.id} className="diet-chart-item">
                <div className="diet-chart-item-header">
                  <div>
                    <h3>Diet Chart - {formatDate(chart.createdDate)}</h3>
                    <p className="text-muted">
                      {chart.durationDays} days | {formatDate(chart.startDate)} to {formatDate(chart.endDate)}
                    </p>
                  </div>
                  <div>
                    <span className={`badge badge-${chart.status === 'ACTIVE' ? 'success' : 'info'}`}>
                      {chart.status}
                    </span>
                  </div>
                </div>
                <div className="diet-chart-item-stats">
                  <div>
                    <span className="text-muted">Total Calories:</span>
                    <strong> {Math.round(chart.totalCalories)} kcal</strong>
                  </div>
                  <div>
                    <span className="text-muted">Avg Daily:</span>
                    <strong> {Math.round(chart.totalCalories / chart.durationDays)} kcal/day</strong>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/dietitian/diet-chart/${chart.id}/edit`)}
                >
                  View & Edit Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPatient && dietCharts.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Diet Charts Found</h3>
            <p>No diet charts have been created for this patient yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DietChartViewer;
// components/dietitian/DietChartViewer.jsx*/
// components/dietitian/DietChartViewer.jsx
import { useState, useEffect } from 'react';
import { getAllPatients, getDietitianDietCharts } from '../../services/api';
import { formatDate } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import '../../styles/dietitian.css';

function DietChartViewer({ user }) {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dietCharts, setDietCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, [user.profileId]);

  const fetchPatients = async () => {
    try {
      const response = await getAllPatients(user.profileId);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Failed to load patients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDietCharts = async (patientId) => {
    setLoadingCharts(true);
    try {
      const response = await getDietitianDietCharts(patientId);
      setDietCharts(response.data);
    } catch (error) {
      console.error('Error fetching diet charts:', error);
      alert('Failed to load diet charts. Please try again.');
      setDietCharts([]);
    } finally {
      setLoadingCharts(false);
    }
  };

  const handlePatientSelect = (e) => {
    const patientId = parseInt(e.target.value);
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient);
    if (patientId) {
      fetchDietCharts(patientId);
    } else {
      setDietCharts([]);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">View & Edit Diet Charts</h1>
        <p className="page-subtitle">View and modify patient diet plans</p>
      </div>

      <div className="card">
        <div className="form-group">
          <label className="form-label">Select Patient</label>
          <select
            className="form-control"
            value={selectedPatient?.id || ''}
            onChange={handlePatientSelect}
          >
            <option value="">Choose a patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} - {patient.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loadingCharts && (
        <div className="card">
          <div className="loading">Loading diet charts...</div>
        </div>
      )}

      {!loadingCharts && selectedPatient && dietCharts.length > 0 && (
        <div className="card">
          <h2 className="section-title">Diet Charts for {selectedPatient.name}</h2>
          <div className="diet-charts-list">
            {dietCharts.map((chart) => (
              <div key={chart.id} className="diet-chart-item">
                <div className="diet-chart-item-header">
                  <div>
                    <h3>Diet Chart - {formatDate(chart.createdDate)}</h3>
                    <p className="text-muted">
                      {chart.durationDays} days | {formatDate(chart.startDate)} to {formatDate(chart.endDate)}
                    </p>
                    {chart.versionNumber && chart.versionNumber > 1 && (
                      <p className="text-muted">
                        Version {chart.versionNumber} | Last modified by {chart.lastModifiedBy}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className={`badge badge-${chart.status === 'ACTIVE' ? 'success' : 'info'}`}>
                      {chart.status}
                    </span>
                  </div>
                </div>
                <div className="diet-chart-item-stats">
                  <div>
                    <span className="text-muted">Total Calories:</span>
                    <strong> {Math.round(chart.totalCalories)} kcal</strong>
                  </div>
                  <div>
                    <span className="text-muted">Avg Daily:</span>
                    <strong> {Math.round(chart.totalCalories / chart.durationDays)} kcal/day</strong>
                  </div>
                  <div>
                    <span className="text-muted">Protein:</span>
                    <strong> {Math.round(chart.totalProtein)}g</strong>
                  </div>
                  <div>
                    <span className="text-muted">Carbs:</span>
                    <strong> {Math.round(chart.totalCarbs)}g</strong>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/dietitian/diet-chart/${chart.id}/edit`)}
                >
                  View & Edit Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loadingCharts && selectedPatient && dietCharts.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Diet Charts Found</h3>
            <p>No diet charts have been created for this patient yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/dietitian/patient/${selectedPatient.id}`)}
            >
              Generate Diet Chart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DietChartViewer;
