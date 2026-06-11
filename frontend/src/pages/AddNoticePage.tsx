import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FileText, AlignLeft, Send, X } from 'lucide-react';

const AddNoticePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await api.post('/notices', { title, content });
      navigate('/my-notices');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post notice. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="card shadow-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="title" style={{ marginBottom: '0.25rem' }}>Create New Notice</h2>
            <p className="subtitle">Share your information with the community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label flex items-center gap-2">
              <FileText size={16} className="text-gray-400" />
              Notice Title
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Selling my old camera"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="label flex items-center gap-2">
              <AlignLeft size={16} className="text-gray-400" />
              Content
            </label>
            <textarea
              className="input"
              style={{ minHeight: '200px', resize: 'vertical' }}
              placeholder="Describe what you want to share..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg mb-6 flex items-start gap-3">
              <X size={20} className="mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-4 pt-4 border-top">
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ flex: 2, padding: '0.75rem' }}
              disabled={isSubmitting}
            >
              <Send size={18} style={{ marginRight: '0.5rem' }} />
              {isSubmitting ? 'Posting...' : 'Post Notice'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/my-notices')} 
              className="btn btn-outline"
              style={{ flex: 1 }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoticePage;
