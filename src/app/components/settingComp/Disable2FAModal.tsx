'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface Disable2FAModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm?: (password: string) => void;

}

export default function Disable2FAModal({ isOpen, setIsOpen, onConfirm }: any) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleConfirm = () => {
    onConfirm && onConfirm();
    setIsOpen(false);
  };
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full border-gray-400 border-2">
          {/* Header */}
          <div className="flex items-center justify-between p-6  ">
            <h2 className="text-xl font-semibold text-gray-900">
              Enter Your Password To Disable 2FA
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
            <div className="bg-[#F4F4F5] rounded-2xl p-8  border-gray-300 border-2">
              <label className="block text-center text-base font-medium text-black mb-4">
                Enter Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#01B0E9]/50 pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
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
              disabled={!password.trim()}
              className="px-6 py-2 bg-[#01B0E9] rounded-full text-white font-medium hover:bg-[#01A0D9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Disable
            </button>
          </div>
        </div>
      </div>
    </>
  );
}