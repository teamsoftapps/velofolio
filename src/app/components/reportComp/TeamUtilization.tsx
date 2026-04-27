'use client';
import React from 'react';
import DropOption from '@/app/components/ui/DropOption';
import Table from '@/app/components/ui/Table';
import { HiLightBulb } from "react-icons/hi";
import MiniTable from './MiniTable';
import { RiTeamFill } from "react-icons/ri";
import FooterUtilizPerfom from './FooterUtilizPerfom';

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
    <div className="bg-white rounded-2xl w-full  h-auto p-6 mb-5">
      <div className=" flex-col  my-2 sm:flex-row flex items-start  sm:items-center justify-between mb-4">
        <h1 className="text-md sm:text-xl font-semibold text-gray-800 flex items-center"><RiTeamFill className='w-6 h-6 mr-2' /> Team Utilization Overview</h1>
        <DropOption options={['View by Department', 'View by Team']} />
      </div>

      {/* Reuse your main table */}
      <MiniTable headers={tableHeaders} data={tableData} />
      <FooterUtilizPerfom title='Utilization' />
    </div>
  );
};

export default TeamUtilization;
