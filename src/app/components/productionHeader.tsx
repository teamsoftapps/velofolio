
/** @format */

import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import SortButton from './sortButton';
import FilterButton from './filterButton';
import { MdModeEditOutline } from 'react-icons/md';
import AddTeamMembersModal from './AddTeamMemberModal';


const ProductionHeader = ({ 
  setOpenFilter, 
  searchQuery, 
  setSearchQuery 
}: { 
  setOpenFilter: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [boardMembers, setBoardMembers] = useState<any[]>([]);


  const [openForm, setOpenForm] = useState(false);
 
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-200 gap-4 ">
      
      {/* Left Section: Search + Sort + Filter */}
      <div className="w-full md:gap-10 sm:w-3/4 flex gap-3 flex-col sm:flex-row sm:justify-between sm:items-center lg:gap-3  lg:w-1/2">
        
        {/* Search */}
        <div className="w-full sm:w-2/3">
          <SearchComponent 
            placeHolder="Search" 
            value={searchQuery}
            onSearch={setSearchQuery} 
          />
        </div>

        {/* Sort & Filter */}
        <div className="w-full sm:w-1/3 flex flex-row justify-between sm:justify-end items-center gap-2">

  
          <SortButton />
        

          <FilterButton setOpenFilter={setOpenFilter} />
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
<div className='relative'>
        {/* Add Button */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00A4DD] flex items-center justify-center text-white cursor-pointer hover:bg-[#008ac0] transition" onClick={()=>setIsOpen(true)}>
          <span className="text-lg sm:text-[25px]">+</span>
        </div>

        <AddTeamMembersModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        boardMembers={boardMembers}
        onAddMembers={(members) => {
          setBoardMembers(members);
          console.log('Added to board:', members);
        }}
      />

        </div>
      </div>
    </div>
  );
};

export default ProductionHeader;

