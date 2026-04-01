/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';

import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import OverviewChart from '../components/OverviewChart';
import PayementChartData from '../../utils/PaymentChartData.json';
import DeleteModal from '../components/DeleteModal';
import PayementData from '../../utils/Payements.json';
import FilterModal from '../components/FilterModal';
import { DateValue, parseDate } from "@internationalized/date";
import { filterData, sortData, handleDelete, applyAdvancedFilters, filterByTimeRange } from '../../utils/TableUtils';
import { useSelector } from 'react-redux';
import JobDetail from '../../utils/JobDetail.json';
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

  // Directly access the pre-parsed Redux state
  const { invoices = [] } = useSelector((state: any) => state.persisted?.invoiceandQuote || {});

  const mergedData = useMemo(() => {
    const milestonePayments: any[] = [];
    invoices.forEach((inv: any) => {
      // Find backup info from JobDetail if missing
      const backupInfo = JobDetail.find((j: any) => j.id === inv.clientId);
      const clientDisplayName = inv.clientName || backupInfo?.client?.name || inv.packages?.[0]?.name || `Client ID: ${inv.clientId}`;
      const jobDisplayName = inv.jobTitle || backupInfo?.jobDetails?.title || inv.packages?.[0]?.name || `Invoice ID: ${inv.id}`;
      const clientAvatar = backupInfo?.client?.image || "";

      (inv.payments || []).forEach((p: any) => {
        milestonePayments.push({
          client: clientDisplayName,
          avatar: clientAvatar,
          job: jobDisplayName,
          invoiceNumber: inv.id,
          amount: p.amount || 0,
          paid: 0,
          balance: p.amount || 0,
          paymentStatus: 'pending',
          dueDate: p.dueDate === "Upon Signing" ? new Date(inv.createdAt).toISOString().split('T')[0] : (p.dueDate || "N/A"),
          paymentMethod: "Bank Transfer",
          createdAt: inv.createdAt
        });
      });
    });
    return [...PayementData, ...milestonePayments];
  }, [invoices]);

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

  const [timeRange, setTimeRange] = useState("All Data");
  const [value, setValue] = useState<DateValue>(parseDate("2026-03-25"));

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
    const customDate = timeRange === "Custom" ? new Date(value.year, value.month - 1, value.day) : undefined;
    let result = filterByTimeRange(mergedData, timeRange, customDate);
    result = filterData(result, searchedValue);
    result = applyAdvancedFilters(result, filters);
    result = sortData(result, sortBy);
    return result;
  }, [mergedData, searchedValue, sortBy, filters, timeRange, value]);

  const paymentSummary = useMemo(() => {
    let paid = 0;
    let unpaid = 0;
    let pending = 0;
    let total = 0;

    const cleanNumber = (val: any) => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      const cleaned = String(val).replace(/[^\d.-]/g, '');
      return parseFloat(cleaned) || 0;
    };

    advancedfilteredData.forEach((item: any) => {
      const amount = cleanNumber(item.amount);
      const paidAmount = cleanNumber(item.paid);

      total += amount;

      const status = String(item.paymentStatus || "").toLowerCase();
      if (status === 'paid') {
        paid += paidAmount;
      } else if (status === 'overdue' || status === 'unpaid') {
        unpaid += amount;
      } else if (status === 'pending') {
        pending += amount;
      }
    });

    return { paid, unpaid, pending, total };
  }, [advancedfilteredData]);

  // Dynamically generate chart stats for Payments
  const dynamicPaymentChartData = useMemo(() => {
    return [
      { title: "Total Payments Received", count: `$${paymentSummary.paid.toLocaleString()}`, percentageChange: 10.2, colorClass: "bg-[#01B0E9]" },
      { title: "Pending Payments", count: `$${paymentSummary.pending.toLocaleString()}`, percentageChange: 4.8, colorClass: "bg-yellow-500" },
      { title: "Overdue Payments", count: `$${paymentSummary.unpaid.toLocaleString()}`, percentageChange: -3.4, colorClass: "bg-green-500" },
      { title: "Upcoming Due Payments", count: `$${Math.max(0, paymentSummary.total - paymentSummary.paid - paymentSummary.unpaid - paymentSummary.pending).toLocaleString()}`, percentageChange: 5.6, colorClass: "bg-gray-500" }
    ];
  }, [paymentSummary]);
  return (
    <>
      <Navbar />

      <div className='min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] overflow-x-hidden pt-6 pb-24'>
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
          onApply={(newFilters) => setFilters(newFilters)}

        />
        <div className='container mx-auto bg-[#FAFAFA] w-[100%] '>
          <OverviewHeader
            title={'Payements'}
            setOpenForm={setOpenForm}
            summary={paymentSummary}
            setSearchedValue={setSearchedValue}
            searchedValue={searchedValue}
            setOpenFilter={setOpenFilter}
            sortBy={sortBy} // Pass the sorting state
            setSortBy={setSortBy} // Pass the setter
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            value={value}
            setValue={setValue}
          />
          <OverviewChart chartData={dynamicPaymentChartData} />

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
