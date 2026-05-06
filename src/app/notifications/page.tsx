/** @format */

'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { IoBriefcaseOutline, IoWalletOutline, IoPeopleOutline, IoAlertCircleOutline, IoTrashOutline } from 'react-icons/io5';
import RouteGuard from '@/app/components/layouts/RouteGuard';
import SortButton from '@/app/components/ui/sortButton';
import { SortOption } from '@/app/components/forms/SortModal';
import Pagination from '@/app/components/ui/Pagination';
import { FiChevronDown } from 'react-icons/fi';
import NotificationItem from '@/app/components/ui/NotificationItem';
import Link from 'next/link';
import { toast } from 'react-toastify';

export interface Notification {
  id: string;
  type: 'job' | 'payment' | 'team' | 'action';
  title: string;
  message: string;
  time: string;
  timestamp: number;
  isRead: boolean;
  category: string;
}

const mockNotificationsData: Notification[] = [
  {
    id: '1',
    type: 'job',
    title: 'Job Update',
    message: 'Wedding Film for Sarah moved to In Progress. Please update the client with the new timeline.',
    time: '10 minutes ago',
    timestamp: Date.now() - 10 * 60 * 1000,
    isRead: false,
    category: 'Jobs'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Received',
    message: 'Invoice #INV-021 paid by Lumière Studio. The payment has been processed and added to your balance.',
    time: '1 hour ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    isRead: false,
    category: 'Payments'
  },
  {
    id: '3',
    type: 'team',
    title: 'Team Activity',
    message: 'Alex added a new job: Music Video Shoot for Urban Records. Check the schedule for conflicts.',
    time: '2:30 PM',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    isRead: true,
    category: 'Team'
  },
  {
    id: '4',
    type: 'action',
    title: 'Action Required',
    message: 'Invoice #INV-018 is overdue. A reminder email was sent to the client automatically.',
    time: '4:00 PM',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    isRead: true,
    category: 'Action'
  },
];

const NOTIFICATION_SORT_OPTIONS: SortOption[] = [
  { id: 'time-desc', label: 'Newest First', value: 'timestamp', direction: 'desc' },
  { id: 'time-asc', label: 'Oldest First', value: 'timestamp', direction: 'asc' },
  { id: 'unread-first', label: 'Unread First', value: 'isRead', direction: 'asc' },
  { id: 'read-first', label: 'Read First', value: 'isRead', direction: 'desc' },
];

const SwipeableCard = ({
  notif,
  onDelete,
  onViewDetails,
  activeSwipedId,
  onSwipeStart
}: {
  notif: Notification;
  onDelete: (id: string) => void;
  onViewDetails: (notif: Notification) => void;
  activeSwipedId: string | null;
  onSwipeStart: (id: string) => void;
}) => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const threshold = -100;

  // Close card if another card is swiped
  React.useEffect(() => {
    if (activeSwipedId !== notif.id && currentX !== 0) {
      setCurrentX(0);
    }
  }, [activeSwipedId, notif.id, currentX]);

  const handleStart = (clientX: number) => {
    onSwipeStart(notif.id);
    setStartX(clientX - currentX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const x = clientX - startX;
    if (x <= 10) setCurrentX(x);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (currentX < threshold / 2) {
      setCurrentX(threshold);
    } else {
      setCurrentX(0);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] group">
      <div
        onClick={() => onDelete(notif.id)}
        className={`absolute inset-[1px] bg-red-600 rounded-[32px] flex items-center justify-end pr-10 cursor-pointer transition-all hover:bg-red-700 ${Math.abs(currentX) < 0.5 ? 'hidden' : 'flex'
          }`}
      >
        <div className="flex flex-col items-center gap-1 text-white">
          <IoTrashOutline className="text-3xl" />
        </div>
      </div>

      <div
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={() => isDragging && handleEnd()}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        style={{
          transform: `translateX(${currentX}px)`,
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        className={`bg-white border border-gray-100 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 relative z-10 select-none cursor-grab active:cursor-grabbing ${notif.isRead ? '' : 'ring-1 ring-[#01B0E9]/20'
          }`}
      >
        <NotificationItem notif={notif} onViewDetails={onViewDetails} />
      </div>
    </div>
  );
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotificationsData);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState<{ value: string; direction: 'asc' | 'desc' }>({
    value: 'timestamp',
    direction: 'desc'
  });

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [activeSwipedId, setActiveSwipedId] = useState<string | null>(null);

  const filters = ['All', 'Jobs', 'Payments', 'Clients', 'Team'];

  const allFilteredNotifications = useMemo(() => {
    let result = activeFilter === 'All'
      ? [...notifications]
      : notifications.filter(n => n.category === activeFilter);

    result.sort((a: any, b: any) => {
      const valA = a[sortBy.value];
      const valB = b[sortBy.value];
      if (sortBy.direction === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
    return result;
  }, [activeFilter, sortBy, notifications]);

  const totalPages = Math.ceil(allFilteredNotifications.length / itemsPerPage);

  const paginatedNotifications = useMemo(() => {
    return allFilteredNotifications.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [allFilteredNotifications, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification removed successfully');
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const handleViewDetails = (notif: Notification) => {
    setSelectedNotification(notif);
    // Mark as read when viewing details
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
  };

  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <div className='min-h-screen w-full bg-[#F9FAFB] pb-24'>
        <div className='w-full lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 pt-9 flex flex-col gap-6'>

          <div className="flex flex-col mt-4">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h1>
            <nav className="flex text-sm text-[#8c8c8c] mt-1 gap-2">
              <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-400">Notifications</span>
            </nav>
          </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 sm:mb-10">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setCurrentPage(1);
                    }}
                    className={`px-4 sm:px-8 py-1.5 sm:py-2 rounded-full text-[14px] sm:text-[17px] font-medium whitespace-nowrap transition-all border-2 cursor-pointer ${activeFilter === filter
                      ? 'bg-[#01B0E9] border-[#01B0E9] text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-100 hover:text-black'
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-gray-100 pt-4 sm:border-none sm:pt-0">
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-[14px] sm:text-sm font-semibold text-[#01B0E9] hover:text-[#00A4DD] transition-colors cursor-pointer underline-offset-4 hover:underline"
                >
                Mark all as read
              </button>
              <SortButton
                sortBy={sortBy}
                setSortBy={setSortBy}
                options={NOTIFICATION_SORT_OPTIONS}
              />
            </div>
          </div>

          <div className="space-y-5 mb-10">
            {paginatedNotifications.length > 0 ? (
              paginatedNotifications.map((notif) => (
                <SwipeableCard
                  key={notif.id}
                  notif={notif}
                  onDelete={handleDelete}
                  onViewDetails={handleViewDetails}
                  activeSwipedId={activeSwipedId}
                  onSwipeStart={setActiveSwipedId}
                />
              ))
            ) : (
              <div className="bg-white border border-dashed border-gray-200 rounded-4xl py-40 flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                  <IoAlertCircleOutline className="w-12 h-12 text-gray-200" />
                </div>
                <h3 className="text-3xl font-medium text-gray-900">You're all caught up!</h3>
                <p className="text-gray-500 max-w-md mt-2 text-lg font-normal">There are no notifications here right now.</p>
              </div>
            )}
          </div>

          {/* Notification Detail Modal */}
          {selectedNotification && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                onClick={() => setSelectedNotification(null)}
              />
              <div className="bg-white rounded-[40px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-300">
                <div className="p-12">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-3xl transition-colors duration-500 ${selectedNotification.type === 'job' ? 'bg-[#E0F7FF] text-[#01B0E9]' :
                        selectedNotification.type === 'payment' ? 'bg-[#DCFCE7] text-[#15803D]' :
                          selectedNotification.type === 'team' ? 'bg-[#FFF9E5] text-[#FBBF24]' :
                            'bg-[#FEF2F2] text-[#DC2626]'
                        }`}>
                        {selectedNotification.type === 'job' && <IoBriefcaseOutline className="text-4xl" />}
                        {selectedNotification.type === 'payment' && <IoWalletOutline className="text-4xl" />}
                        {selectedNotification.type === 'team' && <IoPeopleOutline className="text-4xl" />}
                        {selectedNotification.type === 'action' && <IoAlertCircleOutline className="text-4xl" />}
                      </div>
                      <div>
                        <h2 className="text-3xl font-medium text-gray-900 tracking-tight">{selectedNotification.title}</h2>
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.1em] mt-1">{selectedNotification.time}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNotification(null)}
                      className="p-3 hover:bg-gray-50 rounded-full transition-colors group"
                    >
                      <FiChevronDown className="w-8 h-8 text-gray-400 group-hover:text-black transition-transform rotate-45" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50/50 rounded-[32px] p-10 border border-gray-100">
                      <p className="text-gray-600 text-[18px] leading-[1.6] font-normal">
                        {selectedNotification.message}
                      </p>
                    </div>

                    <div className="flex gap-5">
                      <button
                        onClick={() => setSelectedNotification(null)}
                        className="flex-1 py-5 bg-[#01B0E9] text-white rounded-2xl font-medium text-lg hover:bg-[#00A4DD] transition-all shadow-lg shadow-blue-100"
                      >
                        Dismiss Alert
                      </button>
                      <button
                        className="flex-1 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-medium text-lg hover:bg-gray-50 transition-all"
                      >
                        Go to Source
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white py-4 sm:py-6 rounded-3xl border border-gray-100 px-6 sm:px-8 gap-4">
            <div className="flex justify-center sm:justify-start w-full sm:w-auto">
              <div className="relative flex-shrink-0 w-full sm:w-auto">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-[#F3F4F6] border-none rounded-xl py-2 sm:py-2.5 px-4 sm:px-5 pr-10 sm:pr-12 text-[13px] sm:text-[14px] font-medium text-gray-800 focus:outline-none cursor-pointer w-full"
                >
                  <option value={8}>8 Alerts</option>
                  <option value={15}>15 Alerts</option>
                  <option value={20}>20 Alerts</option>
                  <option value={50}>50 Alerts</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <FiChevronDown className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full sm:w-auto">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="flex-1 hidden sm:flex justify-end"></div>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
