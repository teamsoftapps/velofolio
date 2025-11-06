import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
const DropOption = ({options}:any) => {
  return (
        <div className="relative w-full sm:w-48">
              <select
                className="w-full appearance-none rounded-md border text-black border-gray-300 bg-gray-200 py-2 pl-3 pr-10 text-sm focus:border-[#01B0E9] focus:outline-none focus:ring-2 focus:ring-[#01B0E9]/20 sm:text-sm"
                defaultValue="26 Aug 2025 - 2 Sep 2025"
              >
                {
                  options.map((item:any,i:number)=><option key={i}>{item}</option>)
                }
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
  )
}

export default DropOption