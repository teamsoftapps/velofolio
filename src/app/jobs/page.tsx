
// };
'use client';
import React, { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';

import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import OverviewChart from '../components/OverviewChart';
import DeleteModal from '../components/DeleteModal';
import FilterModal from '../components/FilterModal';
import JobsData from '../../utils/Job.json';
import JobsChartData from '../../utils/JobsChart.json';

const tableData = JobsData;
import { filterData, sortData, handleDelete } from '../../utils/TableUtils';

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
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); // Renamed for clarity, initialized to false
  const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');

  const [OpenForm, setOpenForm] = useState(false);
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
      
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={()=>handleDelete(setIsDeleteModalOpen)}
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
            title={'Jobs'}
            setOpenForm={setOpenForm}
            setSearchedData={setSearchedData}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <OverviewChart chartData={JobsChartData} />

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
