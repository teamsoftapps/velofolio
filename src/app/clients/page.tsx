/** @format */

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
import TableData from '../../utils/Data.json';
import FormModal from '../Components/FormModal';
import ClientFormModal from '../Components/ClientFormModal';
import DeleteModal from '../Components/DeleteModal';

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
  const [newClient, setNewClient] = React.useState<any[]>([]); // Initialized and typed
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const tableData: any[] = TableData;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // Renamed for clarity, initialized to false
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

  const handleDeleteConfirm = () => {
    console.log('Client deleted');
    setIsDeleteModalOpen(false);
    // Add delete logic here (e.g., API call and update tableData)
  };

  return (
    <>
      <Navbar />
      {isFormOpen && (
        <ClientFormModal
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setIsFormOpen(false);
            // Add logic to update tableData with new client
          }}
          setOpenForm={setIsFormOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]'>
        <div className='container mx-auto w-[100%] h-[80vh]'>
          <OverviewHeader
            title='Clients'
            setOpenForm={setIsFormOpen}
            setSearchedData={setSearchedData} // Update type if needed
            searchedValue={searchedValue}
            setSearchedValue={setSearchedValue}
          />
          <Table
            headers={tableHeaders}
            data={filteredData}
            setDeleteModal={setIsDeleteModalOpen}
            setSearchedData={setSearchedData}
          />
        </div>
      </div>
    </>
  );
}
