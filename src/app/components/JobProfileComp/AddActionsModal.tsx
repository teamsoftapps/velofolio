/** @format */

import React from 'react';
import { useRouter } from 'next/navigation';

interface AddActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
}

const AddActionsModal: React.FC<AddActionsModalProps> = ({ isOpen, onClose, clientId }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const actions = [
    {
      title: 'Add Invoice',
      onClick: () => router.push(`/addInvoice?id=${clientId}`),
    },
    {
      title: 'Add Quote',
      onClick: () => router.push(`/addQuote?id=${clientId}`),
    },
    {
      title: 'Add File',
      onClick: () => {
        alert("Add File functionality coming soon!");
      },
    },
    {
      title: 'Add Questionnaire',
      onClick: () => {
        alert("Add Questionnaire functionality coming soon!");
      },
    },
  ];

  return (
    <>
      {/* Transparent backdrop to catch clicks outside the menu */}
      <div
        className="fixed inset-0 z-[900] cursor-default"
        onClick={onClose}
      />

      <div
        className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden py-1 z-[999] animate-in fade-in slide-in-from-top-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => {
              action.onClick();
              onClose();
            }}
            className="w-full px-5 py-3 text-left text-[14px] font-semibold text-gray-700 hover:bg-gray-50 hover:text-[var(--primary-color)] transition-all cursor-pointer border-b last:border-b-0 border-gray-50/50"
          >
            {action.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default AddActionsModal;
