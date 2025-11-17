/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };
'use client';
import React, { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';

import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import OverviewChart from '../components/OverviewChart';
import PayementChartData from '../../utils/PaymentChartData.json';
import DeleteModal from '../components/DeleteModal';
import PayementData from '../../utils/Payements.json';
import FilterModal from '../components/FilterModal';
import { filterData, sortData, handleDelete, applyAdvancedFilters } from '../../utils/TableUtils';
const tableData = PayementData;

const tableHeaders = [
  { key: 'client', label: 'Client' },
  { key: 'job', label: 'Job' },
  { key: 'invoiceNumber', label: 'Invoice #' },
  { key: 'amount', label: 'Amount ($)' },
  { key: 'paid', label: 'Paid ($)' },
  { key: 'balance', label: 'Balance ($)' },
  { key: 'paymentStatus', label: 'Status' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'paymentMethod', label: 'Payment Method' },
];

export default function Page() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); 
  const [searchedValue, setSearchedValue] = React.useState('');
  const [OpenForm, setOpenForm] = useState(false);


  const handleDeleteConfirm = () => {
    console.log('Job deleted');
    setIsDeleteModalOpen(false);

  };
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

  return (
    <>
      <Navbar />

      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] overflow-x-hidden'>
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
            onApply={(newFilters)=>setFilters(newFilters)}
            
          />
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader
            title={'Payements'}
            setOpenForm={setOpenForm}

            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
                    sortBy={sortBy} // Pass the sorting state
            setSortBy={setSortBy} // Pass the setter
          />
          <OverviewChart chartData={PayementChartData} />

          <Table
            headers={tableHeaders}
            data={advancedfilteredData}
            setOpenForm={setOpenForm}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
            
        </div>
      </div>
    </>
  );
}
