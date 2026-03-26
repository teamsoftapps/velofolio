/** @format */

'use client';

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchComponent = ({ 
  placeHolder, 
  value, 
  onSearch 
}: { 
  placeHolder: string; 
  value?: string; 
  onSearch?: (val: string) => void 
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  
  const query = value !== undefined ? value : internalQuery;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onSearch) {
      onSearch(val);
    } else {
      setInternalQuery(val);
    }
  };

  return (
    <div className='w-full flex flex-row'>
      <div className='w-full flex flex-row bg-[#F4F4F5] justify-around items-center rounded'>
        <input
          type='text'
          placeholder={placeHolder}
          value={query}
          onChange={handleSearch}
          className='w-[80%] py-2 border-black focus:outline-none placeholder-black text-black '
        />
        <div>
          <FaSearch className='w-5 h-5 text-gray-500' />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
