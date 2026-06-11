import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';
import api from '../api/axios';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-brand">NoticeBoard</NavLink>
          
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Public Notices
            </NavLink>
            
            {user ? (
              <>
                <NavLink to="/my-notices" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  My Notices
                </NavLink>
                <div className="nav-auth">
                  <span className="subtitle">Welcome, <strong>{user}</strong></span>
                  <button onClick={handleLogout} className="btn btn-danger" style={{fontSize: '0.875rem'}}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="nav-auth">
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/register" className="btn btn-primary">Register</NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
