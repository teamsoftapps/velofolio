'use client';
import React, { useMemo, useState } from 'react';

import Navbar from '../components/Navbar';
import TeamsTable from '../components/TeamsTable';
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');

  interface SortState {
    value: string;
    direction: "asc" | "desc";
  }
  const [sortBy, setSortBy] = useState<SortState>({
    value: "createdAt",
    direction: "desc",
  });

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
      <div className="min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] pb-24">
        <div className="w-full lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 pt-9">
          <OverviewHeader
            title={'Teams'}
            setOpenForm={setOpenForm}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <TeamsTable
            headers={tableHeaders}
            data={advancedfilteredData}
          />
        </div>
      </div>
    </>
  );
}
