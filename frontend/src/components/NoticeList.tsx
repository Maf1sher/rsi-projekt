import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Notice, PagedResponse } from '../types';
import { Trash2 } from 'lucide-react';

interface NoticeListProps {
  currentUser: string | null;
}

const NoticeList: React.FC<NoticeListProps> = ({ currentUser }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNotices = async (pageNumber: number) => {
    try {
      const response = await api.get<PagedResponse<Notice>>(`/notices?page=${pageNumber}&size=5&sort=createdAt,desc`);
      setNotices(response.data._embedded?.notices || []);
      setTotalPages(response.data.page.totalPages);
    } catch (err) {
      console.error('Failed to fetch notices', err);
    }
  };

  useEffect(() => {
    fetchNotices(page);
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      fetchNotices(page);
    } catch (err) {
      alert('Failed to delete notice');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6">Latest Notices</h2>
      <div className="space-y-4">
        {notices.length === 0 && <p className="text-gray-500">No notices found.</p>}
        {notices.map((notice) => (
          <div key={notice.id} className="p-6 bg-white rounded-lg shadow-sm border relative">
            <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{notice.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {notice.authorUsername} • {new Date(notice.createdAt).toLocaleString()}</span>
              {currentUser === notice.authorUsername && (
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2 pb-10">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {page + 1} of {totalPages}</span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeList;
