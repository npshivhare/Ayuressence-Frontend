// App.jsx
/*import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Auth Components
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import RoleSelection from './components/auth/RoleSelection';

// Dietitian Components
import DietitianDashboard from './components/dietitian/DietitianDashboard';
import PatientManagement from './components/dietitian/PatientManagement';
import PatientProfile from './components/dietitian/PatientProfile';
import UpcomingAppointments from './components/dietitian/UpcomingAppointments';
import FoodTracker from './components/dietitian/FoodTracker';

// Patient Components
import PatientDashboard from './components/patient/PatientDashboard';
import ScheduleAppointment from './components/patient/ScheduleAppointment';
import ViewDietChart from './components/patient/ViewDietChart';
import PatientFoodTracker from './components/patient/FoodTracker';
import AIChatbot from './components/patient/AIChatbot';

// Common Components
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <div className="app-container">
          {user && <Sidebar role={user.role} />}
          <div className={`main-content ${user ? 'with-sidebar' : ''}`}>
            <Routes>
           
              <Route path="/" element={!user ? <RoleSelection /> : <Navigate to={user.role === 'DIETITIAN' ? '/dietitian/dashboard' : '/patient/dashboard'} />} />
              <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={user.role === 'DIETITIAN' ? '/dietitian/dashboard' : '/patient/dashboard'} />} />
              <Route path="/signup/:role" element={!user ? <SignUp onLogin={handleLogin} /> : <Navigate to={user.role === 'DIETITIAN' ? '/dietitian/dashboard' : '/patient/dashboard'} />} />

          
              <Route path="/dietitian/dashboard" element={user && user.role === 'DIETITIAN' ? <DietitianDashboard user={user} /> : <Navigate to="/login" />} />
              <Route path="/dietitian/patients" element={user && user.role === 'DIETITIAN' ? <PatientManagement user={user} /> : <Navigate to="/login" />} />
              <Route path="/dietitian/patient/:patientId" element={user && user.role === 'DIETITIAN' ? <PatientProfile user={user} /> : <Navigate to="/login" />} />
              <Route path="/dietitian/appointments" element={user && user.role === 'DIETITIAN' ? <UpcomingAppointments user={user} /> : <Navigate to="/login" />} />
              <Route path="/dietitian/food-tracker" element={user && user.role === 'DIETITIAN' ? <FoodTracker /> : <Navigate to="/login" />} />

            
              <Route path="/patient/dashboard" element={user && user.role === 'PATIENT' ? <PatientDashboard user={user} /> : <Navigate to="/login" />} />
              <Route path="/patient/schedule-appointment" element={user && user.role === 'PATIENT' ? <ScheduleAppointment user={user} /> : <Navigate to="/login" />} />
              <Route path="/patient/diet-chart" element={user && user.role === 'PATIENT' ? <ViewDietChart user={user} /> : <Navigate to="/login" />} />
              <Route path="/patient/food-tracker" element={user && user.role === 'PATIENT' ? <PatientFoodTracker /> : <Navigate to="/login" />} />
              <Route path="/patient/ai-assistant" element={user && user.role === 'PATIENT' ? <AIChatbot user={user} /> : <Navigate to="/login" />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;*/
// App.jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Auth Components
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import RoleSelection from './components/auth/RoleSelection';

// Dietitian Components
import DietitianDashboard from './components/dietitian/DietitianDashboard';
import PatientManagement from './components/dietitian/PatientManagement';
import PatientProfile from './components/dietitian/PatientProfile';
import UpcomingAppointments from './components/dietitian/UpcomingAppointments';
import FoodTracker from './components/dietitian/FoodTracker';
import DietChartViewer from './components/dietitian/DietChartViewer';

// Patient Components
import PatientDashboard from './components/patient/PatientDashboard';
import ScheduleAppointment from './components/patient/ScheduleAppointment';
import ViewDietChart from './components/patient/ViewDietChart';
import PatientFoodTracker from './components/patient/FoodTracker';
import AIChatbot from './components/patient/AIChatbot';

// Common Components
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import LandingPage from './components/landing/LandingPage';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <div className="app-container">
          {user && <Sidebar role={user.role} />}
          <div className={`main-content ${user ? 'with-sidebar' : ''}`}>
            <Routes>
              {/* Landing Page - Shows first for non-authenticated users */}
              <Route 
                path="/" 
                element={
                  !user ? <LandingPage /> : 
                  <Navigate to={user.role === 'DIETITIAN' ? '/dietitian/dashboard' : '/patient/dashboard'} />
                } 
              />

              {/* Role Selection Route */}
              <Route 
                path="/get-started" 
                element={
                  !user ? <RoleSelection /> : 
                  <Navigate to={user.role === 'DIETITIAN' ? '/dietitian/dashboard' : '/patient/dashboard'} />
                } 
              />

              {/* Auth Routes */}
              <Route 
                path="/login" 
                element={
                  !user ? <Login onLogin={handleLogin} /> : 
                  <Navigate to={user.role === 'DIETITIAN' ? '/dietitian/dashboard' : '/patient/dashboard'} />
                } 
              />
              <Route 
                path="/signup/:role" 
                element={
                  !user ? <SignUp onLogin={handleLogin} /> : 
                  <Navigate to={user.role === 'DIETITIAN' ? '/dietitian/dashboard' : '/patient/dashboard'} />
                } 
              />

              {/* Dietitian Routes */}
              <Route 
                path="/dietitian/dashboard" 
                element={user && user.role === 'DIETITIAN' ? <DietitianDashboard user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dietitian/patients" 
                element={user && user.role === 'DIETITIAN' ? <PatientManagement user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dietitian/patient/:patientId" 
                element={user && user.role === 'DIETITIAN' ? <PatientProfile user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dietitian/appointments" 
                element={user && user.role === 'DIETITIAN' ? <UpcomingAppointments user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dietitian/food-tracker" 
                element={user && user.role === 'DIETITIAN' ? <FoodTracker /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dietitian/diet-charts" 
                element={user && user.role === 'DIETITIAN' ? <DietChartViewer user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dietitian/diet-charts/patient/:patientId" 
                element={user && user.role === 'DIETITIAN' ? <DietChartViewer user={user} /> : <Navigate to="/login" />} 
              />

              {/* Patient Routes */}
              <Route 
                path="/patient/dashboard" 
                element={user && user.role === 'PATIENT' ? <PatientDashboard user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/patient/schedule-appointment" 
                element={user && user.role === 'PATIENT' ? <ScheduleAppointment user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/patient/diet-chart" 
                element={user && user.role === 'PATIENT' ? <ViewDietChart user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/patient/food-tracker" 
                element={user && user.role === 'PATIENT' ? <PatientFoodTracker /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/patient/ai-assistant" 
                element={user && user.role === 'PATIENT' ? <AIChatbot user={user} /> : <Navigate to="/login" />} 
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;