/** @format */
import { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import Table from './Table';
import AddButton from './AddButton';
import COLORS from '@/utils/Color';

const RecentLeads = () => {
  const [openForm, setOpenForm] = useState(false);

  // ✅ Table headers
  const tableHeaders = [
    { key: 'leadCreated', label: 'Lead Created' },
    { key: 'leadName', label: 'Lead Name' },
    { key: 'status', label: 'Status' },
    { key: 'nextTask', label: 'Next Task' },
  ];

  // ✅ Example leads data
  const leadsData = [
    {
      leadCreated: '2 Sep 2025',
      leadName: 'Demo Portrait Lead',
      status: 'New Lead',
      nextTask: 'Initial Inquiry...',
    },
    {
      leadCreated: '5 Oct 2025',
      leadName: 'Demo Wedding Lead',
      status: 'Booked',
      nextTask: 'Follow Up Call',
    },
      {
      leadCreated: '2 Sep 2025',
      leadName: 'Demo Portrait Lead',
      status: 'New Lead',
      nextTask: 'Initial Inquiry...',
    },
    {
      leadCreated: '5 Oct 2025',
      leadName: 'Demo Wedding Lead',
      status: 'Booked',
      nextTask: 'Follow Up Call',
    },
        {
      leadCreated: '2 Sep 2025',
      leadName: 'Demo Portrait Lead',
      status: 'New Lead',
      nextTask: 'Initial Inquiry...',
    },
    {
      leadCreated: '5 Oct 2025',
      leadName: 'Demo Wedding Lead',
      status: 'Booked',
      nextTask: 'Follow Up Call',
    },
      {
      leadCreated: '2 Sep 2025',
      leadName: 'Demo Portrait Lead',
      status: 'New Lead',
      nextTask: 'Initial Inquiry...',
    },
    {
      leadCreated: '5 Oct 2025',
      leadName: 'Demo Wedding Lead',
      status: 'Booked',
      nextTask: 'Follow Up Call',
    },
      {
      leadCreated: '5 Oct 2025',
      leadName: 'Demo Wedding Lead',
      status: 'Booked',
      nextTask: 'Follow Up Call',
    },
  ];


  return (
    <div className="bg-white p-6 sm:p-8  border border-gray-300 rounded-lg shadow-md w-full lg:min-w-1/2 h-[450px] ">
      {/* Header */}
     <div className="flex flex-col sm:flex-row sm:justify-between  sm:items-center mb-4  lg:gap-0">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-black mb-2 sm:mb-0 w-40 xl:w-full">
          Recent Leads
        </h2>
        <div className="w-full sm:w-auto lg:w-[45%]  ">
          <AddButton setOpenForm={setOpenForm} title="Add New Shoot" />
        </div>
      </div>

      {/* Table */}
      <Table
        data={leadsData}
        headers={tableHeaders}
        color={COLORS.headerBlueButtonbg}
        itemsPerPage={5}
        hoverColor={COLORS.BlueButtonhover}
      
      
      />
    </div>
  );
};

export default RecentLeads;
