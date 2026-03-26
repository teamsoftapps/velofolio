/** @format */

'use client';

import React from 'react';
import Image from 'next/image';
import { MdClose, MdCheckCircle, MdInfo, MdWarning } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';

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
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay to close when clicking outside on mobile or backdrop */}
      <div className="fixed inset-0 z-[100] lg:hidden bg-black/20" onClick={onClose} />
      
      <div className="absolute right-0 top-16 w-[320px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[101] overflow-hidden transform origin-top-right transition-all duration-300 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <IoNotificationsOutline className="w-5 h-5 text-[#01B0E9]" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <MdClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[450px] overflow-y-auto scroller">
          {mockNotifications.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {mockNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`px-6 py-4 hover:bg-blue-50/30 transition-colors cursor-pointer flex gap-4 ${!notif.isRead ? 'bg-blue-50/10' : ''}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {notif.type === 'info' && <MdInfo className="w-6 h-6 text-blue-400" />}
                    {notif.type === 'success' && <MdCheckCircle className="w-6 h-6 text-green-400" />}
                    {notif.type === 'warning' && <MdWarning className="w-6 h-6 text-yellow-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className={`text-sm font-semibold text-gray-900 ${!notif.isRead ? 'font-bold' : ''}`}>
                        {notif.title}
                      </h3>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{notif.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.isRead && (
                    <div className="w-2 h-2 rounded-full bg-[#01B0E9] mt-2 self-start ring-4 ring-blue-50" />
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
        <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex justify-center">
          <button className="text-sm font-semibold text-[#01B0E9] hover:text-[#00A4DD] hover:underline transition-all">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
