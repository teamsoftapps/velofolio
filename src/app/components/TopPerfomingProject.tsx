'use client';
import React from 'react';
import DropOption from './DropOption';
import MiniTable from './MiniTable';
import TopPerfoming from '../../utils/TopPerfomming.json';
import { HiLightBulb } from "react-icons/hi";
import { HiMiniTrophy } from "react-icons/hi2";

const TeamUtilization = () => {
  // Define your table headers (with keys so Table knows how to map)
const tableHeaders = [
  { key: 'job', label: 'Job' },
  { key: 'completion', label: 'Completion %' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'status', label: 'Status' },
];

  // Example data — replace later with API data
 const tableData = [
  {
    job: 'Senior Frontend Engineer',
    completion: '12%',
    revenue: '$245,000',
    status: 'Active',
  },
  {
    job: 'QA Automation Lead',
    completion: '80%',
    revenue: '$180,000',
    status: 'Active',
  },
  {
    job: 'UI/UX Designer',
    completion: '100%',
    revenue: '$135,000',
    status: 'On Hold',
  },
  {
    job: 'Backend Developer',
    completion: '30%',
    revenue: '$210,000',
    status: 'Active',
  },

];


  return (
 <div className="bg-white rounded-2xl shadow-md w-full  h-auto p-6 mb-5">
      <div className=" flex-col  my-2 sm:flex-row flex items-start  sm:items-center justify-between mb-4">
        <h1 className="text-md sm:text-xl font-semibold text-gray-800 flex items-center"><HiMiniTrophy className='w-6 h-6 mr-2' /> Team Utilization Overview</h1>
        <DropOption options={['Status', 'Job']} />
      </div>

      {/* Reuse your main table */}
  

      <MiniTable headers={tableHeaders} data={tableData} />
  
            <div className='my-3 flex items-center justify-between'>
          <p className='flex  items-center text-xs sm:text-sm rounded-full w-72 px-2 bg-[#E5F7FD]'><HiLightBulb className='w-4 h-4 mr-2' />
       Average Utilization increased by 5%</p>
       <button className='text-[#19B7EB] text-xs  sm:text-md'>
      
          View Full Report
       </button>
            </div>
    </div>
  );
};

export default TeamUtilization;
