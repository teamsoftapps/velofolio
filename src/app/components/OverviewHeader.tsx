
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
import { SortOption } from './SortModal';

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
  sortBy: SortState
  setSortBy: React.Dispatch<React.SetStateAction<SortState | SortOption>>

}

const OverviewHeader = ({
  title,
  setOpenForm,
  searchedValue,
  setSearchedValue,
  setOpenFilter,
  sortBy,
 setSortBy
}: OverviewHeaderProps) => {
  const currentPath = usePathname();
const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortOption | any>('added-newest');
  return (
    <div className='flex-col sm:flex-row  lg:w-full Header mt-10 flex  md:flex-row items-start md:items-center justify-between p-2 text-black'>

      <div className='w-full sm:w-6/20 md:w-6/20  lg:block md:block lg:w-6/18 left p-2'>
        <h1 className={` ${currentPath=="/payments"?" md:text-xl  lg:2xl":"text-2xl"} mb-3 font-semibold`}>{title} Overview</h1>
        <h3 className='text-gray-600 text-sm'>Dashboard | {title} Overview</h3>
      </div>


      <div className={` flex-wrap w-full sm:w-1/2  justify-between  lg:flex-nowrap md:flex-nowrap right flex sm:flex-nowrap  items-center  gap-3 ${currentPath=="/payments"?"justify-end lg:w-2/4 md:w-2/3":" lg:w-5/7 md:w-5/7"}`}>

        <div className={`w-full ${currentPath=="/payments"?" lg:w-3/2 md:w-3/2":"lg:w-1/2 md:w-1/2"} sm:w-1/2 input-container bg-white text-black flex items-center gap-2 p-1 rounded-md border border-gray-300`}>
          <input
            type='text'
            placeholder='Search by name/email'
            value={searchedValue}
            className='w-[90%] h-8 p-2 text-md outline-none border-none'
            onChange={(e) => setSearchedValue(e.target.value)}
          />
          <button
            type='submit'
            className='w-12 px-3 cursor-pointer flex justify-center items-center'
          >
            <GoSearch className='w-5 h-5 text-gray-600' />
          </button>
        </div>
<div
  className={`
    flex flex-col md:flex-row md:flex-nowrap items-center justify-end gap-3 
    ${currentPath === '/team'
      ? 'w-full sm:w-1/2 md:w-[83%] lg:w-[50%]'
      : 'w-full sm:w-1/3 md:w-2/3 lg:w-[43%]'
    }
  `}
>




  {currentPath === '/team' ? null : (<div className='relative w-full md:w-auto '>
    <button className='
      flex items-center gap-1 h-10 py-2 pr-3 pl-2 
      bg-white cursor-pointer hover:bg-[#F4F4F5]
      rounded-md border border-gray-300
      w-full md:w-auto
      z-1000
    ' onClick={()=>{
      console.log('clicked');
      setIsSortOpen(true)}}>
      <FaSort className='w-5 h-5 text-gray-700' />
      <span className='text-sm'>Sort</span>
    </button>
    <SortModal
                isOpen={isSortOpen}
                onClose={() => setIsSortOpen(false)}
                sortBy={sortBy}
                setSortBy={setSortBy}
               
               
                currentSort={currentSort}
            onSortChange={(option) => { // option is SortOption
    setCurrentSort(option.id);
    setSortBy({ value: option.value, direction: option.direction });
    console.log('Sorting by:', option);
  }}
                />
    
    </div>
  )}


  <button className='
    flex items-center text-xl gap-1 h-10 py-2 pr-3 pl-2
    bg-white cursor-pointer hover:bg-[#F4F4F5]
    rounded-md border border-gray-300
    w-full md:w-auto
  '
  onClick={()=>setOpenFilter(true)}
  >
    <CiFilter className='w-4 h-4 md:w-5 md:h-5' />
    <span className='text-sm'>Filter</span>
  </button>

  
  {currentPath === '/team' && (
    <button className='
      flex items-center justify-center text-white gap-1
      h-10 py-2 pr-3 pl-2 bg-[#11da9d]
      rounded-full border border-gray-300
      w-full md:w-auto
      md:text-sm
    '>
      <MdEmail className='w-5 h-5 text-white' />
      Send an Email
    </button>
  )}

{
  currentPath=="/payments"? null:(
     <div className='w-full md:w-auto'>
    <AddButton
      title={'Add New ' + title.slice(0, -1)}
      setOpenForm={setOpenForm}
    />
  </div>
  )
}
 

</div>

      </div>

    </div>
  );
};

export default OverviewHeader;
