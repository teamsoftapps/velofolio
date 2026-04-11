'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { deleteAccount } from '@/firebase_Routes/routes';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface DeleteAccountModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function DeleteAccountModal({ isOpen, setIsOpen }: DeleteAccountModalProps){
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (!password.trim()) return;

    setIsLoading(true);
    try {
      const response = await deleteAccount(password);
      if (response.success) {
        toast.success("Account deleted successfully");
        setIsOpen(false);
        router.push('/signin');
      } else {
        toast.error(response.error || "Failed to delete account");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border-gray-400 border-2">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Confirm Account Deletion
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <div className="bg-[#F4F4F5] rounded-2xl p-8 border-gray-300 border-2">
            <p className="text-red-600 font-medium mb-6 text-center">
              WARNING: This action is permanent. You will not be able to log in or restore this account data.
            </p>
            <label className="block text-center text-sm font-medium text-gray-700 mb-4">
              Enter your password to confirm deletion
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 pr-12 text-black"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-4 px-8 py-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 border-[#E7E7E9] border-2 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!password.trim() || isLoading}
            className="px-6 py-2 bg-red-600 rounded-full text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
