// Navbar.jsx
import '../../styles/dashboard.css';

function Navbar({ user, onLogout }) {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-icon">🌿</span>
        AyurEssence
      </div>

      <div className="navbar-user">
        <div className="navbar-user-info">
          <div className="navbar-user-name">{user.name}</div>
          <div className="navbar-user-role">{user.role.toLowerCase()}</div>
        </div>
        <div className="navbar-avatar">{getInitials(user.name)}</div>
        <button className="btn btn-danger btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
