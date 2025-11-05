// UpcomingAppointments.jsx
import { useState, useEffect } from 'react';
import { getUpcomingAppointments, updateAppointmentStatus } from '../../services/api';
import { formatDateTime } from '../../utils/helpers';
import '../../styles/dashboard.css';

function UpcomingAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [user.profileId]);

  const fetchAppointments = async () => {
    try {
      const response = await getUpcomingAppointments(user.profileId);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      fetchAppointments(); // Refresh list
      alert(`Appointment ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Upcoming Appointments</h1>
        <p className="page-subtitle">Manage your consultation schedule</p>
      </div>

      {appointments.length > 0 ? (
        <div className="grid grid-2">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div>
                  <div className="appointment-patient">{appointment.patient.name}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-light)', marginTop: '4px' }}>
                    {appointment.patient.email}
                  </div>
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
                <div className="appointment-notes">
                  <strong>Notes:</strong> "{appointment.notes}"
                </div>
              )}

              <div style={{ 
                marginTop: '12px', 
                padding: '12px', 
                background: 'var(--bg-light)', 
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <p><strong>Age:</strong> {appointment.patient.age} years</p>
                <p><strong>Weight:</strong> {appointment.patient.weight} kg</p>
                <p><strong>BMI:</strong> {appointment.patient.bmi?.toFixed(1)}</p>
                {appointment.patient.healthCondition && (
                  <p><strong>Condition:</strong> {appointment.patient.healthCondition}</p>
                )}
              </div>

              {appointment.status === 'PENDING' && (
                <div className="appointment-actions">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                  >
                    ✓ Complete
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}
                  >
                    × Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <h3>No Upcoming Appointments</h3>
            <p>Your schedule is clear for now</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpcomingAppointments;