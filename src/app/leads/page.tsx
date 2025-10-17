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
import LeadsData from '../../utils/LeadsChart.json';
import LeadForm from '../Components/LeadFormModel';
import TableData from '../../utils/Data.json';
import DeleteModal from '../Components/DeleteModal';

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
  const [OpenForm, setOpenForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<any[]>(tableData); // Initialize with tableData

  useEffect(() => {
    if (searchedValue.trim() === '') {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(searchedValue.toLowerCase()) ||
          (item.email &&
            item.email.toLowerCase().includes(searchedValue.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchedValue, tableData]);

  return (
    <>
      <Navbar />
      {OpenForm && (
        <LeadForm
          onSubmit={(data) => console.log('Form submitted:', data)}
          setOpenForm={setOpenForm}
        />
      )}
      {deleteModal && (
        <DeleteModal
          // onSubmit={(data) => console.log('Form submitted:', data)}
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={() => setDeleteModal(false)}
        />
      )}
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]'>
        {/* <Pagination /> */}
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader
            title={'Leads'}
            setOpenForm={setOpenForm}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
          />
          <OverviewChart chartData={LeadsData} />

          <Table
            headers={tableHeaders}
            data={filteredData}
          />
        </div>
      </div>
    </>
  );
}
