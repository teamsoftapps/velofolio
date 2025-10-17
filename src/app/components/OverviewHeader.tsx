/** @format */
'use client';
import React from 'react';
import { GoSearch } from 'react-icons/go';
import { FaSort } from 'react-icons/fa';
import AddButton from './AddButton';
import { usePathname, useRouter } from 'next/navigation';
import { MdEmail } from 'react-icons/md';
import { CiFilter } from 'react-icons/ci';

interface OverviewHeaderProps {
  title: string;
  setSearchedData: (data: []) => void;
  // searchedData: [];
  searchedValue: string;
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
  setOpenForm: (isOpen: boolean) => void; // Adjust the type based on your use case
}
const OverviewHeader = ({
  title,
  setOpenForm,
  // searchedData,
  // setSearchedData,
  searchedValue,
  setSearchedValue,
}: OverviewHeaderProps) => {
  const currentPath = usePathname();
  return (
    <div className=' w-full Header mt-10 flex items-center justify-between p-2 text-black'>
      <div className=' w-6/18 left p-2'>
        <h1 className='text-2xl mb-3 font-semibold'>{title} Overview</h1>
        <h3 className='text-gray-600 text-sm'>Dashboard | {title} Overview</h3>
      </div>

      <div className='w-5/7 right flex items-center justify-between gap-3'>
        <div className='w-1/2 input-container bg-white text-black  flex items-center gap-2 p-1 rounded-md border border-gray-300'>
          <input
            type='text'
            placeholder='Search by name/email'
            value={searchedValue}
            className='w-[90%] h-8 p-2 text-md outline-none border-none'
            onChange={(e) => setSearchedValue(e.target.value)}
          />
          <button
            type='submit'
            className='w-12 px-3 cursor-pointer flex justify-center items-center'>
            <GoSearch className='w-5 h-5 text-gray-600' />
          </button>
        </div>
        {currentPath === '/Team' ? (
          ''
        ) : (
          <button className='flex items-center gap-1 h-10 py-2 pr-3 pl-2 bg-white cursor-pointer hover:bg-[#F4F4F5] w-24 rounded-md border border-gray-300'>
            <FaSort className='w-5 h-5 text-gray-700' />
            <span className='text-sm'>Sort</span>
          </button>
        )}

        <button className='flex items-center text-xl gap-1 h-10 py-2 pr-3 pl-2 bg-white cursor-pointer hover:bg-[#F4F4F5] w-24 rounded-md border border-gray-300'>
          <CiFilter className='w-5 h-5 text-black' />

          <span className='text-sm'>Filter</span>
        </button>
        {currentPath === '/Team' && (
          <button className='flex items-center justify-center text-white gap-1 h-10 py-2 pr-3 pl-2 bg-[#11da9d] cursor-pointer  w-48 rounded-full border border-gray-300'>
            <MdEmail className='w-5 h-5 text-white' />
            Send an Email
          </button>
        )}
        <div className='w-2/10'>
          <AddButton
            title={'Add New ' + title.slice(0, -1)}
            setOpenForm={setOpenForm}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewHeader;
