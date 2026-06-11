import React from 'react';
import type { Notice } from '../types';
import { Trash2, User, Calendar } from 'lucide-react';

interface NoticeCardProps {
  notice: Notice;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onDelete, showDelete }) => {
  return (
    <div className="notice-card">
      <h3 className="notice-title">{notice.title}</h3>
      <p className="notice-content">{notice.content}</p>
      
      <div className="notice-footer">
        <div className="notice-meta">
          <span className="flex items-center gap-1">
            <User size={14} />
            <span className="notice-author">{notice.authorUsername}</span>
          </span>
          <span className="flex items-center gap-1 ml-2">
            <Calendar size={14} />
            {new Date(notice.createdAt).toLocaleDateString('pl-PL', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        
        {showDelete && onDelete && (
          <button 
            onClick={() => onDelete(notice.id)}
            className="btn btn-danger"
            style={{ padding: '0.4rem' }}
            title="Delete notice"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
