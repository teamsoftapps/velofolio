'use client';
import React from 'react';
import DropOption from '@/app/components/ui/DropOption';
import MiniTable from './MiniTable';
import TopPerfoming from '@/utils/TopPerfomming.json';
import { HiLightBulb } from "react-icons/hi";
import { HiMiniTrophy } from "react-icons/hi2";
import FooterUtilizPerfom from './FooterUtilizPerfom';

const TopPerfomingProject = () => {
  const tableHeaders = [
    { key: 'job', label: 'Job' },
    { key: 'completion', label: 'Completion %' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'status', label: 'Status' },
  ];

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
        <h1 className="text-md sm:text-xl font-semibold text-gray-800 flex items-center"><HiMiniTrophy className='w-6 h-6 mr-2' /> Top Perfoming Project</h1>
        <DropOption options={['Status', 'Job']} />
      </div>
      <MiniTable headers={tableHeaders} data={tableData} />
      <FooterUtilizPerfom title='Perfomance' />
    </div>
  );
};

export default TopPerfomingProject;


