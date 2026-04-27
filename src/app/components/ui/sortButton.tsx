// /** @format */

// import React, { useState } from 'react';
// import SortModal from './SortModal';
// import { FaSort } from 'react-icons/fa';
// const SortButton = ({ sortBy, setSortBy, options }: any) => {
//   const [currentSort, setCurrentSort] = useState('added-newest');
//   const [isOpen, setIsOpen] = useState(false);
//   return (<div className='relative'>
//     <button className='flex items-center gap-1 h-10 py-2 pr-3 pl-2 bg-[#F4F4F5] cursor-pointer hover:bg-[#F4F4F5] w-24 rounded-md border border-gray-300' onClick={() => setIsOpen(true)}>
//       <FaSort className='w-5 h-5 text-gray-700' />
//       <span className='text-sm text-black'>Sort</span>
//     </button>

//     <SortModal
//       isOpen={isOpen}
//       onClose={() => setIsOpen(false)}
//       currentSort={currentSort}
//       onSortChange={(option) => {
//         setCurrentSort(option.id);
//         setSortBy({ value: option.value, direction: option.direction });
//       }}
//       sortBy={sortBy}
//       setSortBy={setSortBy}
//       options={options}
//     />

//   </div>
//   );
// };

// export default SortButton;

import React, { useState } from 'react';
import SortModal from '@/app/components/forms/SortModal';
import { FaSort } from 'react-icons/fa';

const SortButton = ({ sortBy, setSortBy, options, setSortActive }: any) => {
  const [currentSort, setCurrentSort] = useState('added-oldest');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // setCurrentSort('event-newest');
  };

  const handleSortChange = (option: any) => {
    setCurrentSort(option.id);
    setSortBy({ value: option.value, direction: option.direction });
    if (setSortActive) setSortActive(true);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 h-10 px-3 bg-[#F4F4F5] w-24 rounded-md border border-gray-300"
        onClick={handleOpen}
      >
        <FaSort className="w-5 h-5 text-gray-700" />
        <span className="text-sm text-black">Sort</span>
      </button>

      <SortModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentSort={currentSort}
        onSortChange={handleSortChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        options={options}
      />
    </div>
  );
};

export default SortButton;