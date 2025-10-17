"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Add your search logic here (e.g., filter events)
  };

  return (
    <div className="flex flex-row">
      <div className="w-full flex flex-row  bg-[#F4F4F5] justify-around items-center rounded pl-5]">
        <input
          type="text"
          placeholder="Search events"
          value={searchQuery}
          onChange={handleSearch}
          className="w-[80%] p-2 border-black focus:outline-none placeholder-black text-black"
        />
        <div>
          <FaSearch className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
