'use client';

import React, { useEffect, useState } from 'react';
import { MdCalendarToday, MdClose } from 'react-icons/md';


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

export default function FilterModal({ isOpen, onClose,isVisible, setIsVisible,onApply }: { isOpen: boolean; onClose: () => void,onApply: (filters: any) => void; isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  // Status Filters
  const [status, setStatus] = useState<string[]>(['Active']);
  const statuses = ['Active', 'Inactive', 'Lead', 'Archived',"Booked","New Lead"];

  // Assigned Team Members
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([
    teamMembers[0],
    teamMembers[1],
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Lead Source
  const [leadSource, setLeadSource] = useState<string[]>(['Website']);
  const leadSources = ['Website', 'Referral', 'Instagram', 'Facebook', 'Walk-in'];

  // Event Type
  const [eventType, setEventType] = useState<string[]>(['Wedding']);
  const eventTypes = ['Wedding', 'Corporate', 'Pre-wedding', 'Birthday', 'Other'];

  // Payment Status
  const [paymentStatus, setPaymentStatus] = useState<string[]>([]);
  const paymentStatuses = ['Paid', 'Pending', 'Overdue',"Booked","Archived"];

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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50  z-40"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
<div
  className={`fixed sm:top-24 sm:right-8 rounded-2xl h-[80vh] w-full sm:w-[400px]  z-50 transform transition-transform ease-in-out`}
  style={{
    transform: isOpen ? 'translateX(0)' : 'translateX(420px)', // 400px + 20px margin
    transitionDuration: '2000ms',
  }}
>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[89vh] overflow-y-auto scroller">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-xl font-semibold text-gray-900">Filter</h2>
            <button onClick={onClose} className="text-gray-700 hover:text-gray-600 cursor-pointer">
              <MdClose className="w-6 h-6 " />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Status */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleFilter(status, s, setStatus)}
                    className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${
                      status.includes(s)
                        ? 'border-[#01B0E9] text-black'
                        : 'border-gray-100 text-black hover:border-[#01B0E9]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Assigned Team / Member */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Team / Member</label>
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

              {/* Selected Members */}
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

            {/* Lead Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
              <div className="flex flex-wrap gap-2">
                {leadSources.map(source => (
                  <button
                    key={source}
                    onClick={() => toggleFilter(leadSource, source, setLeadSource)}
                     className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${
                      leadSource.includes(source)
                        ? 'border-[#01B0E9] text-black'
                        : 'border-gray-100 text-black hover:border-[#01B0E9]'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleFilter(eventType, type, setEventType)}
                       className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${
                      eventType.includes(type)
                        ? 'border-[#01B0E9] text-black'
                        : 'border-gray-100 text-black hover:border-[#01B0E9]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

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
                  {/* <MdCalendarToday className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                </div>
                <div className="relative">
                  <input
                    type="date"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    className="w-full px-3 py-2 text-gray-600 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01B0E9] focus:border-[#01B0E9]"
                  />
                  {/* <MdCalendarToday className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <div className="flex flex-wrap gap-2">
                {paymentStatuses.map(ps => (
                  <button
                    key={ps}
                    onClick={() => toggleFilter(paymentStatus, ps, setPaymentStatus)}
                         className={`px-4 py-1 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${
                      paymentStatus.includes(ps)
                        ? 'border-[#01B0E9] text-black'
                        : 'border-gray-100 text-black hover:border-[#01B0E9]'
                    }`}
                  >
                    {ps}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 ">
            <button
              onClick={applyFilters}
              className="w-full py-2 bg-[#01B0E9] text-white font-medium rounded-full hover:bg-[#01B0E9]/75 cursor-pointer transition-colors"
            >
              Apply
            </button>
            <button className='text-center w-full  mt-2 text-[#01B0E9]' onClick={resetFilters}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}