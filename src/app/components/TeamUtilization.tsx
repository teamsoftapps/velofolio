'use client';
import React from 'react';
import DropOption from './DropOption';
import Table from './Table';
import { HiLightBulb } from "react-icons/hi";
import MiniTable from './MiniTable';
import { RiTeamFill } from "react-icons/ri";

const TeamUtilization = () => {
  // Define your table headers (with keys so Table knows how to map)
  const tableHeaders = [
    { key: 'team', label: 'Team' },
    { key: 'role', label: 'Role' },
    { key: 'utilization', label: 'Team Utilization' },
    { key: 'assigned', label: 'Job Assigned' },
  ];

  // Example data — replace later with API data
  const tableData = [
    { team: 'Frontend Devs', role: 'Developers', utilization: '85%', assigned: 12 },
    { team: 'QA Team', role: 'Testers', utilization: '78%', assigned: 8 },
    { team: 'Design Squad', role: 'UI/UX Designers', utilization: '92%', assigned: 5 },
    { team: 'Backend Engineers', role: 'Developers', utilization: '88%', assigned: 10 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md w-full  h-auto p-6 mb-5">
      <div className=" flex-col  my-2 sm:flex-row flex items-start  sm:items-center justify-between mb-4">
        <h1 className="text-md sm:text-xl font-semibold text-gray-800 flex items-center"><RiTeamFill className='w-6 h-6 mr-2' /> Team Utilization Overview</h1>
        <DropOption options={['View by Department', 'View by Team']} />
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
