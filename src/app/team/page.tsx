
'use client';
import React, { useEffect, useMemo, useState } from 'react';

import Navbar from '../components/Navbar';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import TeamData from '../../utils/team.json';
import FormModal from '../components/FormModal';
import DeleteModal from '../components/DeleteModal';
import FilterModal from '../components/FilterModal';
import { applyAdvancedFilters, filterData, sortData } from '@/utils/TableUtils';
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
  // const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');

  interface SortState {
    value: string;
    direction: "asc" | "desc";
  }
  const [sortBy, setSortBy] = useState<SortState>({
    value: "createdAt",
    direction: "desc",
  });;

  const [filters, setFilters] = useState({
    status: [],
    selectedMembers: [],
    leadSource: [],
    eventType: [],
    fromDate: "",
    toDate: "",
    paymentStatus: [],
  });



  // Combine search + sort + filter
  const advancedfilteredData = useMemo(() => {
    let result = filterData(tableData, searchedValue);
    result = applyAdvancedFilters(result, filters);
    result = sortData(result, sortBy);
    return result;
  }, [tableData, searchedValue, sortBy, filters]);


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
        onApply={(newFilters) => setFilters(newFilters)}

      />
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] pt-6 pb-24 '>
        {/* <Pagination /> */}
        <div className='container mx-auto  w-[100%] h-[80vh] px-4 sm:px-10 pt-6'>
          <OverviewHeader
            title={'Teams'}
            setOpenForm={setOpenForm}

            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
            sortBy={{ value: 'createdAt', direction: 'desc' }}
            setSortBy={() => { }}
          />

          <Table
            headers={tableHeaders}
            data={advancedfilteredData}

            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        </div>
      </div>
    </>
  );
}
