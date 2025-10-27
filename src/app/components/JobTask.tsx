/** @format */
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import Table from './Table';
import COLORS from '@/utils/Color';

const JobTask = () => {
  const [openForm, setOpenForm] = useState(false);
const tableHeaders = [
  { key: 'jobDate', label: 'Job Date' },
  { key: 'jobName', label: 'Job Name' },
  { key: 'jobType', label: 'Job Type' },
  { key: 'status', label: 'Status' },
  { key: 'task', label: 'Next Task' },
];

  // ✅ Example Job Data
  const jobsData = [
    {
      jobDate: '10 Oct 2025',
      jobName: 'Demo Portrait Job',
      jobType: 'Portrait',
      status: 'In Progress',
      task: 'Main Shoot',
    },
  
  ];

  const statusColors:any = {
    'In Progress': 'bg-yellow-200',
    'Pending Review': 'bg-blue-200',
    'Completed': 'bg-green-200',
  };

  return (
    <div className="bg-white p-6 sm:p-8  border border-gray-300 rounded-lg shadow-md h-[450px] w-full lg:min-w-1/2 ">
      {/* Header */}
      <div className="w-full flex flex-row justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl  text-black">
          Job Tasks With Due Dates
        </h2>
      </div>

   
<Table data={jobsData} headers={tableHeaders} color={COLORS.headerBlueButtonbg} hoverColor={COLORS.BlueButtonhover}/>

    </div>
  );
};

export default JobTask;
