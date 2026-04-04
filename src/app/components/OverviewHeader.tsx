
/** @format */
'use client';
import React, { useState } from 'react';
import { colors } from "../../utils/colors";
import { GoSearch } from 'react-icons/go';
import { FaSort, FaPlus } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { MdEmail } from 'react-icons/md';
import { CiFilter } from 'react-icons/ci';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import AddButton from './AddButton';
import SortModal from './SortModal';
import { SortOption } from './SortModal';
import ImportClientsButton from './ImportClientsButton';
import CalenderModal from "./CalenderModal";
import { DateValue } from "@internationalized/date";
import Link from "next/link";
import InviteEmailButton from './InviteEmailButton';
interface SortState {
  value: string;
  direction: 'asc' | 'desc';
}

interface OverviewHeaderProps {
  title: string;
  // setSearchedData: (data: []) => void;
  searchedValue: string;
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
  setOpenForm: (isOpen: boolean) => void;
  setOpenFilter: (isOpen: boolean) => void;
  sortBy: SortState,
  summary?: any,
  setSortBy: React.Dispatch<React.SetStateAction<SortState | SortOption>>,
  timeRange?: string;
  setTimeRange?: (range: string) => void;
  value?: DateValue;
  setValue?: (value: DateValue) => void;
}

const OverviewHeader = ({
  title,
  setOpenForm,
  searchedValue,
  setSearchedValue,
  setOpenFilter,
  sortBy,
  summary,
  setSortBy,
  timeRange,
  setTimeRange,
  value,
  setValue
}: OverviewHeaderProps) => {
  const currentPath = usePathname();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortOption | any>('added-newest');
  const [openCalender, setOpenCalender] = useState(false);

  const getMonthName = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleString("en-US", { month: "long" });
  };

  const handleChangeValue = (newValue: DateValue) => {
    if (setValue && setTimeRange) {
      setValue(newValue);
      setOpenCalender(false);
      setTimeRange("Custom");
    }
  };

  function formatDate(value: DateValue | undefined) {
    if (!value) return "No date selected";
    return `${String(value.day).padStart(2, "0")}-${getMonthName(value)}-${value.year}`;
  }
  const pathSegments = currentPath.split("/").filter(Boolean);
  return (
    <div className='flex flex-col lg:w-full Header mt-4 text-black'>
      <div className='flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4'>
        {/* Left: Title & Breadcrumb */}
        <div className='flex flex-col'>
          <h1 className="text-2xl font-bold text-gray-900">{title} Overview</h1>
          <nav className="flex text-sm text-[#8c8c8c] mt-1 gap-2">
            <Link href="/dashboard">Dashboard</Link>

            {pathSegments.map((segment, index) => {
              const href = "/" + pathSegments.slice(0, index + 1).join("/");

              return (
                <React.Fragment key={href}>
                  <span>|</span>
                  <Link href={href} className="hover:text-black">
                    {segment.charAt(0).toUpperCase() + segment.slice(1)} Overview
                  </Link>
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Controls Bar */}
        <div className='flex flex-wrap items-center gap-3 lg:justify-end flex-1'>
          {/* Search Bar */}
          <div className='relative flex-1 min-w-[280px] md:max-w-xs bg-white border border-[#E5E7EB] rounded-lg h-11 flex items-center px-4'>
            <input
              type='text'
              placeholder='Search by name, event, email'
              value={searchedValue}
              className='w-full outline-none text-sm text-gray-900 placeholder:text-[#9CA3AF]'
              onChange={(e) => setSearchedValue(e.target.value)}
            />
            <GoSearch className='text-[#9CA3AF] text-lg ml-2' />
          </div>

          {/* Time Filter Buttons */}
          {setTimeRange && (
            <div className='flex border border-[#E5E7EB] rounded-lg overflow-hidden bg-white h-11 flex-shrink-0'>
              {["7 Days", "30 Days", "Mtd", "Ytd", "All Data"].map((range, index) => (
                <button
                  key={range}
                  className={`px-3 md:px-4 text-sm font-medium transition-colors border-r border-[#E5E7EB] last:border-0 cursor-pointer ${timeRange === range
                    ? "text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  style={timeRange === range ? { backgroundColor: colors.primary } : {}}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons: Sort, Filter, Add */}
          <div className='flex items-center gap-2 flex-wrap lg:flex-nowrap'>
            <button
              className='flex items-center justify-center gap-2 h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'
              onClick={() => setIsSortOpen(true)}
            >
              <FaSort className='text-gray-400' />
              <span>Sort</span>
            </button>
            <SortModal
              isOpen={isSortOpen}
              onClose={() => setIsSortOpen(false)}
              sortBy={sortBy}
              setSortBy={setSortBy}
              currentSort={currentSort}
              onSortChange={(option) => {
                setCurrentSort(option.id);
                setSortBy({ value: option.value, direction: option.direction });
              }}
            />

            <button
              className='flex items-center justify-center gap-2 h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'
              onClick={() => setOpenFilter(true)}
            >
              <CiFilter className='text-lg' />
              <span>Filter</span>
            </button>

            {value && setValue && (
              <div className="relative">
                <button
                  className="flex items-center justify-center gap-2 h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setOpenCalender(!openCalender)}
                >
                  <FiChevronDown className={`transition-transform ${openCalender ? 'rotate-180' : ''}`} />
                  <span>{formatDate(value)}</span>
                </button>
                {openCalender && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-[#E5E7EB] z-[1000] shadow-xl">
                    <CalenderModal value={value} setValue={handleChangeValue} />
                  </div>
                )}
              </div>
            )}
            {
              currentPath === '/team' && (
                <InviteEmailButton onClick={() => setOpenForm(true)} />
              )
            }
            {currentPath !== '/payments' && (
              <button
                className='flex items-center gap-3 h-11 py-3 pl-1.5 pr-6 rounded-full text-sm font-bold text-white shadow-sm hover:brightness-105 transition-all cursor-pointer whitespace-nowrap w-fit'
                style={{ backgroundColor: colors.primary }}
                onClick={() => setOpenForm(true)}
              >
                <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center">
                  <FaPlus className="w-3.5 h-3.5" />
                </div>
                <span>
                  {currentPath === '/team' ? 'Add New Member' : `Add New ${title.slice(-1) === 's' ? title.slice(0, -1) : title}`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewHeader;
