'use client';

import { useInviteMemberMutation } from '@/store/apis/Common';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  setWorkspaceMembers: (members: any) => void;
}

const roles = ['editor', 'admin'];

export default function InviteMemberModal({ isOpen, onClose, setWorkspaceMembers }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor'); // default lowercase
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteMember] = useInviteMemberMutation();

  const handleSubmit = async () => {
    if (!email || !role) return;

    setIsSubmitting(true);
    try {
      const res = await inviteMember({ email, role }).unwrap();
      console.log('Invite response:', res);

   setWorkspaceMembers((prev: { id: string; name: string; role: string; status: 'pending' }[]) => [
  ...prev,
  { id: Date.now().toString(), name: email, role: role.toLowerCase(), status: 'pending' }
]);


      toast.success('Member invited successfully!');
      setEmail('');
      onClose();
    } catch (err: any) {
      console.error('Invite failed:', err);
      toast.error(err?.data?.msg || 'Failed to invite member');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div
        className="absolute -bottom-64 sm:bottom-0 left-0 sm:-left-80 z-50 flex items-center justify-center p-3 py-4"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="bg-white rounded-md shadow-2xl w-72 sm:w-80 max-w-md transform transition-all animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-0">
            <h2 className="text-lg font-semibold text-gray-900">Invite Member</h2>
            <button
              onClick={onClose}
              className="text-gray-900 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-2">
            {/* Email Input */}
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@example.com"
                className="w-full pl-2 pr-4 py-2 border text-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Role Select */}
            <div>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-2 pr-10 py-2 text-black border border-gray-300 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3.5 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 p-2 px-5 bg-gray-50 rounded-b-2xl w-full">
            <button
              onClick={handleSubmit}
              disabled={!email || isSubmitting}
              className={`flex-1 py-1 text-white font-medium rounded-md transition-all flex items-center justify-center gap-2 bg-[#01B0E9] ${
                email && !isSubmitting ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Invite'
              )}
            </button>

            <button
              onClick={onClose}
              className="flex-1 py-1 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
