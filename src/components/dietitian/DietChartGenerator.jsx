
// components/dietitian/DietChartGenerator.jsx
/*import { useState, useEffect } from 'react';
import { getAllPatients, generateDietChart } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/dietitian.css';

function DietChartGenerator({ user }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [durationDays, setDurationDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, [user.profileId]);

  const fetchPatients = async () => {
    try {
      const response = await getAllPatients(user.profileId);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Failed to load patients.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDietChart = async (e) => {
    e.preventDefault();
    if (!selectedPatient) return alert('Please select a patient');

    setGenerating(true);
    try {
      const response = await generateDietChart({
        patientId: selectedPatient.id,
        dietitianId: user.profileId,
        durationDays: parseInt(durationDays, 10)
      });

      alert('Diet chart generated successfully!');
      // Redirect to the editor for this new diet chart
      navigate(`/dietitian/diet-chart/${response.data.id}`);
    } catch (error) {
      console.error('Error generating diet chart:', error);
      alert('Failed to generate diet chart. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="loading">Loading patients...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Generate Diet Chart</h1>
        <p className="page-subtitle">
          Create personalized Ayurvedic diet plans for your patients
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleGenerateDietChart}>
         
          <div className="form-group">
            <label className="form-label">Select Patient *</label>
            <select
              className="form-control"
              value={selectedPatient?.id || ''}
              onChange={(e) => {
                const patient = patients.find(p => p.id === parseInt(e.target.value, 10));
                setSelectedPatient(patient || null);
              }}
              required
            >
              <option value="">Choose a patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.age} yrs, BMI: {p.bmi?.toFixed(1)}
                </option>
              ))}
            </select>
          </div>

         
          {selectedPatient && (
            <div className="patient-details-box">
              <h3>Patient Details</h3>
              <div className="grid grid-4">
                <div>
                  <p className="text-muted">Age</p>
                  <h4>{selectedPatient.age} yrs</h4>
                </div>
                <div>
                  <p className="text-muted">Weight</p>
                  <h4>{selectedPatient.weight} kg</h4>
                </div>
                <div>
                  <p className="text-muted">Height</p>
                  <h4>{selectedPatient.height} cm</h4>
                </div>
                <div>
                  <p className="text-muted">BMI</p>
                  <h4>{selectedPatient.bmi?.toFixed(1)}</h4>
                </div>
              </div>

              {selectedPatient.healthCondition && (
                <div className="mt-2">
                  <p className="text-muted">Health Condition</p>
                  <p>{selectedPatient.healthCondition}</p>
                </div>
              )}

              {selectedPatient.allergies && (
                <div className="mt-2">
                  <p className="text-muted">Allergies</p>
                  <p>{selectedPatient.allergies}</p>
                </div>
              )}
            </div>
          )}

        
          <div className="form-group">
            <label className="form-label">Duration (Days) *</label>
            <input
              type="number"
              className="form-control"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              min="1"
              max="30"
              required
            />
            <small className="text-muted">Recommended: 7-14 days</small>
          </div>

          <div className="diet-chart-info">
            <h4>What will be generated:</h4>
            <ul>
              <li>Personalized meal plans for {durationDays} days</li>
              <li>4 meals per day (Breakfast, Lunch, Snack, Dinner)</li>
              <li>Nutritional breakdown for each meal</li>
              <li>Ayurvedic properties (Rasa, Virya, Vipaka, Dosha)</li>
              <li>Calorie-optimized based on patient's BMI and goals</li>
            </ul>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={generating || !selectedPatient}
          >
            {generating ? 'Generating Diet Chart...' : 'Generate Diet Chart'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DietChartGenerator;*/
// components/dietitian/DietChartGenerator.jsx
/*import { useState, useEffect } from 'react';
import { getAllPatients, generateDietChart } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/dietitian.css';

function DietChartGenerator({ user }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [durationDays, setDurationDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, [user.profileId]);

  const fetchPatients = async () => {
    try {
      const response = await getAllPatients(user.profileId);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Failed to load patients.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDietChart = async (e) => {
    e.preventDefault();
    if (!selectedPatient) return alert('Please select a patient');

    setGenerating(true);
    try {
      const response = await generateDietChart({
        patientId: selectedPatient.id,
        dietitianId: user.profileId,
        durationDays: parseInt(durationDays, 10)
      });

      alert('Diet chart generated successfully!');
      // Redirect to the editor with /edit route
      navigate(`/dietitian/diet-chart/${response.data.id}/edit`);
    } catch (error) {
      console.error('Error generating diet chart:', error);
      alert('Failed to generate diet chart. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="loading">Loading patients...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Generate Diet Chart</h1>
        <p className="page-subtitle">
          Create personalized Ayurvedic diet plans for your patients
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleGenerateDietChart}>
          <div className="form-group">
            <label className="form-label">Select Patient *</label>
            <select
              className="form-control"
              value={selectedPatient?.id || ''}
              onChange={(e) => {
                const patient = patients.find(p => p.id === parseInt(e.target.value, 10));
                setSelectedPatient(patient || null);
              }}
              required
            >
              <option value="">Choose a patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.age} yrs, BMI: {p.bmi?.toFixed(1)}
                </option>
              ))}
            </select>
          </div>

          {selectedPatient && (
            <div className="patient-details-box">
              <h3>Patient Details</h3>
              <div className="grid grid-4">
                <div>
                  <p className="text-muted">Age</p>
                  <h4>{selectedPatient.age} yrs</h4>
                </div>
                <div>
                  <p className="text-muted">Weight</p>
                  <h4>{selectedPatient.weight} kg</h4>
                </div>
                <div>
                  <p className="text-muted">Height</p>
                  <h4>{selectedPatient.height} cm</h4>
                </div>
                <div>
                  <p className="text-muted">BMI</p>
                  <h4>{selectedPatient.bmi?.toFixed(1)}</h4>
                </div>
              </div>

              {selectedPatient.healthCondition && (
                <div className="mt-2">
                  <p className="text-muted">Health Condition</p>
                  <p>{selectedPatient.healthCondition}</p>
                </div>
              )}

              {selectedPatient.allergies && (
                <div className="mt-2">
                  <p className="text-muted">Allergies</p>
                  <p>{selectedPatient.allergies}</p>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Duration (Days) *</label>
            <input
              type="number"
              className="form-control"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              min="1"
              max="30"
              required
            />
            <small className="text-muted">Recommended: 7-14 days</small>
          </div>

          <div className="diet-chart-info">
            <h4>What will be generated:</h4>
            <ul>
              <li>Personalized meal plans for {durationDays} days</li>
              <li>4 meals per day (Breakfast, Lunch, Snack, Dinner)</li>
              <li>Nutritional breakdown for each meal</li>
              <li>Ayurvedic properties (Rasa, Virya, Vipaka, Dosha)</li>
              <li>Calorie-optimized based on patient's BMI and goals</li>
              <li>Editable food items from database</li>
            </ul>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={generating || !selectedPatient}
          >
            {generating ? 'Generating Diet Chart...' : 'Generate Diet Chart'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DietChartGenerator;*/
