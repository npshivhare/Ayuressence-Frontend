// components/patient/ScheduleAppointment.jsx
import { useState, useEffect } from 'react';
import { getAllDietitians, bookAppointment } from '../../services/api';
import '../../styles/patient.css';

function ScheduleAppointment({ user }) {
  const [dietitians, setDietitians] = useState([]);
  const [selectedDietitian, setSelectedDietitian] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDietitians();
  }, []);

  const fetchDietitians = async () => {
    try {
      const response = await getAllDietitians();
      setDietitians(response.data);
    } catch (error) {
      console.error('Error fetching dietitians:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDietitian) {
      alert('Please select a dietitian');
      return;
    }

    setSubmitting(true);
    try {
      const dateTime = `${appointmentDate}T${appointmentTime}:00`;
      await bookAppointment({
        patientId: user.profileId,
        dietitianId: selectedDietitian.id,
        appointmentDate: dateTime,
        notes: notes
      });
      
      alert('Appointment booked successfully!');
      setSelectedDietitian(null);
      setAppointmentDate('');
      setAppointmentTime('');
      setNotes('');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dietitians...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Schedule Appointment</h1>
        <p className="page-subtitle">Book a consultation with an Ayurvedic dietitian</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2 className="section-title">Available Dietitians</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dietitians.map((dietitian) => (
              <div
                key={dietitian.id}
                className={`dietitian-card ${selectedDietitian?.id === dietitian.id ? 'selected' : ''}`}
                onClick={() => setSelectedDietitian(dietitian)}
              >
                <div className="dietitian-card-header">
                  <div className="dietitian-avatar">
                    {dietitian.name.charAt(0)}
                  </div>
                  <div className="dietitian-info">
                    <h3>{dietitian.name}</h3>
                    <p className="dietitian-qualification">{dietitian.qualification}</p>
                  </div>
                </div>
                
                <div className="dietitian-details">
                  <div className="dietitian-detail-item">
                    <span className="icon">📚</span>
                    <span>{dietitian.specialization}</span>
                  </div>
                  <div className="dietitian-detail-item">
                    <span className="icon">⏱️</span>
                    <span>{dietitian.experience} years experience</span>
                  </div>
                  <div className="dietitian-detail-item">
                    <span className="icon">⭐</span>
                    <span>{dietitian.rating} rating</span>
                  </div>
                  <div className="dietitian-detail-item">
                    <span className="icon">👥</span>
                    <span>{dietitian.totalConsultations} consultations</span>
                  </div>
                  <div className="dietitian-detail-item">
                    <span className="icon">📞</span>
                    <span>{dietitian.phone}</span>
                  </div>
                  <div className="dietitian-detail-item">
                    <span className="icon">📧</span>
                    <span>{dietitian.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Appointment Details</h2>
          
          {selectedDietitian ? (
            <form onSubmit={handleSubmit}>
              <div className="selected-dietitian-info">
                <h4>Selected Dietitian</h4>
                <div className="selected-dietitian-card">
                  <div className="dietitian-avatar-small">
                    {selectedDietitian.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{selectedDietitian.name}</strong>
                    <p>{selectedDietitian.specialization}</p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Appointment Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Appointment Time *</label>
                <input
                  type="time"
                  className="form-control"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific concerns or topics you'd like to discuss..."
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={submitting}
              >
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">👈</div>
              <h3>Select a Dietitian</h3>
              <p>Choose a dietitian from the list to schedule your appointment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleAppointment;