
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
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('added-newest');
  return (
    <div className='flex-col sm:flex-row  lg:w-full Header mt-10 flex  md:flex-row items-start md:items-center justify-between p-2 text-black'>

      <div className='w-full sm:w-6/20 md:w-6/20 lg:block md:block lg:w-6/18 left p-2'>
        <h1 className='text-2xl mb-3 font-semibold'>Calendar Overview</h1>
        <h3 className='text-gray-600 text-sm'>Dashboard | Calendar Overview</h3>
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
