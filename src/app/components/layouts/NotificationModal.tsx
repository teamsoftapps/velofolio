/** @format */

'use client';

import React from 'react';
import Image from 'next/image';
import { MdClose, MdCheckCircle, MdInfo, MdWarning } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Lead Assigned',
    message: 'Sarah Johnson just submitted a new inquiry for "Wedding Photography".',
    time: '2 mins ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Payment Received',
    message: 'Invoice #INV-2024-001 has been marked as fully paid.',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Upcoming Shoot',
    message: 'Reminder: "Wedding Day - Emma & Liam" is scheduled for tomorrow Oct 5.',
    time: '5 hours ago',
    isRead: true,
  },
];

const NotificationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSeeAll = () => {
    onClose();
    router.push('/notifications');
  };

  return (
    <>
      {/* Overlay to close when clicking outside on mobile or backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/20 lg:bg-transparent" onClick={onClose} />

      <div className="absolute right-4 sm:right-10 top-20 sm:top-24 w-[320px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-[101] overflow-hidden transform origin-top-right transition-all duration-300 animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <IoNotificationsOutline className="w-5 h-5 text-[var(--primary-color)]" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MdClose className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
          {mockNotifications.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {mockNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4 ${!notif.isRead ? 'bg-blue-50/5' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${notif.type === 'info' ? 'bg-blue-50 text-blue-500' :
                      notif.type === 'success' ? 'bg-green-50 text-green-500' :
                        'bg-yellow-50 text-yellow-500'
                    }`}>
                    {notif.type === 'info' && <MdInfo className="w-6 h-6" />}
                    {notif.type === 'success' && <MdCheckCircle className="w-6 h-6" />}
                    {notif.type === 'warning' && <MdWarning className="w-6 h-6" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-bold text-gray-900 ${!notif.isRead ? 'text-[var(--primary-color)]' : ''}`}>
                        {notif.title}
                      </h3>
                      <span className="text-[10px] text-gray-400 font-semibold">{notif.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.isRead && (
                    <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] mt-3" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <IoNotificationsOutline className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-medium">No new notifications</h3>
              <p className="text-sm text-gray-500">We'll notify you when something important happens.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 bg-white flex flex-col gap-3">
          <button
            onClick={handleSeeAll}
            className="w-full py-3 bg-[var(--primary-color)] hover:bg-[#00A4DD] text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            See all notifications
          </button>
          <button className="w-full py-2 text-xs font-bold text-gray-400 hover:text-[var(--primary-color)] transition-all uppercase tracking-wider">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
