/** @format */

import React, { useState } from 'react';
import SortModal from './SortModal';
import { FaSort } from 'react-icons/fa';
const SortButton = () => {
    const [currentSort, setCurrentSort] = useState('added-newest');
    const [isOpen, setIsOpen] = useState(false);
  return (<div className='relative'>
    <button className='flex items-center gap-1 h-10 py-2 pr-3 pl-2 bg-[#F4F4F5] cursor-pointer hover:bg-[#F4F4F5] w-24 rounded-md border border-gray-300' onClick={() => setIsOpen(true)}>
      <FaSort className='w-5 h-5 text-gray-700' />
      <span className='text-sm text-black'>Sort</span>
    </button>
     <SortModal
           isOpen={isOpen}
           onClose={() => setIsOpen(false)}
           currentSort={currentSort}
           onSortChange={()=>{
            console.log('Sort changed');
           }}
         />
         </div>
  );
};

export default SortButton;
