'use client';

import React from 'react';
import { FiX } from 'react-icons/fi';

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteCommentModal({ isOpen, onClose, onConfirm }: DeleteCommentModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0  bg-opacity-50 " onClick={onClose} />

      {/* Modal */}
      <div className=" flex items-center justify-center  p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative">
          {/* Close Button */}
          <div className=' flex items-center  w-full justify-between mb-3'>
             <h3 className="text-lg font-semibold text-gray-900 ">Delete Comment?</h3>
          <button
            onClick={onClose}
            className=" text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5 cursor-pointer" />
          </button>

          {/* Title */}
         
</div>
          {/* Description */}
          <p className="text-sm text-gray-600 mb-6">
            Deleting a comment is forever. There is no undo.
          </p>

          {/* Confirm Button */}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
          >
            Delete Comment
          </button>
        </div>
      </div>
    </>
  );
}
