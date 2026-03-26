
/** @format */
'use client';
import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { FaSort } from 'react-icons/fa';
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
  return (
    <div className='flex-col sm:flex-row  lg:w-full Header mt-10 flex  md:flex-row items-start md:items-center justify-between p-2 text-black'>

      <div className='w-full sm:w-6/20 md:w-6/20  lg:block md:block lg:w-6/18 left p-2'>
        <h1 className={` ${currentPath == "/payments" ? " md:text-xl  lg:2xl" : "text-2xl"} mb-3 font-semibold`}>{title} Overview</h1>
        <h3 className='text-gray-600 text-sm'>Dashboard | {title} Overview</h3>
      </div>



      <div className={`flex flex-col gap-4 w-full lg:w-auto right items-center lg:items-end ${currentPath == "/payments" ? "xl:w-2/3 lg:w-3/4" : "lg:w-auto"}`}>
        <div className="flex flex-col md:flex-row w-full gap-3 justify-end items-stretch md:items-center flex-wrap">
          {currentPath === "/payments" && setTimeRange && value && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white shrink-0">
                {["7 Days", "30 Days", "Mtd", "Ytd", "All Data"].map((range, index) => (
                  <button
                    key={range}
                    className={`px-3 py-2 text-xs border-r border-gray-300 last:border-r-0 cursor-pointer transition-colors ${timeRange === range
                      ? "bg-[rgb(1,176,233)] text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-44 shrink-0">
                <button
                  className="appearance-none w-full cursor-pointer bg-white rounded-md py-2 px-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-xs text-left border border-gray-300 flex items-center justify-between"
                  onClick={() => setOpenCalender(!openCalender)}
                >
                  <span className="truncate">{formatDate(value)}</span>
                  {openCalender ? <FiChevronUp className="text-base shrink-0" /> : <FiChevronDown className="text-base shrink-0" />}
                </button>
                {openCalender && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl border-2 border-gray-200 z-[1000] shadow-2xl">
                    <CalenderModal value={value} setValue={handleChangeValue} />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={`w-full md:w-64 shrink-0 bg-white text-black flex items-center gap-2 p-1 rounded-md border border-gray-300`}>
            <input
              type='text'
              placeholder='Search by name/email'
              value={searchedValue}
              className='w-full h-8 p-2 text-xs sm:text-sm outline-none border-none'
              onChange={(e) => setSearchedValue(e.target.value)}
            />
            <button
              type='submit'
              className='px-2 cursor-pointer flex justify-center items-center'
            >
              <GoSearch className='w-4 h-4 text-gray-600' />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {currentPath !== '/team' && (
              <div className='relative shrink-0'>
                <button className='
                  flex items-center gap-1 h-10 py-2 pr-3 pl-2 
                  bg-white cursor-pointer hover:bg-[#F4F4F5]
                  rounded-md border border-gray-300
                  z-1000
                ' onClick={() => setIsSortOpen(true)}>
                  <FaSort className='w-4 h-4 text-gray-700' />
                  <span className='text-sm'>Sort</span>
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
              </div>
            )}

            <button className='
              flex items-center gap-1 h-10 py-2 pr-3 pl-2
              bg-white cursor-pointer hover:bg-[#F4F4F5]
              rounded-md border border-gray-300 shrink-0
            '
              onClick={() => setOpenFilter(true)}
            >
              <CiFilter className='w-4 h-4' />
              <span className='text-sm'>Filter</span>
            </button>

            {currentPath === '/payments' ? null : (
              <div className='shrink-0 min-w-[140px]'>
                <AddButton
                  title={'Add New ' + title.slice(0, -1)}
                  setOpenForm={setOpenForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewHeader;
