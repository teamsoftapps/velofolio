'use client';
import React from 'react';

interface CommentActionProps {
  comment: string;
  onSave: () => void;
  onCancel: () => void;
}

const CommentAction: React.FC<CommentActionProps> = ({ comment, onSave, onCancel }) => {
  const isDisabled = comment.trim().length === 0;

  return (
    <div className="flex items-center gap-2 mt-3 text-black">
      <button
        className={`p-1 text-white px-3 rounded text-md w-24 font-semibold transition-colors ${
          isDisabled ? 'bg-[#33B9E8]/50 cursor-not-allowed' : 'bg-[#33B9E8] hover:bg-[#1b9ed1] cursor-pointer'
        }`}
        disabled={isDisabled}
        onClick={onSave}
      >
        Save
      </button>

      <button
        className="p-1 text-gray-800 font-semibold hover:bg-gray-200 cursor-pointer px-3 rounded text-md w-20 "
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default CommentAction;
