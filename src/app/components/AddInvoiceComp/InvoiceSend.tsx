// components/InvoiceActions.tsx
"use client";

import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { PiPencilSimple } from "react-icons/pi";
import { CiFileOn } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";


interface InvoiceActionsProps {
  onSendInvoice: () => void;
  type: string
}

export default function InvoiceActions({ onSendInvoice, type="Invoice" }: InvoiceActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-2 mt-4 bg-[#E5F7FD]">
      <div className="flex flex-col items-center  gap-3 sm:flex-row sm:items-center sm:justify-between space-x-3 w-full">
        {/* Send Invoice Button */}
        <button
          onClick={onSendInvoice}
          className="group relative inline-flex items-center justify-center min:w-40 w-48  max:w-80 px-4 py-2 text-sm font-medium text-white  bg-[#01B0E9] rounded-full cursor-pointer "
        >
        <IoIosSend  className="text-white w-5 h-5 mr-2"/>

          Send {type}
        </button>

        {/* Action Buttons */}
        <div className="flex justify-center sm:justify-end w-full items-center space-x-3  sm:gap-0">
          <button
            className="p-2 rounded-full bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            title="Edit"
            aria-label="Edit invoice"
          >
          <PiPencilSimple className="w-5 h-5 text-gray-500"/>
          </button>

          <button
            className="p-2 rounded-full bg-white  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            title="Download"
            aria-label={`Download ${type}`}
          >
       <CiFileOn className="w-5 h-5 text-gray-500"/>
          </button>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full bg-white  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              title="More actions"
              aria-label="More actions"
            >
            <SlOptions className="w-5 h-5 text-gray-500"/>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                  Copy link
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                  Duplicate {type}
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                  Mark as draft
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-150">
                  Delete {type}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}