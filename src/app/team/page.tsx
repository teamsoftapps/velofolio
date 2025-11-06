/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };
'use client';
import React, { useEffect ,useState} from 'react';
// import { useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import TeamData from '../../utils/team.json';
import FormModal from '../components/FormModal';
import DeleteModal from '../components/DeleteModal';
import FilterModal from '../components/FilterModal';
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
  const [openFilter, setOpenFilter] = useState<boolean>(false);
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
           <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            isVisible={openFilter}
            setIsVisible={setOpenFilter}
            
          />
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]'>
        {/* <Pagination /> */}
        <div className='container mx-auto  w-[100%] h-[80vh]'>
          <OverviewHeader
            title={'Teams'}
            setOpenForm={setOpenForm}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
            sortBy={{ value: 'createdAt', direction: 'desc' }}
            setSortBy={() => {}}
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
