import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Notice, PagedResponse } from '../types';
import { Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    if (!window.confirm('Delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      fetchMyNotices(page);
    } catch (err) { alert('Delete failed'); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Notices</h2>
        <Link to="/my-notices/add" className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition">
          <Plus size={20} className="mr-2" /> Add New
        </Link>
      </div>
      <div className="space-y-4">
        {notices.length === 0 && <p className="text-gray-500">You haven't posted any notices yet.</p>}
        {notices.map(n => (
          <div key={n.id} className="p-6 bg-white rounded-lg shadow-sm border flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">{n.title}</h3>
              <p className="text-gray-700">{n.content}</p>
              <div className="text-xs text-gray-400 mt-2">{new Date(n.createdAt).toLocaleString()}</div>
            </div>
            <button onClick={() => handleDelete(n.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 rounded ${page === i ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyNoticesPage;
