
/** @format */

'use client';
import React, { useMemo, useState } from 'react';
import { colors } from "@/utils/colors";
import JobsTable from '@/app/components/ui/JobsTable';
import OverviewHeader from '@/app/components/layouts/OverviewHeader';
import OverviewChart from '@/app/components/ui/OverviewChart';
import DeleteModal from '@/app/components/forms/DeleteModal';
import FilterModal from '@/app/components/forms/FilterModal';
import JobsDataRaw from '@/utils/Job.json';
import { filterData, sortData, handleDelete, applyAdvancedFilters, filterByTimeRange } from '@/utils/TableUtils';
import RouteGuard from '@/app/components/layouts/RouteGuard';
import AddJobModal from '@/app/components/forms/AddJobModal';
import generateChartData from '@/utils/ChartLogics';

const tableData = JobsDataRaw;

const tableHeaders = [
  { key: 'name', label: 'Job Name' },
  { key: 'jobType', label: 'Job Type' },
  { key: 'eventDate', label: 'Event Date & Time' },
  { key: 'assignedTeam', label: 'Assigned Team' },
  { key: 'progress', label: 'Progress' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

export default function Page() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [OpenForm, setOpenForm] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  interface SortState {
    value: string;
    direction: "asc" | "desc";
  }
  const [sortBy, setSortBy] = useState<SortState>({
    value: "createdAt",
    direction: "desc",
  });
  const [timeRange, setTimeRange] = useState("All Data");

  const [filters, setFilters] = useState({
    status: [],
    selectedMembers: [],
    leadSource: [],
    eventType: [],
    fromDate: "",
    toDate: "",
    paymentStatus: [],
  });

  const advancedfilteredData = useMemo(() => {
    let result = filterByTimeRange(tableData, timeRange);
    result = filterData(result, searchedValue);
    result = applyAdvancedFilters(result, filters);
    result = sortData(result, sortBy);
    return result;
  }, [tableData, searchedValue, sortBy, filters, timeRange]);

  const dynamicJobsChart = useMemo(() => {

    const totalJobs = advancedfilteredData.length;
    const activeJobs = advancedfilteredData.filter((job: any) => job.status && job.status.toLowerCase() === 'in progress').length;
    const completedJobs = advancedfilteredData.filter((job: any) => job.status && job.status.toLowerCase() === 'completed').length;
    const cancelledJobs = advancedfilteredData.filter((job: any) => job.status && job.status.toLowerCase() === 'cancelled').length;

    return generateChartData([
      { title: "Total Jobs", count: totalJobs, percentageChange: 12.5, theme: "blue" },
      { title: "Active Jobs", count: activeJobs, percentageChange: 7.0, theme: "yellow" },
      { title: "Completed Jobs", count: completedJobs, percentageChange: 9.0, theme: "green" },
      { title: "Cancelled Jobs", count: cancelledJobs, percentageChange: -3.0, theme: "gray" }
    ], timeRange);
  }, [advancedfilteredData]);

  const members = [
    { id: 1, name: "John" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Lisa" },
    { id: 4, name: "Chris" },
    { id: 5, name: "Maria" },
    { id: 6, name: "Steve" },
    { id: 7, name: "Sarah" },
  ];

  return (
    <RouteGuard allowedRoles={['superadmin']}>

      <div className='min-h-screen w-full flex flex-col items-start overflow-x-hidden pt-9 pb-24' style={{ backgroundColor: colors.bgLight }}>
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => handleDelete(setIsDeleteModalOpen)}
          />
        )}
        {showJobModal && (
          <AddJobModal
            isOpen={showJobModal}
            onClose={() => setShowJobModal(false)}

            onAddJob={() => setShowJobModal(false)}



          />
        )}
        <div className='w-full lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8'>
          <OverviewHeader
            title={'Jobs'}
            setOpenForm={setShowJobModal}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
          <OverviewChart chartData={dynamicJobsChart} variant="sparkline" />

          <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            isVisible={openFilter}
            setIsVisible={setOpenFilter}
            onApply={(newfilters) => setFilters(newfilters)}
          />

          <JobsTable
            headers={tableHeaders}
            data={advancedfilteredData}
          />
        </div>
      </div>
    </RouteGuard>
  );
}





