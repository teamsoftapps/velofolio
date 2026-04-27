/** @format */

import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  confirmClassName?: string;
  isLoading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure you would like to delete this item? This action cannot be undone.',
  confirmLabel = 'Delete',
  confirmClassName = 'bg-orange-500 hover:bg-orange-600',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1100]'>
      <div className='relative mt-20 bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl cursor-pointer'>
          &times;
        </button>
        <h2 className='text-xl text-black font-semibold text-center mb-4'>
          {title}
        </h2>
        <p className='text-gray-600 text-center mb-6'>{message}</p>
        <div className='flex justify-center space-x-4'>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`${confirmClassName} text-white px-6 py-2 rounded-md cursor-pointer transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2`}>
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </>
            ) : (
              confirmLabel
            )}
          </button>
          <button
            onClick={onClose}
            className='bg-gray-200 text-gray-800 cursor-pointer px-6 py-2 rounded-md hover:bg-gray-300 transition-colors'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
