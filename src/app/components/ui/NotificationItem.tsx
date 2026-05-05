/** @format */

'use client';

import React from 'react';
import { IoBriefcaseOutline, IoWalletOutline, IoPeopleOutline, IoAlertCircleOutline } from 'react-icons/io5';

interface Notification {
  id: string;
  type: 'job' | 'payment' | 'team' | 'action';
  title: string;
  message: string;
  time: string;
  timestamp: number;
  isRead: boolean;
  category: string;
}

interface NotificationItemProps {
  notif: Notification;
  onViewDetails?: (notif: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notif, onViewDetails }) => {
  return (
    <div className="flex items-start gap-8">
      {/* Icon Section */}
      <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center flex-shrink-0 transition-all duration-500 pointer-events-none ${
          notif.type === 'job' ? 'bg-[#E0F7FF] text-[#01B0E9]' :
          notif.type === 'payment' ? 'bg-[#DCFCE7] text-[#15803D]' :
          notif.type === 'team' ? 'bg-[#FFF9E5] text-[#FBBF24]' :
          'bg-[#FEF2F2] text-[#DC2626]'
        }`}>
        {notif.type === 'job' && <IoBriefcaseOutline className="text-3xl" />}
        {notif.type === 'payment' && <IoWalletOutline className="text-3xl" />}
        {notif.type === 'team' && <IoPeopleOutline className="text-3xl" />}
        {notif.type === 'action' && <IoAlertCircleOutline className="text-3xl" />}
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0 pt-1 pointer-events-none">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            {!notif.isRead && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#01B0E9] flex-shrink-0" />
            )}
            <h3 className="text-xl font-medium text-gray-900 transition-colors duration-300">
              {notif.title}
            </h3>
          </div>
          <span className="text-[14px] font-normal text-gray-400 uppercase tracking-wider">
            {notif.time}
          </span>
        </div>
        <p className="text-[16px] text-gray-500 mb-6 max-w-5xl leading-relaxed font-normal">
          {notif.message}
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(notif);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="inline-flex items-center text-[16px] font-medium text-[#01B0E9] hover:text-[#00A4DD] transition-all group/btn pointer-events-auto cursor-pointer"
        >
          View Details
          <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
