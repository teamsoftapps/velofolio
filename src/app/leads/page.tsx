
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import OverviewChart from '../components/OverviewChart';
import LeadsData from '../../utils/LeadsChart.json';
import LeadForm from '../components/LeadFormModel';
import DeleteModal from '../components/DeleteModal';
import LeadData from '../../utils/Lead.json';
import FilterModal from '../components/FilterModal';
import {filterData, sortData, handleDelete, applyAdvancedFilters} from "../../utils/TableUtils";

const tableData = LeadData;

const tableHeaders = [
  { key: 'leadName', label: 'Lead Name' },
  { key: 'leadCreated', label: 'Lead Created' },
  { key: 'interestedService', label: 'Interested Service' },
  { key: 'status', label: 'Status' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'priority', label: 'Priority' },
  { key: 'action', label: 'Action' },
];


export default function Page() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); 
  const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');

  const [OpenForm, setOpenForm] = useState(false);

  const [openFilter, setOpenFilter] = useState<boolean>(false);
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
      {OpenForm && (
        <LeadForm
          onSubmit={(data) => console.log('Form submitted:', data)}
          setOpenForm={setOpenForm}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={()=>handleDelete(setIsDeleteModalOpen)}
        />
      )}
      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] overflow-x-hidden'>
        {/* <Pagination /> */}
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader
            title={'Leads'}
            setOpenForm={setOpenForm}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
               sortBy={sortBy}
             setSortBy={setSortBy}

          />
          <OverviewChart chartData={LeadsData} />
            <FilterModal
                   isOpen={openFilter}
                   onClose={() => setOpenFilter(false)}
                   isVisible={openFilter}
                   setIsVisible={setOpenFilter}
                   onApply={(newFilters)=>setFilters(newFilters)}
                   
                 />

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
