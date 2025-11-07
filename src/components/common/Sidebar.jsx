// Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import '../../styles/dashboard.css';

function Sidebar({ role }) {
  const location = useLocation();

  const dietitianMenuItems = [
    { path: '/dietitian/dashboard', label: 'Dashboard' },
    { path: '/dietitian/patients', label: 'Patients' },
    { path: '/dietitian/appointments', label: 'Appointments' },
    { path: '/dietitian/food-tracker', label: 'Food Tracker'  }
  ];

  const patientMenuItems = [
    { path: '/patient/dashboard', label: 'Dashboard' },
    { path: '/patient/schedule-appointment', label: 'Schedule Appointment' },
    { path: '/patient/diet-chart', label: 'My Diet Chart' },
    { path: '/patient/food-tracker', label: 'Food Tracker' },
    { path: '/patient/ai-assistant', label: 'AI Assistant' }
  ];

  const menuItems = role === 'DIETITIAN' ? dietitianMenuItems : patientMenuItems;

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path} className="sidebar-menu-item">
            <Link
              to={item.path}
              className={`sidebar-menu-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
