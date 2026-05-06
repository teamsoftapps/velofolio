/** @format */

'use client';

import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { 
  TEAM_MEMBERS, 
  LEAD_SOURCES, 
  PAYMENT_STATUSES, 
  CATEGORY_OPTIONS, 
  getStatusesByPath, 
  getEventTypesByPath,
  CALENDAR_STATUS_GROUPS,
  TeamMember
} from '@/config/filterConfig';
import { useFilterState, FilterState } from '@/hooks/useFilterState';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: string;
}

// --- Reusable Sub-components ---

const FilterSection = ({ 
  label, 
  options, 
  selected, 
  onToggle, 
  size = 'md' 
}: { 
  label: string; 
  options: string[]; 
  selected: string[]; 
  onToggle: (val: string) => void;
  size?: 'sm' | 'md';
}) => (
  <div>
    <label className={`block font-medium text-gray-700 mb-2 ${size === 'sm' ? 'text-xs text-gray-400 uppercase tracking-wider' : 'text-lg'}`}>
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onToggle(opt)}
          className={`rounded-lg font-medium border-2 transition-all cursor-pointer ${
            size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1 text-sm'
          } ${
            selected.includes(opt)
              ? 'border-[var(--primary-color)] text-black'
              : 'border-gray-100 text-black hover:border-[var(--primary-color)]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default function FilterModal({
  isOpen,
  onClose,
  isVisible,
  setIsVisible,
  onApply,
  mode,
}: FilterModalProps) {
  const pathname = usePathname();
  const {
    filters,
    dropdownOpen,
    setDropdownOpen,
    toggleFilter,
    setDateRange,
    addMember,
    removeMember,
    resetFilters,
    applyFilters,
  } = useFilterState(onApply, onClose);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsVisible]);

  if (!isOpen && !isVisible) return null;

  const statuses = getStatusesByPath(pathname, mode);
  const eventTypes = getEventTypesByPath(pathname);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div
        className="fixed top-24 bottom-6 right-4 sm:top-[120px] sm:bottom-8 sm:right-8 rounded-2xl w-[calc(100vw-2rem)] sm:w-[400px] z-[100] transform transition-transform ease-in-out"
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
            {/* --- Status Sections --- */}
            {pathname !== '/calendar' && (pathname !== '/payments' || mode === 'contracts') && (
              <FilterSection
                label={mode === 'contracts' ? 'Document Status' : 'Status'}
                options={statuses}
                selected={filters.status}
                onToggle={(val) => toggleFilter('status', val)}
              />
            )}

            {pathname === '/calendar' && (
              <div className="space-y-4">
                {CALENDAR_STATUS_GROUPS.map((group) => (
                  <FilterSection
                    key={group.label}
                    label={group.label}
                    options={group.options}
                    selected={filters[group.stateKey] as string[]}
                    onToggle={(val) => toggleFilter(group.stateKey, val)}
                  />
                ))}
              </div>
            )}

            {/* --- Categories (Calendar Only) --- */}
            {pathname === '/calendar' && (
              <FilterSection
                label="Show on Calendar"
                options={CATEGORY_OPTIONS}
                selected={filters.categories}
                onToggle={(val) => toggleFilter('categories', val)}
              />
            )}

            {/* --- Assigned Member --- */}
            {mode !== 'contracts' && (pathname === '/jobs' || pathname === '/team') && (
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
                      {TEAM_MEMBERS.filter((m) => !filters.selectedMembers.find((sm) => sm.id === m.id)).map((member) => (
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
                  {filters.selectedMembers.map((member) => (
                    <span key={member.id} className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary-color)] text-white text-sm rounded-full">
                      {member.name}
                      <button onClick={() => removeMember(member.id)} className="ml-1">
                        <MdClose className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* --- Lead Source --- */}
            {mode !== 'contracts' && !['/payments', '/clients', '/jobs', '/calendar'].includes(pathname) && (
              <FilterSection
                label="Lead Source"
                options={LEAD_SOURCES}
                selected={filters.leadSource}
                onToggle={(val) => toggleFilter('leadSource', val)}
              />
            )}

            {/* --- Event Types --- */}
            {mode !== 'contracts' && pathname !== '/payments' && (
              <FilterSection
                label={pathname === '/jobs' ? 'Job Type' : 'Event Type'}
                options={eventTypes}
                selected={filters.eventType}
                onToggle={(val) => toggleFilter('eventType', val)}
              />
            )}

            {/* --- Date Range --- */}
            {pathname !== '/calendar' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) => setDateRange(e.target.value, filters.toDate)}
                    className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)]"
                  />
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) => setDateRange(filters.fromDate, e.target.value)}
                    className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)]"
                  />
                </div>
              </div>
            )}

            {/* --- Payment Status --- */}
            {mode !== 'contracts' && pathname === '/payments' && (
              <FilterSection
                label="Payment Status"
                options={PAYMENT_STATUSES}
                selected={filters.paymentStatus}
                onToggle={(val) => toggleFilter('paymentStatus', val)}
              />
            )}
          </div>

          <div className="p-6 border-t border-gray-100 mt-auto">
            <button
              onClick={applyFilters}
              className="w-full py-2 bg-[var(--primary-color)] text-white font-medium rounded-full hover:bg-[var(--primary-color)]/75 cursor-pointer transition-colors"
            >
              Apply
            </button>
            <button className="text-center w-full mt-2 text-[var(--primary-color)] cursor-pointer" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
