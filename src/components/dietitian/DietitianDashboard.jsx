// DietitianDashboard.jsx
import { useState, useEffect } from 'react';
import { getDietitianDashboard, getAllPatients, getUpcomingAppointments } from '../../services/api';
import { formatDateTime } from '../../utils/helpers';
import '../../styles/dashboard.css';

function DietitianDashboard({ user }) {
  const [dashboard, setDashboard] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user.profileId]);

  const fetchDashboardData = async () => {
    try {
      const [dashRes, patientsRes, appointmentsRes] = await Promise.all([
        getDietitianDashboard(user.profileId),
        getAllPatients(user.profileId),
        getUpcomingAppointments(user.profileId)
      ]);

      setDashboard(dashRes.data);
      setRecentPatients(patientsRes.data.slice(0, 5));
      setUpcomingAppointments(appointmentsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">👥</div>
          <div className="stat-details">
            <h3>{dashboard.totalPatients}</h3>
            <p>Total Patients</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">📋</div>
          <div className="stat-details">
            <h3>{dashboard.activeDietCharts}</h3>
            <p>Active Diet Charts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">📅</div>
          <div className="stat-details">
            <h3>{dashboard.upcomingAppointments}</h3>
            <p>Upcoming Appointments</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">💬</div>
          <div className="stat-details">
            <h3>{dashboard.totalConsultations}</h3>
            <p>Total Consultations</p>
          </div>
        </div>
      </div>

      {/* Recent Patients & Appointments */}
      <div className="grid grid-2">
        {/* Recent Patients */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Patients</h2>
            <a href="/dietitian/patients" className="btn btn-sm btn-outline">View All</a>
          </div>
          <div className="card-body">
            {recentPatients.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentPatients.map((patient) => (
                  <a
                    key={patient.id}
                    href={`/dietitian/patient/${patient.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="patient-card">
                      <div className="patient-card-header">
                        <div className="patient-avatar">
                          {patient.name.charAt(0)}
                        </div>
                        <div className="patient-info" style={{ flex: 1 }}>
                          <h3>{patient.name}</h3>
                          <p>{patient.age} years • {patient.gender}</p>
                        </div>
                      </div>
                      <div className="patient-stats">
                        <div className="patient-stat">
                          <div className="patient-stat-value">{patient.weight}</div>
                          <div className="patient-stat-label">Weight (kg)</div>
                        </div>
                        <div className="patient-stat">
                          <div className="patient-stat-value">{patient.bmi?.toFixed(1)}</div>
                          <div className="patient-stat-label">BMI</div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <h3>No Patients Yet</h3>
                <p>Patients will appear here once they book appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Upcoming Appointments</h2>
            <a href="/dietitian/appointments" className="btn btn-sm btn-outline">View All</a>
          </div>
          <div className="card-body">
            {upcomingAppointments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-header">
                      <div className="appointment-patient">
                        {appointment.patient.name}
                      </div>
                      <span className="badge badge-warning">{appointment.status}</span>
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
                <h3>No Upcoming Appointments</h3>
                <p>Your schedule is clear for now</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietitianDashboard;