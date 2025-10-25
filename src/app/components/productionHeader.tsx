// /** @format */

// import React from 'react';
// import SearchComponent from './SearchComponent';
// import SortButton from './sortButton';
// import FilterButton from './filterButton';
// import { MdModeEditOutline } from 'react-icons/md';
// const ProductionHeader = () => {
//   return (
//     <div className='w-full p-4 bg-white rounded-lg shadow flex flex-row justify-between items-center border border-gray-200 '>
//       <div className='w-5/8 flex flex-row justify-between items-center '>
//         {/* search */}
//         <div className='w-5/7 flex flex-row justify-between items-center '>
//           <SearchComponent placeHolder='Search' />
//         </div>
//         <div className='w-2/8 flex flex-row justify-around items-center '>
//           {/* sort */}
//           <div>
//             <SortButton />
//           </div>
//           {/* filter */}
//           <div>
//             <FilterButton />
//           </div>
//         </div>
//       </div>
//       <div className='max-w-2/12 flex flex-row justify-between items-center  '>
//         <div className='flex flex-row justify-between items-center  '>
//           <div className='flex items-center'>
//             <img
//               src='/teampic1.png'
//               alt='team1'
//               className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white -mr-3'
//             />
//             <img
//               src='/teampic2.png'
//               alt='team2'
//               className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white -mr-3'
//             />
//             <img
//               src='/teampic3.png'
//               alt='team3'
//               className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white'
//             />
//             <span className='text-[22px] text-black px-3 '>+6</span>
//           </div>
//           <div className='w-10 h-10 rounded-full bg-[#00A4DD] flex items-center justify-center'>
//             <span className='text-[25px]'>+</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductionHeader;
/** @format */

import React from 'react';
import SearchComponent from './SearchComponent';
import SortButton from './sortButton';
import FilterButton from './filterButton';
import { MdModeEditOutline } from 'react-icons/md';

const ProductionHeader = () => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-200 gap-4">
      
      {/* Left Section: Search + Sort + Filter */}
      <div className="w-full sm:w-3/4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        
        {/* Search */}
        <div className="w-full sm:w-2/3">
          <SearchComponent placeHolder="Search" />
        </div>

        {/* Sort & Filter */}
        <div className="w-full sm:w-1/3 flex flex-row justify-between sm:justify-end items-center gap-2">
          <SortButton />
          <FilterButton />
        </div>
      </div>

      {/* Right Section: Team Avatars + Add Button */}
      <div className="w-full sm:w-auto flex flex-row justify-between sm:justify-end items-center gap-4">
        {/* Avatars */}
        <div className="flex items-center ">
          <img
            src="/teampic1.png"
            alt="team1"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white -mr-3"
          />
          <img
            src="/teampic2.png"
            alt="team2"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white -mr-3"
          />
          <img
            src="/teampic3.png"
            alt="team3"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
          />
          <span className="text-sm sm:text-[18px] text-black -ml-2 sm:px-3">+6</span>
        </div>

        {/* Add Button */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00A4DD] flex items-center justify-center text-white cursor-pointer hover:bg-[#008ac0] transition">
          <span className="text-lg sm:text-[25px]">+</span>
        </div>
      </div>
    </div>
  );
};

export default ProductionHeader;

