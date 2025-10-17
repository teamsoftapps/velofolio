/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };
'use client';
import React, { useEffect, useState } from 'react';
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
import DeleteModal from '../Components/DeleteModal';
const tableData = JobsData;

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // Renamed for clarity, initialized to false
  const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<any[]>(tableData); // Initialize with tableData
  const [OpenForm, setOpenForm] = useState(false);

  const handleDeleteConfirm = () => {
    console.log('Job deleted');
    setIsDeleteModalOpen(false);
    // Add delete logic here (e.g., API call and update tableData)
  };

  useEffect(() => {
    if (searchedValue.trim() === '') {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter(
        (item: any) =>
          item.jobNameClient
            ?.toLowerCase()
            .includes(searchedValue.toLowerCase()) ||
          item.jobNameClient
            ?.toLowerCase()
            .includes(searchedValue.toLowerCase()) ||
          item.assignedTeam?.toLowerCase().includes(searchedValue.toLowerCase())
      );

      setFilteredData(filtered);
    }
  }, [searchedValue, tableData]);

  return (
    <>
      <Navbar />

      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]'>
        {/* <Pagination /> */}
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader
            title={'Jobs'}
            setOpenForm={setOpenForm}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
          />
          <OverviewChart chartData={JobsChartData} />

          <Table
            headers={tableHeaders}
            data={filteredData}
            setOpenForm={setOpenForm}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </div>
      </div>
    </>
  );
}
