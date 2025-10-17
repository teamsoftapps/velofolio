/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };
'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../Components/Navbar';
import { GoSearch, GoSortAsc } from 'react-icons/go';
import { FaSort } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { SlOptionsVertical } from 'react-icons/sl';
import Pagination from '../Components/Pagination';
import Table from '../Components/Table';
import OverviewHeader from '../Components/OverviewHeader';
import TeamData from '../../utils/team.json';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
const tableData = TeamData;
const tableHeaders = [
  { key: 'Name', label: 'Name' },
  { key: 'Role', label: 'Role' },
  { key: 'Email', label: 'Email' },
  { key: 'Phone', label: 'Phone' },
  { key: 'Status', label: 'Status' },
  { key: 'Assigned Jobs', label: 'Assigned Jobs' },
  { key: 'Availability', label: 'Availability' },
  { key: 'Action', label: 'Action' },
];

export default function Page() {
  const [OpenForm, setOpenForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // Renamed for clarity, initialized to false
  const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<any[]>(tableData); // Initialize with tableData

  useEffect(() => {
    if (searchedValue.trim() === '') {
      setFilteredData(tableData);
    } else {
      const searchLower = searchedValue.toLowerCase();

      const filtered = tableData.filter(
        (item: any) =>
          item.Name?.toLowerCase().includes(searchLower) ||
          item.Email?.toLowerCase().includes(searchLower)
      );

      setFilteredData(filtered);
    }
  }, [searchedValue]);

  const handleDeleteConfirm = () => {
    console.log('Team deleted');
    setIsDeleteModalOpen(false);
    // Add delete logic here (e.g., API call and update tableData)
  };

  return (
    <>
      <Navbar />
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {OpenForm && (
        <FormModal
          onSubmit={(data) => console.log('Form submitted:', data)}
          setOpenForm={setOpenForm}
        />
      )}
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]'>
        {/* <Pagination /> */}
        <div className='container mx-auto  w-[100%] h-[80vh]'>
          <OverviewHeader
            title={'Teams'}
            setOpenForm={setOpenForm}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
          />

          <Table
            headers={tableHeaders}
            data={filteredData}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </div>
      </div>
    </>
  );
}
