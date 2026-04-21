
/** @format */
'use client';
import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { FaSort } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { MdEmail } from 'react-icons/md';
import { CiFilter } from 'react-icons/ci';
import AddButton from './AddButton';
import SortModal from './SortModal';
import Link from "next/link";
// interface OverviewHeaderProps {
//   title: string;
//   setSearchedData: (data: []) => void;
//   searchedValue: string;
//   setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
//   setOpenForm: (isOpen: boolean) => void;
//   setOpenFilter: (isOpen: boolean) => void;
//   // setIsSortOpen: (isOpen: boolean) => void;
// }

const OverviewHeader = () => {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/").filter(Boolean);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('added-newest');
  return (
    <div className='flex-col sm:flex-row  lg:w-full Header mt-10 flex  md:flex-row items-start md:items-center justify-between text-black'>

      <div className='w-full sm:w-6/20 md:w-6/20 lg:block md:block lg:w-6/18 left  pt-2'>
        <h1 className='text-2xl mb-3 font-semibold'>Calendar Overview</h1>
        <h3 className='text-[#8c8c8c] text-sm flex gap-2'>
          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>
          <span>|</span>
          <Link href="/calendar" className="font-semibold text-black">
            Calendar Overview
          </Link>
        </h3>
      </div>







      <div className='flex items-center justify-end flex-1'>
        <AddButton
          title={'Add New'}
          setOpenForm={() => console.log('Open Form clicked')}
        />
      </div>





    </div>
  );
};

export default OverviewHeader;
