import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Notice, PagedResponse } from '../types';
import NoticeCard from '../components/NoticeCard';

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
      <h2 className="title">Public Notices</h2>
      <div className="space-y-4">
        {notices.length === 0 && (
          <div className="card text-center py-10 text-gray-500">
            No notices found. Be the first to post something!
          </div>
        )}
        {notices.map(n => (
          <NoticeCard key={n.id} notice={n} />
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

export default HomePage;
