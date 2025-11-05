// PatientManagement.jsx
/*import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPatients } from '../../services/api';
import '../../styles/dashboard.css';

function PatientManagement({ user }) {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading patients...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Patient Management</h1>
        <p className="page-subtitle">View and manage all your patients</p>
      </div>


      <div className="card">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <div className="grid grid-3">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="patient-card"
              onClick={() => navigate(`/dietitian/patient/${patient.id}`)}
            >
              <div className="patient-card-header">
                <div className="patient-avatar">
                  {patient.name.charAt(0)}
                </div>
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p>{patient.email}</p>
                </div>
              </div>

              <div style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-light)' }}>
                <p><strong>Age:</strong> {patient.age} years</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                {patient.healthCondition && (
                  <p><strong>Condition:</strong> {patient.healthCondition}</p>
                )}
                {patient.allergies && (
                  <p><strong>Allergies:</strong> {patient.allergies}</p>
                )}
              </div>

              <div className="patient-stats">
                <div className="patient-stat">
                  <div className="patient-stat-value">{patient.weight}</div>
                  <div className="patient-stat-label">Weight (kg)</div>
                </div>
                <div className="patient-stat">
                  <div className="patient-stat-value">{patient.height}</div>
                  <div className="patient-stat-label">Height (cm)</div>
                </div>
                <div className="patient-stat">
                  <div className="patient-stat-value">{patient.bmi?.toFixed(1)}</div>
                  <div className="patient-stat-label">BMI</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No Patients Found</h3>
            <p>
              {searchTerm ? 'Try adjusting your search' : 'Patients will appear here once they book appointments'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientManagement;*/
// components/dietitian/PatientManagement.jsx
/*import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPatients } from '../../services/api';
import '../../styles/dashboard.css';

function PatientManagement({ user }) {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (patientId) => {
    navigate(`/dietitian/patient/${patientId}`);
  };

  const handleViewDietCharts = (e, patientId) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/dietitian/diet-charts/patient/${patientId}`);
  };

  if (loading) {
    return <div className="loading">Loading patients...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Patient Management</h1>
        <p className="page-subtitle">View and manage all your patients</p>
      </div>

      <div className="card">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredPatients.length > 0 && (
          <p className="text-muted" style={{ marginTop: '8px' }}>
            Showing {filteredPatients.length} of {patients.length} patients
          </p>
        )}
      </div>

      {filteredPatients.length > 0 ? (
        <div className="grid grid-3">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="patient-card"
              onClick={() => handleViewPatient(patient.id)}
            >
              <div className="patient-card-header">
                <div className="patient-avatar">
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p>{patient.email}</p>
                </div>
              </div>

              <div style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-light)' }}>
                <p><strong>Age:</strong> {patient.age} years</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                {patient.healthCondition && (
                  <p><strong>Condition:</strong> {patient.healthCondition}</p>
                )}
                {patient.allergies && (
                  <p><strong>Allergies:</strong> {patient.allergies}</p>
                )}
              </div>

              <div className="patient-stats">
                <div className="patient-stat">
                  <div className="patient-stat-value">{patient.weight}</div>
                  <div className="patient-stat-label">Weight (kg)</div>
                </div>
                <div className="patient-stat">
                  <div className="patient-stat-value">{patient.height}</div>
                  <div className="patient-stat-label">Height (cm)</div>
                </div>
                <div className="patient-stat">
                  <div className="patient-stat-value">{patient.bmi?.toFixed(1)}</div>
                  <div className="patient-stat-label">BMI</div>
                </div>
              </div>

              <div style={{ 
                marginTop: '16px', 
                paddingTop: '12px', 
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewPatient(patient.id);
                  }}
                  style={{ flex: 1 }}
                >
                  View Profile
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={(e) => handleViewDietCharts(e, patient.id)}
                  style={{ flex: 1 }}
                >
                  Diet Charts
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No Patients Found</h3>
            <p>
              {searchTerm 
                ? 'Try adjusting your search criteria' 
                : 'Patients will appear here once they book appointments'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientManagement;*/
// components/dietitian/PatientManagement.jsx
// components/dietitian/PatientManagement.jsx
// components/dietitian/PatientManagement.jsx
// components/dietitian/PatientManagement.jsx
// components/dietitian/PatientManagement.jsx
import { useState, useEffect } from 'react';
import { 
  getAllPatients, 
  getPatientProfile, 
  generateDietChart, 
  searchFoodsInDatabase,
  addFoodToMeal,
  deleteMealFood,
  updateFoodQuantity,
  getDietChartDetails
} from '../../services/api';
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

function PatientManagement({ user }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedChartId, setExpandedChartId] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [durationDays, setDurationDays] = useState(7);
  const [generating, setGenerating] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [currentDietChartId, setCurrentDietChartId] = useState(null);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [foodSearchResults, setFoodSearchResults] = useState([]);
  const [mealFoods, setMealFoods] = useState([]);
  const [searchingFood, setSearchingFood] = useState(false);

  useEffect(() => {
    if (user?.profileId) {
      // Save user ID to localStorage for API calls
      localStorage.setItem('userId', user.profileId);
      // Also save full user object as backup
      localStorage.setItem('user', JSON.stringify(user));
      fetchPatients();
    }
  }, [user?.profileId]);

  const fetchPatients = async () => {
    try {
      const response = await getAllPatients(user.profileId);
      setPatients(response.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Failed to load patients. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientClick = async (patient) => {
    setSelectedPatient(patient);
    setDetailsLoading(true);
    setExpandedChartId(null);
    setSelectedDay(1);
    try {
      const response = await getPatientProfile(patient.id);
      setPatientDetails(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      alert('Failed to load patient details.');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setPatientDetails(null);
    setExpandedChartId(null);
    setSelectedDay(1);
    setShowGenerateModal(false);
    setEditingMeal(null);
  };

  const toggleChartExpansion = (chartId) => {
    if (expandedChartId === chartId) {
      setExpandedChartId(null);
      setSelectedDay(1);
    } else {
      setExpandedChartId(chartId);
      setSelectedDay(1);
    }
  };

  const handleGenerateDietChart = async () => {
    setGenerating(true);
    try {
      await generateDietChart({
        patientId: selectedPatient.id,
        dietitianId: user.profileId,
        durationDays: parseInt(durationDays)
      });
      
      setShowGenerateModal(false);
      
      const updatedProfile = await getPatientProfile(selectedPatient.id);
      setPatientDetails(updatedProfile.data);
      
      alert('Diet chart generated successfully!');
      
      if (updatedProfile.data?.dietCharts?.length > 0) {
        setExpandedChartId(updatedProfile.data.dietCharts[0].id);
      }
    } catch (error) {
      console.error('Error generating diet chart:', error);
      alert('Failed to generate diet chart. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleEditMeal = async (meal, dietChartId) => {
    setEditingMeal(meal.id);
    setCurrentDietChartId(dietChartId);
    
    // Get meal foods if they exist
    setMealFoods(meal.mealFoods || []);
    
    setFoodSearchResults([]);
    setFoodSearchQuery('');
  };

  const handleFoodSearch = async (query) => {
    setFoodSearchQuery(query);
    if (query.length < 2) {
      setFoodSearchResults([]);
      return;
    }
    
    setSearchingFood(true);
    try {
      const response = await searchFoodsInDatabase(query);
      setFoodSearchResults(response.data || []);
    } catch (error) {
      console.error('Error searching foods:', error);
      setFoodSearchResults([]);
    } finally {
      setSearchingFood(false);
    }
  };

  const handleAddFood = async (food) => {
    if (!currentDietChartId || !editingMeal) {
      alert('Please select a meal to edit first');
      return;
    }

    const defaultQuantity = 100;
    
    // Save dietitian ID to localStorage for API calls
    if (user?.profileId) {
      localStorage.setItem('userId', user.profileId);
    }
    
    try {
      const response = await addFoodToMeal(
        currentDietChartId,
        editingMeal,
        {
          foodId: food.id,
          quantity: defaultQuantity
        }
      );
      
      // Refresh patient details to get updated meal
      await refreshPatientDetails();
      
      setFoodSearchQuery('');
      setFoodSearchResults([]);
      
      alert('Food added successfully!');
    } catch (error) {
      console.error('Error adding food:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to add food: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleRemoveFood = async (mealFoodId) => {
    if (!currentDietChartId || !editingMeal) return;
    
    if (!window.confirm('Are you sure you want to remove this food item?')) {
      return;
    }
    
    // Save dietitian ID to localStorage for API calls
    if (user?.profileId) {
      localStorage.setItem('userId', user.profileId);
    }
    
    try {
      await deleteMealFood(currentDietChartId, editingMeal, mealFoodId);
      
      // Refresh patient details
      await refreshPatientDetails();
      
      alert('Food removed successfully!');
    } catch (error) {
      console.error('Error removing food:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to remove food: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleFoodQuantityChange = async (mealFoodId, newQuantity) => {
    if (!currentDietChartId || !editingMeal || newQuantity <= 0) return;
    
    // Save dietitian ID to localStorage for API calls
    if (user?.profileId) {
      localStorage.setItem('userId', user.profileId);
    }
    
    try {
      await updateFoodQuantity(
        currentDietChartId,
        editingMeal,
        mealFoodId,
        parseFloat(newQuantity)
      );
      
      // Refresh patient details to get updated nutrition
      await refreshPatientDetails();
    } catch (error) {
      console.error('Error updating quantity:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to update quantity: ${error.response?.data?.message || error.message}`);
    }
  };

  const refreshPatientDetails = async () => {
    try {
      const response = await getPatientProfile(selectedPatient.id);
      setPatientDetails(response.data);
      
      // Update meal foods for current editing meal
      const currentChart = response.data.dietCharts?.find(c => c.id === currentDietChartId);
      const currentMeal = currentChart?.meals?.find(m => m.id === editingMeal);
      if (currentMeal) {
        setMealFoods(currentMeal.mealFoods || []);
        
        // Update the foodItems text display
        if (currentMeal.mealFoods && currentMeal.mealFoods.length > 0) {
          const foodItemsText = currentMeal.mealFoods
            .map(mf => `${mf.food?.name || 'Unknown'} (${mf.quantity}g)`)
            .join(', ');
          
          // Update the meal's foodItems field in the state
          setPatientDetails(prevDetails => ({
            ...prevDetails,
            dietCharts: prevDetails.dietCharts.map(chart => 
              chart.id === currentDietChartId 
                ? {
                    ...chart,
                    meals: chart.meals.map(meal =>
                      meal.id === editingMeal
                        ? { ...meal, foodItems: foodItemsText }
                        : meal
                    )
                  }
                : chart
            )
          }));
        }
      }
    } catch (error) {
      console.error('Error refreshing patient details:', error);
    }
  };

  const handleFinishEditing = () => {
    setEditingMeal(null);
    setCurrentDietChartId(null);
    setMealFoods([]);
    setFoodSearchResults([]);
    setFoodSearchQuery('');
  };

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getWeightChartData = () => {
    if (!patientDetails?.healthParameters?.length) return null;
    
    const params = patientDetails.healthParameters.slice(0, 10).reverse();
    return {
      labels: params.map(p => formatDate(p.date)),
      datasets: [
        {
          label: 'Weight (kg)',
          data: params.map(p => p.weight),
          borderColor: 'rgb(45, 106, 79)',
          backgroundColor: 'rgba(45, 106, 79, 0.1)',
          tension: 0.4
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weight Tracking Over Time' }
    },
    scales: { y: { beginAtZero: false } }
  };

  if (loading) {
    return <div className="loading">Loading patients...</div>;
  }

  if (!selectedPatient) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Patient Management</h1>
          <p className="page-subtitle">View and manage all your patients</p>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search patients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredPatients.length > 0 ? (
          <div className="grid grid-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="card"
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => handlePatientClick(patient)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: '700'
                  }}>
                    {patient.name?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0, fontSize: '18px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {patient.name}
                    </h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--text-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {patient.email}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '12px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '12px' }}>
                  <div className="grid grid-2" style={{ gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0 }}>Age</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0 0 0' }}>{patient.age} years</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0 }}>Gender</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0 0 0' }}>{patient.gender}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-3" style={{ gap: '12px' }}>
                  <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)' }}>{patient.weight}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>Weight (kg)</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)' }}>{patient.height}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>Height (cm)</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)' }}>{patient.bmi?.toFixed(1)}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>BMI</div>
                  </div>
                </div>

                <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '16px' }}>
                  View Full Profile
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h3>No Patients Found</h3>
              <p>{searchTerm ? 'Try adjusting your search criteria' : 'Patients will appear here once they book appointments with you'}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (detailsLoading) {
    return <div className="loading">Loading patient details...</div>;
  }

  const patient = patientDetails?.patient;
  const healthParameters = patientDetails?.healthParameters || [];
  const dietCharts = patientDetails?.dietCharts || [];

  return (
    <div>
      <div className="page-header">
        <button className="btn btn-outline" onClick={handleBackToList}>
          ← Back to Patients
        </button>
        <h1 className="page-title">{patient?.name}'s Profile</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowGenerateModal(true)}
        >
          + Generate Diet Chart
        </button>
      </div>

      <div className="card">
        <h2 className="section-title">Patient Information</h2>
        <div className="grid grid-4">
          <div>
            <p className="text-muted">Name</p>
            <h3>{patient?.name}</h3>
          </div>
          <div>
            <p className="text-muted">Age</p>
            <h3>{patient?.age} years</h3>
          </div>
          <div>
            <p className="text-muted">Gender</p>
            <h3>{patient?.gender}</h3>
          </div>
          <div>
            <p className="text-muted">Email</p>
            <h3 style={{fontSize: '16px'}}>{patient?.email}</h3>
          </div>
        </div>

        <div className="grid grid-4 mt-3">
          <div>
            <p className="text-muted">Weight</p>
            <h3>{patient?.weight} kg</h3>
          </div>
          <div>
            <p className="text-muted">Height</p>
            <h3>{patient?.height} cm</h3>
          </div>
          <div>
            <p className="text-muted">BMI</p>
            <h3>{patient?.bmi?.toFixed(1)} <span className="text-muted" style={{fontSize: '14px'}}>({getBMICategory(patient?.bmi)})</span></h3>
          </div>
          <div>
            <p className="text-muted">Status</p>
            <span className={`badge badge-${patient?.bmi < 18.5 ? 'warning' : patient?.bmi > 25 ? 'danger' : 'success'}`}>
              {getBMICategory(patient?.bmi)}
            </span>
          </div>
        </div>

        <div className="grid grid-2 mt-3">
          <div>
            <p className="text-muted">Health Condition</p>
            <h3 style={{fontSize: '16px'}}>{patient?.healthCondition || 'None reported'}</h3>
          </div>
          <div>
            <p className="text-muted">Allergies</p>
            <h3 style={{fontSize: '16px'}}>{patient?.allergies || 'None reported'}</h3>
          </div>
        </div>
      </div>

      {healthParameters.length > 0 ? (
        <div className="card">
          <h2 className="section-title">Health Tracking</h2>
          <div className="grid grid-2">
            <div>
              {getWeightChartData() && <Line data={getWeightChartData()} options={chartOptions} />}
            </div>
            
            <div>
              <h3 className="mb-3">Recent Health Parameters</h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {healthParameters.slice(0, 5).map((param) => (
                  <div key={param.id} style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                    <p><strong>Date:</strong> {formatDate(param.date)}</p>
                    <div className="grid grid-2" style={{ gap: '8px', marginTop: '8px' }}>
                      <p><strong>Weight:</strong> {param.weight} kg</p>
                      <p><strong>Water:</strong> {param.waterIntake} L</p>
                      <p><strong>Meals:</strong> {param.mealFrequency} times/day</p>
                      <p><strong>Sleep:</strong> {param.sleepHours} hrs</p>
                      <p><strong>Bowel:</strong> {param.bowelMovement}</p>
                      <p><strong>Calories:</strong> {param.caloriesBurnt} kcal</p>
                      <p><strong>Stress:</strong> {param.stressLevel}</p>
                      <p><strong>Energy:</strong> {param.energyLevel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-3">Complete Health History</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Weight (kg)</th>
                    <th>Meals</th>
                    <th>Water (L)</th>
                    <th>Sleep (hrs)</th>
                    <th>Bowel</th>
                    <th>Stress</th>
                    <th>Energy</th>
                  </tr>
                </thead>
                <tbody>
                  {healthParameters.map((param) => (
                    <tr key={param.id}>
                      <td>{formatDate(param.date)}</td>
                      <td>{param.weight}</td>
                      <td>{param.mealFrequency}</td>
                      <td>{param.waterIntake}</td>
                      <td>{param.sleepHours}</td>
                      <td>{param.bowelMovement}</td>
                      <td>{param.stressLevel}</td>
                      <td>{param.energyLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <h3>No Health Data Available</h3>
            <p>Patient has not added any health parameters yet</p>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="section-title">Diet Charts</h2>
        {dietCharts.length > 0 ? (
          <div>
            {dietCharts.map((chart) => (
              <div key={chart.id} style={{ marginBottom: '24px', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    padding: '20px', 
                    background: expandedChartId === chart.id ? 'var(--bg-light)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => toggleChartExpansion(chart.id)}
                >
                  <div className="grid grid-4" style={{ gap: '20px' }}>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>Created Date</p>
                      <h4 style={{ margin: 0 }}>{formatDate(chart.createdDate)}</h4>
                    </div>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>Duration</p>
                      <h4 style={{ margin: 0 }}>{chart.durationDays} days</h4>
                    </div>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>Status</p>
                      <span className={`badge badge-${chart.status === 'ACTIVE' ? 'success' : chart.status === 'COMPLETED' ? 'info' : 'danger'}`}>
                        {chart.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>Avg Calories/Day</p>
                      <h4 style={{ margin: 0 }}>{Math.round(chart.totalCalories / chart.durationDays)} kcal</h4>
                    </div>
                  </div>

                  <div className="grid grid-4" style={{ gap: '20px', marginTop: '16px' }}>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>Start Date</p>
                      <p style={{ margin: 0, fontWeight: '500' }}>{formatDate(chart.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>End Date</p>
                      <p style={{ margin: 0, fontWeight: '500' }}>{formatDate(chart.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>Protein/Day</p>
                      <p style={{ margin: 0, fontWeight: '500' }}>{Math.round(chart.totalProtein / chart.durationDays)}g</p>
                    </div>
                    <div>
                      <p className="text-muted" style={{ marginBottom: '4px' }}>Carbs/Day</p>
                      <p style={{ margin: 0, fontWeight: '500' }}>{Math.round(chart.totalCarbs / chart.durationDays)}g</p>
                    </div>
                  </div>

                  <button 
                    className="btn btn-outline btn-sm" 
                    style={{ marginTop: '16px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChartExpansion(chart.id);
                    }}
                  >
                    {expandedChartId === chart.id ? '▼ Hide Meal Details' : '▶ View Meal Details'}
                  </button>
                </div>

                {expandedChartId === chart.id && (
                  <div style={{ padding: '20px', background: 'white', borderTop: '2px solid var(--border-color)' }}>
                    <div style={{ 
                      background: 'var(--bg-light)', 
                      padding: '20px', 
                      borderRadius: '12px',
                      marginBottom: '24px'
                    }}>
                      <h4 style={{ marginBottom: '16px' }}>Daily Nutritional Breakdown (Average)</h4>
                      <div className="grid grid-4">
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-color)' }}>
                            {Math.round(chart.totalProtein / chart.durationDays)}g
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Protein</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary-color)' }}>
                            {Math.round(chart.totalCarbs / chart.durationDays)}g
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Carbs</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-color)' }}>
                            {Math.round(chart.totalFats / chart.durationDays)}g
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Fats</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success-color)' }}>
                            {Math.round(chart.totalFiber / chart.durationDays)}g
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Fiber</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ marginBottom: '12px' }}>Select Day</h4>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {Array.from({ length: chart.durationDays }, (_, i) => i + 1).map((day) => (
                          <button
                            key={day}
                            className={`btn ${selectedDay === day ? 'btn-primary' : 'btn-outline'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDay(day);
                            }}
                            style={{ minWidth: '80px' }}
                          >
                            Day {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: '16px' }}>
                      {chart.meals
                        ?.filter(meal => meal.dayNumber === selectedDay)
                        .map((meal) => {
                          const isEditing = editingMeal === meal.id;
                          const currentMealFoods = isEditing ? mealFoods : (meal.mealFoods || []);
                          
                          return (
                            <div key={meal.id} style={{ 
                              border: '1px solid var(--border-color)', 
                              borderRadius: '12px', 
                              padding: '20px',
                              background: isEditing ? 'var(--bg-light)' : 'white',
                              position: 'relative'
                            }}>
                              {!isEditing && (
                                <button
                                  className="btn btn-outline btn-sm"
                                  style={{ 
                                    position: 'absolute', 
                                    top: '12px', 
                                    right: '12px',
                                    padding: '6px 12px'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditMeal(meal, chart.id);
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                              )}

                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '16px',
                                marginRight: isEditing ? '0' : '80px'
                              }}>
                                <span className={`badge badge-${
                                  meal.mealType === 'BREAKFAST' ? 'success' : 
                                  meal.mealType === 'LUNCH' ? 'warning' : 
                                  meal.mealType === 'SNACK' ? 'info' : 'primary'
                                }`} style={{ fontSize: '14px', padding: '8px 16px' }}>
                                  {meal.mealType}
                                </span>
                                <span style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                                  {meal.timing}
                                </span>
                              </div>

                              {/* Food Items Section */}
                              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Food Items</h3>
                              
                              {isEditing ? (
                                <div style={{ marginBottom: '16px' }}>
                                  {/* Food Search */}
                                  <div style={{ marginBottom: '12px' }}>
                                    <label className="form-label" style={{ fontSize: '12px' }}>Search and Add Foods</label>
                                    <div style={{ position: 'relative' }}>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search for foods..."
                                        value={foodSearchQuery}
                                        onChange={(e) => handleFoodSearch(e.target.value)}
                                      />
                                      {searchingFood && (
                                        <div style={{ 
                                          position: 'absolute', 
                                          right: '10px', 
                                          top: '50%', 
                                          transform: 'translateY(-50%)',
                                          fontSize: '12px',
                                          color: 'var(--text-light)'
                                        }}>
                                          Searching...
                                        </div>
                                      )}
                                      
                                      {/* Search Results Dropdown */}
                                      {foodSearchResults.length > 0 && (
                                        <div style={{
                                          position: 'absolute',
                                          top: '100%',
                                          left: 0,
                                          right: 0,
                                          background: 'white',
                                          border: '1px solid var(--border-color)',
                                          borderRadius: '8px',
                                          marginTop: '4px',
                                          maxHeight: '200px',
                                          overflowY: 'auto',
                                          zIndex: 1000,
                                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                        }}>
                                          {foodSearchResults.map((food) => (
                                            <div
                                              key={food.id}
                                              style={{
                                                padding: '12px',
                                                borderBottom: '1px solid var(--border-color)',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                              }}
                                              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-light)'}
                                              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddFood(food);
                                              }}
                                            >
                                              <div style={{ fontWeight: '600', fontSize: '14px' }}>{food.name}</div>
                                              <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                                                {food.category} • {food.calories} kcal/100g
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Current Meal Foods */}
                                  {currentMealFoods.length > 0 && (
                                    <div style={{ 
                                      background: 'white', 
                                      padding: '12px', 
                                      borderRadius: '8px',
                                      marginBottom: '12px',
                                      border: '1px solid var(--border-color)'
                                    }}>
                                      <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                                        Current Foods:
                                      </div>
                                      {currentMealFoods.map((mealFood) => (
                                        <div 
                                          key={mealFood.id} 
                                          style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '8px',
                                            padding: '8px',
                                            background: 'var(--bg-light)',
                                            borderRadius: '6px',
                                            marginBottom: '6px'
                                          }}
                                        >
                                          <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '13px', fontWeight: '600' }}>
                                              {mealFood.food?.name || 'Unknown Food'}
                                            </div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                                              Cal: {mealFood.calories?.toFixed(0)} • 
                                              P: {mealFood.protein?.toFixed(1)}g • 
                                              C: {mealFood.carbs?.toFixed(1)}g • 
                                              F: {mealFood.fats?.toFixed(1)}g
                                            </div>
                                          </div>
                                          <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '80px', padding: '4px 8px', fontSize: '12px' }}
                                            value={mealFood.quantity}
                                            onChange={(e) => {
                                              const newQty = parseFloat(e.target.value);
                                              if (newQty > 0) {
                                                handleFoodQuantityChange(mealFood.id, newQty);
                                              }
                                            }}
                                            min="1"
                                            step="1"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <span style={{ fontSize: '12px', color: 'var(--text-light)', minWidth: '20px' }}>g</span>
                                          <button
                                            className="btn btn-outline btn-sm"
                                            style={{ padding: '4px 8px', fontSize: '12px', color: 'red' }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleRemoveFood(mealFood.id);
                                            }}
                                          >
                                            ×
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Finish Editing Button */}
                                  <button
                                    className="btn btn-primary btn-sm"
                                    style={{ width: '100%' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleFinishEditing();
                                    }}
                                  >
                                    ✓ Done Editing
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  {/* Display foods from database if available */}
                                  {meal.mealFoods && meal.mealFoods.length > 0 ? (
                                    <div style={{ 
                                      background: 'var(--bg-light)', 
                                      padding: '12px', 
                                      borderRadius: '8px',
                                      marginBottom: '16px'
                                    }}>
                                      {meal.mealFoods.map((mealFood, index) => (
                                        <div 
                                          key={mealFood.id || index}
                                          style={{
                                            padding: '8px',
                                            background: 'white',
                                            borderRadius: '6px',
                                            marginBottom: index < meal.mealFoods.length - 1 ? '6px' : '0',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                          }}
                                        >
                                          <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                              {mealFood.food?.name || 'Unknown Food'}
                                            </div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                                              {mealFood.food?.category} • {mealFood.quantity}g
                                            </div>
                                          </div>
                                          <div style={{ fontSize: '12px', color: 'var(--text-light)', textAlign: 'right' }}>
                                            <div>{mealFood.calories?.toFixed(0)} kcal</div>
                                            <div>P: {mealFood.protein?.toFixed(1)}g | C: {mealFood.carbs?.toFixed(1)}g | F: {mealFood.fats?.toFixed(1)}g</div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p style={{ 
                                      background: 'var(--bg-light)', 
                                      padding: '12px', 
                                      borderRadius: '8px',
                                      fontSize: '15px',
                                      lineHeight: '1.6',
                                      marginBottom: '16px'
                                    }}>
                                      {meal.foodItems || 'No food items specified'}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Nutritional Information */}
                              <h4 style={{ fontSize: '15px', marginBottom: '12px' }}>Nutritional Information</h4>
                              <div className="grid grid-3" style={{ gap: '8px', marginBottom: '16px' }}>
                                <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{parseFloat(meal.calories).toFixed(2)}</div>
                                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Calories</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{parseFloat(meal.protein).toFixed(2)}g</div>
                                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Protein</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{parseFloat(meal.carbs).toFixed(2)}g</div>
                                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Carbs</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{parseFloat(meal.fats).toFixed(2)}g</div>
                                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Fats</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '8px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{parseFloat(meal.fiber).toFixed(2)}g</div>
                                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Fiber</div>
                                </div>
                              </div>

                              {/* Ayurvedic Properties */}
                              <h4 style={{ fontSize: '15px', marginBottom: '12px' }}>Ayurvedic Properties</h4>
                              <div style={{ 
                                background: 'var(--bg-light)', 
                                padding: '12px', 
                                borderRadius: '8px',
                                fontSize: '13px',
                                marginBottom: '12px'
                              }}>
                                <p style={{ margin: '4px 0' }}><strong>Rasa (Taste):</strong> {meal.rasa}</p>
                                <p style={{ margin: '4px 0' }}><strong>Virya (Potency):</strong> {meal.virya}</p>
                                <p style={{ margin: '4px 0' }}><strong>Vipaka:</strong> {meal.vipaka}</p>
                                <p style={{ margin: '4px 0' }}><strong>Dosha Effect:</strong> {meal.dosha}</p>
                              </div>

                              {/* Benefits */}
                              <div style={{ 
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                padding: '12px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                lineHeight: '1.6'
                              }}>
                                <strong>Benefits:</strong> {meal.benefits}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Diet Charts Yet</h3>
            <p>Generate a personalized diet chart for this patient</p>
          </div>
        )}
      </div>

      {/* Generate Diet Chart Modal */}
      {showGenerateModal && (
        <div className="modal-overlay" onClick={() => setShowGenerateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h2 className="card-title">Generate Diet Chart for {patient?.name}</h2>
              <button className="close-btn" onClick={() => setShowGenerateModal(false)}>×</button>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ 
                background: 'var(--bg-light)', 
                padding: '16px', 
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>Patient Information</h4>
                <div className="grid grid-3" style={{ gap: '12px', fontSize: '13px' }}>
                  <p><strong>Age:</strong> {patient?.age} years</p>
                  <p><strong>Weight:</strong> {patient?.weight} kg</p>
                  <p><strong>BMI:</strong> {patient?.bmi?.toFixed(1)}</p>
                  <p><strong>Health:</strong> {patient?.healthCondition || 'None'}</p>
                  <p><strong>Allergies:</strong> {patient?.allergies || 'None'}</p>
                </div>
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
                <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
                  AI will generate a personalized Ayurvedic diet chart based on patient's profile
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleGenerateDietChart}
                  disabled={generating}
                >
                  {generating ? 'Generating...' : '✨ Generate Diet Chart'}
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
        </div>
      )}
    </div>
  );
}

export default PatientManagement;