'use client';

import React, { useState } from 'react';
import { X, DownloadCloud } from 'lucide-react';
import { toast } from 'react-toastify';

interface DownloadDataModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function DownloadDataModal({ isOpen, setIsOpen }: DownloadDataModalProps){
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate a download request
    setTimeout(() => {
      toast.success("Data archive is being prepared.");
      setIsLoading(false);
      setIsOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border-gray-400 border-2">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Download Your Data
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <div className="bg-[#F4F4F5] rounded-2xl p-8 border-gray-300 border-2 text-center flex flex-col items-center">
            <div className="bg-[var(--primary-color)]/10 p-4 rounded-full mb-4">
              <DownloadCloud className="w-8 h-8 text-[var(--primary-color)]" />
            </div>
            <p className="text-gray-700 font-medium mb-4">
              Get a copy of your data to keep. We'll compile an archive containing all your essential information including documents, invoices, media, and account settings.
            </p>
            <p className="text-gray-500 text-sm">
              This process might take a few minutes. We'll send a secure download link to your email address once it's ready.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-4 px-8 py-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 border-[#E7E7E9] border-2 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-6 py-2 bg-[var(--primary-color)] rounded-full text-white font-medium hover:bg-[#009bc9] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Processing..." : "Request Download"}
          </button>
        </div>
      </div>
    </div>
  );
}
