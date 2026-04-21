
/** @format */

'use client';
import React, { useMemo, useState } from 'react';
import { colors } from "../../utils/colors";
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import OverviewChart from '../components/OverviewChart';
import FilterModal from '../components/FilterModal';
import LeadsDataRaw from '../../utils/Lead.json';
import { filterData, sortData, applyAdvancedFilters, filterByTimeRange } from '../../utils/TableUtils';
import generateChartData from '@/utils/ChartLogics';
import RouteGuard from '../components/RouteGuard';
import LeadForm from '../components/LeadFormModel';
import { addLead, LeadData } from '@/firebase_Routes/routes';
import { auth } from '@/config/firebase';
import { toast } from 'react-toastify';

const tableData = LeadsDataRaw;

const tableHeaders = [
  { key: 'leadName', label: 'Lead Name' },
  { key: 'dateCreated', label: 'Lead Created' },
  { key: 'interestedService', label: 'Job Type' },
  { key: 'status', label: 'Status' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'priority', label: 'Priority' },
  { key: 'action', label: 'Action' },
];

export default function Page() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [OpenForm, setOpenForm] = useState(false);
  const [openLeadsModal, setOpenLeadsModal] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleAddLead = async (data: LeadData) => {
    const uid = auth.currentUser?.uid;
    if (!uid) { toast.error('You must be logged in to add a lead.'); return; }

    setIsSubmittingLead(true);
    const { leadId, error } = await addLead(uid, data);
    setIsSubmittingLead(false);

    if (error) {
      toast.error('Failed to save lead: ' + error);
    } else {
      toast.success('Lead added successfully!');
      setOpenLeadsModal(false);
    }
  };
  interface SortState {
    value: string;
    direction: "asc" | "desc";
  }
  const [sortBy, setSortBy] = useState<SortState>({
    value: "createdAt",
    direction: "desc",
  });
  const [timeRange, setTimeRange] = useState("Ytd");

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

  const dynamicLeadsChart = useMemo(() => {
    const newLeads = advancedfilteredData.filter((lead: any) => lead.status?.toLowerCase() === 'new lead').length;
    const activeLeads = advancedfilteredData.filter((lead: any) => lead.status?.toLowerCase() === 'active').length;
    const convertedLeads = advancedfilteredData.filter((lead: any) => lead.status?.toLowerCase() === 'converted').length;
    const lostLeads = advancedfilteredData.filter((lead: any) => lead.status?.toLowerCase() === 'inactive').length;

    return generateChartData([
      { title: "New Leads", count: newLeads, percentageChange: 15.01, theme: "blue" },
      { title: "Active Leads", count: activeLeads, percentageChange: 8.01, theme: "yellow" },
      { title: "Converted Leads", count: convertedLeads, percentageChange: 12.01, theme: "green" },
      { title: "Lost Leads", count: lostLeads, percentageChange: 0.0, theme: "gray" }
    ], timeRange);
  }, [advancedfilteredData]);

  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <Navbar />

      <div className='min-h-screen w-full flex flex-col items-start overflow-x-hidden pt-9 pb-24' style={{ backgroundColor: colors.bgLight }}>
        <div className='w-full lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8'>
          {
            openLeadsModal && (
              <LeadForm
                onSubmit={handleAddLead}
                setOpenForm={setOpenLeadsModal}
              />
            )
          }
          <OverviewHeader
            title={'Leads'}
            setOpenForm={setOpenLeadsModal}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            timeRange={timeRange}
            setTimeRange={setTimeRange}

          />
          <OverviewChart chartData={dynamicLeadsChart} variant="sparkline" />

          <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            isVisible={openFilter}
            setIsVisible={setOpenFilter}
            onApply={(newfilters) => setFilters(newfilters)}
          />

          <Table
            headers={tableHeaders}
            data={advancedfilteredData}
            unit="Leads"
            setOpenForm={setOpenForm}
            setDeleteModal={setIsDeleteModalOpen}
            sortBy={sortBy}
            onSort={(key: string) => {
              if (sortBy.value === key) {
                setSortBy({
                  value: key,
                  direction: sortBy.direction === 'asc' ? 'desc' : 'asc',
                });
              } else {
                setSortBy({ value: key, direction: 'desc' });
              }
            }}
          />
        </div>
      </div>
    </RouteGuard>
  );
}
