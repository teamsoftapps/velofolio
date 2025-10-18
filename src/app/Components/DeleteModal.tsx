/** @format */

import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Client?',
  message = 'Are you sure you would like to delete this client?',
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl  cursor-pointer'>
          &times;
        </button>
        <h2 className='text-xl text-black font-semibold text-center mb-4'>
          {title}
        </h2>
        <p className='text-gray-600 text-center mb-6'>{message}</p>
        <div className='flex justify-center space-x-4'>
          <button
            onClick={onConfirm}
            className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 cursor-pointer'>
            Delete Client
          </button>
          <button
            onClick={onClose}
            className='bg-gray-200 text-gray-800 cursor-pointer px-4 py-2 rounded-md hover:bg-gray-300'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
