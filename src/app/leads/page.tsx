/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };

import React from 'react';
import Navbar from '../components/Navbar';
import { GoSearch, GoSortAsc } from 'react-icons/go';
import { FaSort } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { SlOptionsVertical } from 'react-icons/sl';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import OverviewChart from '../components/OverviewChart';
import LeadsData from '../../utils/Leads.json';

import TableData from '../../utils/Data.json';
const tableData = TableData;

const tableHeaders = [
  { key: 'name', label: 'Name' },
  { key: 'event', label: 'Event' },
  { key: 'status', label: 'Status' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'assignedTeam', label: 'Assigned Team' },
  { key: 'nextTask', label: 'Next Task' },
  { key: 'lastContact', label: 'Last Contact' },
  { key: 'action', label: 'Action' },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]'>
        {/* <Pagination /> */}
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader title={'Leads'} />
          <OverviewChart chartData={LeadsData} />

          <Table
            headers={tableHeaders}
            data={tableData}
          />
        </div>
      </div>
    </>
  );
}
