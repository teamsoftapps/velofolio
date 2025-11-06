'use client';

import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ReportButton from './ReportButton';
import { BiSolidReport } from 'react-icons/bi';
import COLORS from '@/utils/Color';

const ReportHeader = () => {
  const [timeRange, setTimeRange] = React.useState('7 Days');

  return (
    <div className="mb-6 px-2 lg:px-3 mt-15 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left: Title */}
      <div className="flex-1 sm:flex-initial md:text-left justify-start items-start">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Reports Overview
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Dashboard | Reports Overview
        </p>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:w-auto md:justify-between">
        {/* Time Range Buttons */}
        <div className="flex w-full overflow-x-auto sm:w-auto">
          {['7 Days', '30 Days', 'Mtd', 'Ytd'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors first:rounded-l-md last:rounded-r-md border border-gray-300 sm:text-base ${
                timeRange === range
                  ? 'bg-[#01B0E9] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${range !== 'Ytd' ? 'border-r-0' : ''}`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Date Range Select */}
        <div className="relative w-full sm:w-60">
          <select
            className="w-full appearance-none  text-black rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-[#01B0E9] focus:outline-none focus:ring-2 focus:ring-[#01B0E9]/20 sm:text-base"
            defaultValue="26 Aug 2025 - 2 Sep 2025"
          >
            <option>26 Aug 2025 - 2 Sep 2025</option>
            <option>1 Sep 2025 - 30 Sep 2025</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Export Button */}
        <div className="w-full sm:w-auto">
          <ReportButton
            title="Export Report"
            setOpenForm={() => {}}
            color={COLORS.greenButton}
            hoverColor={COLORS.greenHover}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;