'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type ViewType = 'leads' | 'jobs' | 'payments';

interface ReportDropdownProps {
  onViewChange: (view: ViewType) => void;
  onDateChange?: (range: { start: Date; end: Date }) => void; // optional for now
}

const ReportDropdown = ({ onViewChange }: ReportDropdownProps) => {
  const [selectedView, setSelectedView] = useState<ViewType>('leads');
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'leads', label: 'Lead Stats' },
    { value: 'jobs', label: 'Job Stats' },
    { value: 'payments', label: 'Payments' },
  ] as const;

  const handleSelect = (view: ViewType) => {
    setSelectedView(view);
    onViewChange(view);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 rounded-lg text-left text-sm font-medium shadow-sm transition"
      >
        <span>{options.find(opt => opt.value === selectedView)?.label}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-100 transition ${
                selectedView === option.value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportDropdown;
