'use client';
import React, { useState } from 'react';
import DeleteCommentModal from './CommentDeleteModal';

interface CommentItemProps {
  id: string;
  name: string;
  comment: string;
  date: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ id, name, comment, date, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Helper: show "Just now" if < 1 min, while respecting Added/Edited prefix
  const formatDate = (dateString: string) => {
    let rawDate = dateString;
    let prefix = 'Added';

    if (dateString.startsWith('Edited ')) {
      prefix = 'Edited';
      rawDate = dateString.replace('Edited ', '');
    } else if (dateString.startsWith('Added ')) {
      prefix = 'Added';
      rawDate = dateString.replace('Added ', '');
    }

    const diff = Date.now() - new Date(rawDate).getTime();
    if (diff >= 0 && diff < 60000) return `${prefix} just now`;

    // if already formatted with prefix, return as is
    if (dateString.startsWith('Added') || dateString.startsWith('Edited')) {
      return dateString;
    }
    return `${prefix} ${new Date(rawDate).toLocaleString()}`;
  };

  return (
    <div className="flex items-start gap-2 relative w-full">
      <img
        src="/teampic1.png"
        alt={name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col-reverse w-[80%] relative">
        <div className="flex items-center gap-3 text-md text-gray-500">
          <button className="underline cursor-pointer" onClick={() => onEdit(id)}>Edit</button>
          <button
            className="underline cursor-pointer"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-700 text-sm sm:text-base bg-white p-1">
          {comment}
        </p>
        <h3 className="text-xs sm:text-sm text-[#00A4DD]">
          <span className="text-black font-semibold text-md mr-3">
            {name}
          </span>
          {formatDate(date)}
        </h3>
      </div>

      {showDeleteModal && (
        <div className="absolute -bottom-52 left-0 w-full">
          <DeleteCommentModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => onDelete(id)}
          />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
