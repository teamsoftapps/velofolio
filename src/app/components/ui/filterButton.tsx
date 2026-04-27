/** @format */

// /** @format */

// import React from 'react';
// import { CiFilter } from 'react-icons/ci';

// const FilterButton = () => {
//   return (
//     <button className='flex items-center text-xl gap-1 h-10 p-2 bg-white cursor-pointer hover:bg-[#F4F4F5] w-24 rounded-md border border-gray-300'>
//       <CiFilter className='w-5 h-5 text-black' />

//       <span className='text-sm text-black '>Filter</span>
//     </button>
//   );
// };

// export default FilterButton;

/** @format */

import React from 'react';
import { CiFilter } from 'react-icons/ci';

const FilterButton = ({setOpenFilter}:any) => {
  return (
    <button
      type='button'
      onClick={()=>setOpenFilter(true)}
      className='flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F4F4F5] hover:bg-gray-100 text-gray-900 text-sm font-medium rounded-md  border border-gray-300 w-fit min-w-[6rem] transition-colors duration-150'
      aria-label='Open filter options'>
      <CiFilter className='w-5 h-5' />
      <span>Filter</span>
    </button>
  );
};

export default FilterButton;
