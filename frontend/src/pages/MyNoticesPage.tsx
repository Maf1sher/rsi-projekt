import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Notice, PagedResponse } from '../types';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoticeCard from '../components/NoticeCard';

const MyNoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMyNotices = async (p: number) => {
    try {
      const res = await api.get<PagedResponse<Notice>>(`/notices/my?page=${p}&size=5&sort=createdAt,desc`);
      setNotices(res.data._embedded?.notices || []);
      setTotalPages(res.data.page.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMyNotices(page); }, [page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      fetchMyNotices(page);
    } catch (err) { alert('Delete failed'); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="title" style={{ marginBottom: 0 }}>My Notices</h2>
        <Link to="/my-notices/add" className="btn btn-primary">
          <Plus size={20} style={{ marginRight: '0.5rem' }} /> Add New Notice
        </Link>
      </div>
      
      <div className="space-y-4">
        {notices.length === 0 && (
          <div className="card text-center py-10 text-gray-500">
            You haven't posted any notices yet.
          </div>
        )}
        {notices.map(n => (
          <NoticeCard 
            key={n.id} 
            notice={n} 
            showDelete={true} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i} 
              onClick={() => setPage(i)} 
              className={`pagination-btn ${page === i ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNoticesPage;
