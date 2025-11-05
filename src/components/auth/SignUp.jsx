// SignUp.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { signup } from '../../services/api';
import '../../styles/auth.css';

function SignUp({ onLogin }) {
  const navigate = useNavigate();
  const { role } = useParams();
  const isDietitian = role === 'dietitian';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: isDietitian ? 'DIETITIAN' : 'PATIENT',
    // Dietitian fields
    phone: '',
    qualification: '',
    experience: '',
    specialization: '',
    // Patient fields
    age: '',
    gender: '',
    weight: '',
    height: '',
    healthCondition: '',
    allergies: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await signup(formData);
      onLogin(response.data);
      
      if (isDietitian) {
        navigate('/dietitian/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🌿 Create Account</h1>
          <p>Sign up as {isDietitian ? 'Dietitian' : 'Patient'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          {/* Dietitian Specific Fields */}
          {isDietitian && (
            <>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  className="form-control"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                  placeholder="e.g., BAMS, MSc Nutrition"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Experience (Years) *</label>
                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Years of experience"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Specialization *</label>
                <input
                  type="text"
                  name="specialization"
                  className="form-control"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Ayurvedic Nutrition, Weight Management"
                />
              </div>
            </>
          )}

          {/* Patient Specific Fields */}
          {!isDietitian && (
            <>
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select
                  name="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  className="form-control"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="1"
                  placeholder="Enter your weight"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Height (cm) *</label>
                <input
                  type="number"
                  name="height"
                  className="form-control"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="1"
                  placeholder="Enter your height"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Health Condition</label>
                <input
                  type="text"
                  name="healthCondition"
                  className="form-control"
                  value={formData.healthCondition}
                  onChange={handleChange}
                  placeholder="e.g., Diabetes, Hypertension (Optional)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  className="form-control"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., Nuts, Dairy (Optional)"
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;