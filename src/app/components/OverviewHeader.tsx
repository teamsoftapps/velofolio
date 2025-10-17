/** @format */

import React from "react";
import { GoSearch } from "react-icons/go";
import { FaSort } from "react-icons/fa";
import AddButton from "./AddButton";

const OverviewHeader = ({ title }: any) => {
  return (
    <div className=" w-full Header mt-10 flex items-center justify-between p-2 text-black">
      <div className=" w-6/18 left p-2">
        <h1 className="text-2xl mb-3 font-semibold">{title} Overview</h1>
        <h3 className="text-gray-600 text-sm">Dashboard | {title} Overview</h3>
      </div>

      <div className="w-5/7 right flex items-center justify-between gap-3">
        <div className="w-1/2 input-container bg-white text-black  flex items-center gap-2 p-1 rounded-md border border-gray-300">
          <input
            type="text"
            placeholder="Search by name/email"
            className="w-[90%] h-8 p-2 text-md outline-none border-none"
          />
          <button
            type="submit"
            className="w-12 px-3 cursor-pointer flex justify-center items-center"
          >
            <GoSearch className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <button className="flex items-center gap-1 h-10 py-2 pr-3 pl-2 bg-white cursor-pointer hover:bg-[#F4F4F5] w-24 rounded-md border border-gray-300">
          <FaSort className="w-5 h-5 text-gray-700" />
          <span className="text-sm">Sort</span>
        </button>

        <button className="flex items-center gap-1 h-10 py-2 pr-3 pl-2 bg-white cursor-pointer hover:bg-[#F4F4F5] w-24 rounded-md border border-gray-300">
          <FaSort className="w-5 h-5 text-gray-700" />
          <span className="text-sm">Filter</span>
        </button>

        <div className="w-2/10">
          <AddButton title={"Add New " + title.slice(0, -1)} />
        </div>
      </div>
    </div>
  );
};

export default OverviewHeader;
