/** @format */

'use client';
import React, { useEffect,useState } from 'react';

import Navbar from '../components/Navbar';
import FilterModal from '../components/FilterModal';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import TableData from '../../utils/Data.json';
import ClientFormModal from '../components/ClientFormModal';
import DeleteModal from '../components/DeleteModal';
import SortModal from '../components/SortModal';

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
  const [filteredData, setFilteredData] = React.useState<any[]>([tableData]); // Initialize with tableData
const [openFilter, setOpenFilter] = useState<boolean>(false);
const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('added-newest');
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
      
     
         
          <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            isVisible={openFilter}
            setIsVisible={setOpenFilter}
            
          />
      
     
      <div className='min-h-screen  w-full flex flex-col items-start bg-[#FAFAFA]'>
        <div className='container mx-auto w-[100%] h-[80vh]'>
          <OverviewHeader
            title='Clients'
            setOpenForm={setIsFormOpen}
            setSearchedData={setSearchedData} // Update type if needed
            searchedValue={searchedValue}
            setSearchedValue={setSearchedValue}
            setOpenFilter={setOpenFilter}
            // setIsSortOpen={setIsSortOpen}
          />
          {/* <SortModal
            isOpen={isSortOpen}
            onClose={() => setIsSortOpen(false)}
           
           
            currentSort={currentSort}
        onSortChange={(sortId) => {
          setCurrentSort(sortId);
          console.log('Sorting by:', sortId);
        }}
            /> */}
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
