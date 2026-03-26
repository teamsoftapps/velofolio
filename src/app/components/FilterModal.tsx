'use client';

import React, { useEffect, useState } from 'react';
import { MdCalendarToday, MdClose } from 'react-icons/md';
import { usePathname } from 'next/navigation';

interface TeamMember {
  id: string;
  name: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Anna David' },
  { id: '3', name: 'Mike Chen' },
  { id: '4', name: 'Emma Wilson' },
  { id: 't4', name: 'Marketing' },
  { id: 't5', name: 'Emma Wilson' },
];

export default function FilterModal({ isOpen, onClose, isVisible, setIsVisible, onApply }: { isOpen: boolean; onClose: () => void, onApply: (filters: any) => void; isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname();
  
  // Status Filters
  const [status, setStatus] = useState<string[]>([]);
  
  const getStatuses = () => {
    if (pathname === '/leads') return ['Active', 'Inactive', 'New Lead'];
    if (pathname === '/jobs') return ['In Progress', 'Upcoming', 'Completed', 'Pending', 'Active']; // Production specific
    if (pathname === '/payments') return ['Paid', 'Pending', 'Overdue'];
    return ['Active', 'Inactive', 'Lead', 'Archived', 'Booked', 'New Lead'];
  };
  
  const statuses = getStatuses();

  // Assigned Team Members
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Lead Source
  const [leadSource, setLeadSource] = useState<string[]>([]);
  const leadSources = ['Website', 'Referral', 'Instagram', 'Facebook', 'Walk-in'];

  // Event Type
  const [eventType, setEventType] = useState<string[]>([]);
  const eventTypes = pathname === '/jobs' 
    ? ['Wedding', 'Portrait', 'Engagement', 'Commercial', 'Other'] // Production specific
    : ['Wedding', 'Corporate', 'Pre-wedding', 'Birthday', 'Other'];

  // Payment Status
  const [paymentStatus, setPaymentStatus] = useState<string[]>([]);
  const paymentStatuses = ['Paid', 'Pending', 'Overdue', "Booked", "Archived"];

  // Date Range
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const toggleFilter = (arr: string[], value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]);
  };

  const removeMember = (id: string) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== id));
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const addMember = (member: TeamMember) => {
    if (!selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
    setDropdownOpen(false);
  };

  const resetFilters = () => {
    setStatus([]);
    setSelectedMembers([]);
    setLeadSource([]);
    setEventType([]);
    setFromDate('');
    setToDate('');
    setPaymentStatus([]);
    onApply({
      status: [],
      selectedMembers: [],
      leadSource: [],
      eventType: [],
      fromDate: '',
      toDate: '',
      paymentStatus: [],
    });
  };

  const applyFilters = () => {
    const filters = {
      status,
      selectedMembers,
      leadSource,
      eventType,
      fromDate,
      toDate,
      paymentStatus,
    };
    onClose();
    onApply(filters)
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50  z-40"
        onClick={onClose}
      />

      <div
        className={`fixed top-24 bottom-6 right-4 sm:top-[120px] sm:bottom-8 sm:right-8 rounded-2xl w-[calc(100vw-2rem)] sm:w-[400px] z-[100] transform transition-transform ease-in-out`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(120%)',
          transitionDuration: '400ms',
        }}
      >
        <div className="bg-white rounded-2xl shadow-xl w-full h-full flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-xl font-semibold text-gray-900">Filter</h2>
            <button onClick={onClose} className="text-gray-700 hover:text-gray-600 cursor-pointer">
              <MdClose className="w-6 h-6 " />
            </button>
          </div>

          <div className="p-6 space-y-6 flex-1 overflow-y-auto scroller relative">
            {/* Status */}
            {pathname !== '/payments' && (
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleFilter(status, s, setStatus)}
                      className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${status.includes(s)
                          ? 'border-[#01B0E9] text-black'
                          : 'border-gray-100 text-black hover:border-[#01B0E9]'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Assigned Member (Production & Teams) */}
            {(pathname === '/jobs' || pathname === '/team') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Member</label>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-2 text-left bg-gray-100 rounded-lg flex items-center justify-between text-sm text-gray-700"
                  >
                    Choose
                    <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 text-gray-600 bg-white border rounded-lg shadow-lg z-10">
                      {teamMembers
                        .filter(m => !selectedMembers.find(sm => sm.id === m.id))
                        .map(member => (
                          <button
                            key={member.id}
                            onClick={() => addMember(member)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                          >
                            {member.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedMembers.map(member => (
                    <span
                      key={member.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#01B0E9] text-white text-sm rounded-full"
                    >
                      {member.name}
                      <button onClick={() => removeMember(member.id)} className="ml-1">
                        <MdClose className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Source */}
            {pathname !== '/payments' && pathname !== '/clients' && pathname !== '/jobs' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                <div className="flex flex-wrap gap-2">
                  {leadSources.map(source => (
                    <button
                      key={source}
                      onClick={() => toggleFilter(leadSource, source, setLeadSource)}
                      className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${leadSource.includes(source)
                          ? 'border-[#01B0E9] text-black'
                          : 'border-gray-100 text-black hover:border-[#01B0E9]'
                        }`}
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Job Type / Event Type */}
            {pathname !== '/payments' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{pathname === '/jobs' ? 'Job Type' : 'Event Type'}</label>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFilter(eventType, type, setEventType)}
                      className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${eventType.includes(type)
                          ? 'border-[#01B0E9] text-black'
                          : 'border-gray-100 text-black hover:border-[#01B0E9]'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    className="w-full px-3 py-2 text-gray-600 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01B0E9] focus:border-[#01B0E9]"
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    className="w-full px-3 py-2 text-gray-600 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01B0E9] focus:border-[#01B0E9]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Status (Only Payments page) */}
            {pathname === '/payments' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                <div className="flex flex-wrap gap-2">
                  {paymentStatuses.map(ps => (
                    <button
                      key={ps}
                      onClick={() => toggleFilter(paymentStatus, ps, setPaymentStatus)}
                      className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${paymentStatus.includes(ps)
                          ? 'border-[#01B0E9] text-black'
                          : 'border-gray-100 text-black hover:border-[#01B0E9]'
                        }`}
                    >
                      {ps}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 mt-auto">
            <button
              onClick={applyFilters}
              className="w-full py-2 bg-[#01B0E9] text-white font-medium rounded-full hover:bg-[#01B0E9]/75 cursor-pointer transition-colors"
            >
              Apply
            </button>
            <button className='text-center w-full mt-2 text-[#01B0E9] cursor-pointer' onClick={resetFilters}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}