import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Notice, PagedResponse } from '../types';

const HomePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNotices = async (p: number) => {
    try {
      const res = await api.get<PagedResponse<Notice>>(`/notices?page=${p}&size=5&sort=createdAt,desc`);
      setNotices(res.data._embedded?.notices || []);
      setTotalPages(res.data.page.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchNotices(page); }, [page]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Public Notices</h2>
      <div className="space-y-4">
        {notices.map(n => (
          <div key={n.id} className="p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">{n.title}</h3>
            <p className="text-gray-700 mb-4">{n.content}</p>
            <div className="text-sm text-gray-500">By {n.authorUsername} • {new Date(n.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${page === i ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
