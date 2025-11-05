// RoleSelection.jsx
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup/${role.toLowerCase()}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card role-selection">
        <div className="auth-header">
          <h1>🌿 Welcome to Ayurvedic Diet Management</h1>
          <p>Choose your role to get started</p>
        </div>

        <div className="role-cards">
          <div className="role-card" onClick={() => handleRoleSelect('PATIENT')}>
            <div className="role-icon">🧘</div>
            <h2>Patient</h2>
            <p>Get personalized Ayurvedic diet plans and track your health journey</p>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect('DIETITIAN')}>
            <div className="role-icon">👨‍⚕️</div>
            <h2>Dietitian</h2>
            <p>Manage patients and create customized Ayurvedic diet charts</p>
          </div>
        </div>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;