'use client';

import { useInviteMemberMutation } from '@/store/apis/Common';
import React, { useState } from 'react';
import { MdClose, MdContentCopy, MdCheckCircle } from 'react-icons/md';
import { Mail, Shield, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { colors } from '@/utils/colors';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  setWorkspaceMembers: (members: any) => void;
}

export default function InviteMemberModal({ isOpen, onClose, setWorkspaceMembers }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [inviteMember] = useInviteMemberMutation();

  const inviteLink = "https://velofolio.app/invite/team-x-12345";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Defaulting role to 'editor' as UI selection is removed
      await inviteMember({ email, role: 'editor' }).unwrap();
      setWorkspaceMembers((prev: any[]) => [
        ...prev,
        { id: Date.now().toString(), name: email, role: 'editor', status: 'pending' }
      ]);
      toast.success('Member invited!');
      setEmail('');
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.msg || 'Failed to invite');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1050]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[1100] p-4" onClick={onClose}>
        <div
          className="relative mt-20 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Clean Header */}
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-900" />
              <h2 className="text-xl font-medium text-gray-900 tracking-tight">Invite Member</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <MdClose className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-black text-base focus:ring-2 focus:border-transparent outline-none transition-all"
                    style={{ '--tw-ring-color': '#14CB95' } as React.CSSProperties}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!email || isSubmitting}
                className="w-full py-3.5 text-white text-lg font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                style={{ backgroundColor: '#14CB95' }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Invite</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest"><span className="bg-white px-3 text-gray-400">Or copy link</span></div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
              <div className="flex-1 truncate text-sm text-gray-400 font-medium">{inviteLink}</div>
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${isCopied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#14CB95] hover:text-[#14CB95]'
                  }`}
              >
                {isCopied ? <MdCheckCircle className="w-4 h-4" /> : <MdContentCopy className="w-4 h-4" />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
