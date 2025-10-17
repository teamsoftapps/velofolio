/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };

import React from 'react';
import Navbar from '../Components/Navbar';
import { GoSearch, GoSortAsc } from 'react-icons/go';
import { FaSort } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { SlOptionsVertical } from 'react-icons/sl';
import Pagination from '../Components/Pagination';
import Table from '../Components/Table';
import OverviewHeader from '../Components/OverviewHeader';
import OverviewChart from '../Components/OverviewChart';

import JobsData from '../../utils/Job.json';
import JobsChartData from '../../utils/JobsChart.json';
import TableData from '../../utils/Data.json';
const tableData = TableData;

const tableHeaders = [
  { key: 'jobNameClient', label: 'Job Name / Client' },
  { key: 'eventType', label: 'Event Type' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'assignedTeam', label: 'Assigned Team' },
  { key: 'progress', label: 'Progress' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]'>
        {/* <Pagination /> */}
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader title={'Jobs'} />
          <OverviewChart chartData={JobsChartData} />

          <Table
            headers={tableHeaders}
            data={JobsData}
          />
        </div>
      </div>
    </>
  );
}
