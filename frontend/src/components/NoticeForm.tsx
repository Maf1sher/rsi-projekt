import React, { useState } from 'react';
import api from '../api/axios';

interface NoticeFormProps {
  onSuccess: () => void;
}

const NoticeForm: React.FC<NoticeFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/notices', { title, content });
      setTitle('');
      setContent('');
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create notice');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-4">Post a New Notice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            className="w-full p-2 border rounded h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Post Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;
