/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { GoSearch, GoSortAsc } from 'react-icons/go';
import { FaSort } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { SlOptionsVertical } from 'react-icons/sl';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import OverviewChart from '../components/OverviewChart';

import JobsData from '../../utils/Job.json';
import PayementChartData from '../../utils/PaymentChartData.json';
import DeleteModal from '../components/DeleteModal';
import PayementData from '../../utils/Payements.json';
import FilterModal from '../components/FilterModal';
const tableData = PayementData;
import { filterData, sortData, handleDelete } from '../../utils/TableUtils';

const tableHeaders = [
  { key: 'client', label: 'Client' },
  { key: 'job', label: 'Job' },
  { key: 'invoiceNumber', label: 'Invoice #' },
  { key: 'amount', label: 'Amount ($)' },
  { key: 'paid', label: 'Paid ($)' },
  { key: 'balance', label: 'Balance ($)' },
  { key: 'status', label: 'Status' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'paymentMethod', label: 'Payment Method' },
];

export default function Page() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // Renamed for clarity, initialized to false
  const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  // const [filteredData, setFilteredData] = React.useState<any[]>(tableData); // Initialize with tableData
  const [OpenForm, setOpenForm] = useState(false);

  const handleDeleteConfirm = () => {
    console.log('Job deleted');
    setIsDeleteModalOpen(false);
    // Add delete logic here (e.g., API call and update tableData)
  };
  interface SortState {
  value: string;
  direction: "asc" | "desc";
}
  const [sortBy, setSortBy] = useState<SortState>({
  value: "createdAt",
  direction: "desc",
});;
const filteredData = useMemo(() => filterData(tableData, searchedValue), [tableData, searchedValue]);
const sortedData = useMemo(() => sortData(filteredData, sortBy), [filteredData, sortBy]);

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
             <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            isVisible={openFilter}
            setIsVisible={setOpenFilter}
            
          />
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader
            title={'Payements'}
            setOpenForm={setOpenForm}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
                    sortBy={sortBy} // Pass the sorting state
            setSortBy={setSortBy} // Pass the setter
          />
          <OverviewChart chartData={PayementChartData} />

          <Table
            headers={tableHeaders}
            data={sortedData}
            setOpenForm={setOpenForm}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
            
        </div>
      </div>
    </>
  );
}
