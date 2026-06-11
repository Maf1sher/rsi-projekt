import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AddNoticePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/notices', { title, content });
      navigate('/my-notices');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post notice');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post a New Notice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            className="w-full p-2 border rounded h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Post Notice</button>
          <button type="button" onClick={() => navigate('/my-notices')} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddNoticePage;
