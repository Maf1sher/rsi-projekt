import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4 mb-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">NoticeBoard</Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-500">Public Notices</Link>
            {user ? (
              <>
                <Link to="/my-notices" className="hover:text-blue-500">My Notices</Link>
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l">
                  <span>Welcome, <strong>{user}</strong></span>
                  <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500">Login</Link>
                <Link to="/register" className="hover:text-blue-500">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="px-4 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
