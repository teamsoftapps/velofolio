'use client';

import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ReportButton from './ReportButton';
import COLORS from '@/utils/Color';
import { DateValue } from "@internationalized/date";
import CalenderModal from "../CalenderModal";

const ReportHeader = ({
  timeRange,
  setTimeRange,
  value,
  setValue,
  onExport
}: {
  timeRange: string;
  setTimeRange: (range: string) => void;
  value: DateValue;
  setValue: (val: DateValue) => void;
  onExport?: () => void;
}) => {
  const [openCalender, setOpenCalender] = React.useState(false);

  const getMonthName = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleString("en-US", { month: "long" });
  };

  const formatDate = (val: DateValue | null) => {
    if (!val) return "Select date";
    return `${String(val.day).padStart(2, "0")}-${getMonthName(val)}-${val.year}`;
  };

  const handleChangeValue = (newValue: DateValue) => {
    setValue(newValue);
    setOpenCalender(false);
    setTimeRange("Custom");
  };

  return (
    <div className="mb-6 px-2 lg:px-3 mt-15 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1 sm:flex-initial md:text-left justify-start items-start">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Reports Overview
        </h1>
        <p className="mt-1 text-sm text-[#8c8c8c]">
          Dashboard | <span className="font-semibold text-black">Reports Overview</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:w-auto md:justify-between flex-wrap">
        <div className="flex w-full overflow-x-auto sm:w-auto">
          {['7 Days', '30 Days', 'Mtd', 'Ytd'].map((range, index) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors border border-gray-300 sm:text-base ${index === 0 ? "rounded-l-md" : ""
                } ${index === 3 ? "rounded-r-md" : ""} ${timeRange === range
                  ? 'bg-[#01B0E9] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${index !== 3 ? 'border-r-0' : ''}`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <button
            onClick={() => setOpenCalender(!openCalender)}
            className="appearance-none w-full cursor-pointer bg-white rounded-md py-2 px-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base text-left border border-gray-300"
          >
            {formatDate(value)}
          </button>

          {openCalender && (
            <div className="absolute top-12 right-0 bg-white rounded-2xl border-2 border-gray-200 z-[100] shadow-2xl">
              <CalenderModal value={value} setValue={handleChangeValue} />
            </div>
          )}

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-black">
            {openCalender ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <ReportButton
            title="Export Report"
            setOpenForm={onExport || (() => { })}
            color={COLORS.greenButton}
            hoverColor={COLORS.greenHover}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;