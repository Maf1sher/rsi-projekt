import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import NoticeList from './components/NoticeList';
import NoticeForm from './components/NoticeForm';
import api from './api/axios';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('username'));
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAuthSuccess = (username: string) => {
    setUser(username);
    localStorage.setItem('username', username);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('username');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  const handleNoticeCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4 mb-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">NoticeBoard</h1>
          <div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span>Welcome, <strong>{user}</strong></span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <span className="text-gray-500 italic">Not logged in</span>
            )}
          </div>
        </div>
      </nav>

      <main className="px-4">
        {!user ? (
          <AuthForm onSuccess={handleAuthSuccess} />
        ) : (
          <NoticeForm onSuccess={handleNoticeCreated} />
        )}
        
        <NoticeList key={refreshKey} currentUser={user} />
      </main>
    </div>
  );
};

export default App;
