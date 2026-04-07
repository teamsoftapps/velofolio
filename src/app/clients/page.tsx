
'use client';
import React, { useMemo, useState } from 'react';
import { colors } from "../../utils/colors";

import Navbar from '../components/Navbar';
import FilterModal from '../components/FilterModal';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import TableData from '../../utils/Data.json';
import ClientFormModal from '../components/ClientFormModal';
import DeleteModal from '../components/DeleteModal';
import { filterData, sortData, SortState, applyAdvancedFilters } from "../../utils/TableUtils";
import RouteGuard from '../components/RouteGuard';
import ImportClientsButton from '../components/ImportClientsButton';
import ImportClientsModal from '../components/ImportClientModal';
import ExportModal from '../components/ExportModal';

const tableHeaders = [
  { key: 'dateCreated', label: 'Date Created' },
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' }
];

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortState>({
    value: "dateCreated",
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

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // ====================== IMPORT HANDLER ======================
  const handleImportSuccess = (newClientsFromCSV: any[]) => {
    const existingEmails = new Set(
      clients.map((c: any) => c.email?.toLowerCase().trim())
    );

    const uniqueNewClients = newClientsFromCSV.filter((client: any) => {
      const email = client.email?.toLowerCase().trim();
      return email && !existingEmails.has(email);
    });

    if (uniqueNewClients.length > 0) {
      setClients((prev) => [...prev, ...uniqueNewClients]);
    }
  };

  // ====================== COMBINED DATA FOR TABLE ======================
  const allTableData = useMemo(() => {
    const mapRow = (row: any, index: number) => ({
      ...row,
      id: row.id || `CLNT-${String(index + 1).padStart(3, '0')}`,
      dateCreated: row.dateCreated || new Date().toISOString().split('T')[0],
      name: `${row.firstName || row.name || 'Unknown'} ${row.lastName || ''}`.trim(),
      company: row.company || '-',
      email: row.email || 'N/A',
      jobs: row.jobs || '3',
      status: row.status || 'Active',
      action: '',
    });

    const mappedImportedClients = clients.map((client, index) => mapRow(client, index + TableData.length));
    const mappedJsonData = TableData.map((row, index) => mapRow(row, index));

    return [...mappedJsonData, ...mappedImportedClients];
  }, [clients]);

  // ====================== APPLY FILTERS + SEARCH + SORT ======================
  const advancedfilteredData = useMemo(() => {
    let result = filterData(allTableData, searchedValue);
    result = applyAdvancedFilters(result, filters);
    result = sortData(result, sortBy);
    return result;
  }, [allTableData, searchedValue, sortBy, filters]);

  // ====================== EXPORT FUNCTION ======================
  const handleExport = () => {
    if (allTableData.length === 0) {
      alert("No data to export");
      return;
    }
    setIsExportModalOpen(true);
  };

  const performExport = (format: 'csv' | 'pdf') => {
    const dateStamp = new Date().toISOString().split('T')[0];
    const fileName = `clients_export_${dateStamp}`;

    if (format === 'csv') {
      const headers = [
        "Date Created", "Name", "Company", "Email",
        "Jobs", "Status"
      ];
      const rows = allTableData.map(row => [
        row.dateCreated || '', row.name || '', row.company || '-',
        row.email || '', row.jobs || '3', row.status || ''
      ]);
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map((field: string) => `"${field}"`).join(','))
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // PDF: open print dialog pre-populated with table data
      const headers = ["Date Created", "Name", "Company", "Email", "Jobs", "Status"];
      const rows = allTableData.map(row => [
        row.dateCreated || '', row.name || '', row.company || '-',
        row.email || '', row.jobs || '3', row.status || ''
      ]);
      const tableRows = rows.map(r => `<tr>${r.map((c: string) => `<td style="border:1px solid ${colors.grayBorder};padding:6px 10px;font-size:12px">${c}</td>`).join('')}</tr>`).join('');
      const html = `<html><head><title>Clients Export</title><style>body{font-family:sans-serif}table{border-collapse:collapse;width:100%}th{background:${colors.primary};color:${colors.white};padding:8px 10px;font-size:12px;text-align:left}</style></head><body><h2 style="margin-bottom:12px">Clients Export — ${dateStamp}</h2><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${tableRows}</tbody></table></body></html>`;
      const win = window.open('', '_blank');
      if (win) { win.document.write(html); win.document.close(); win.print(); }
    }
  };
  const handleDelete = () => {
    console.log("Delete")
  }
  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <div style={{ backgroundColor: colors.bgLight }}>
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onConfirmExport={performExport}
          fileName={`clients_export_${new Date().toISOString().split('T')[0]}`}
          recordCount={allTableData.length}
        />
        <Navbar />

        <ImportClientsModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImportSuccess={handleImportSuccess}
        />

        {isFormOpen && (
          <ClientFormModal
            onSubmit={(data) => {
              console.log('Form submitted:', data);
              setIsFormOpen(false);
            }}
            setOpenForm={setIsFormOpen}
            setClients={setClients}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
        )}

        <FilterModal
          isOpen={openFilter}
          onClose={() => setOpenFilter(false)}
          isVisible={openFilter}
          setIsVisible={setOpenFilter}
          onApply={(newFilters) => setFilters(newFilters)}
        />

        <div className='min-h-screen w-full flex flex-col items-start pb-24' style={{ backgroundColor: colors.bgLight }}>
          <div className='w-full lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6'>
            <OverviewHeader
              title="Clients"
              setOpenForm={setIsFormOpen}
              searchedValue={searchedValue}
              setSearchedValue={setSearchedValue}
              setOpenFilter={setOpenFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Import & Export Buttons */}
            <div className="w-full flex flex-wrap justify-end gap-5 mb-6 mt-4 lg:mt-0">
              <ImportClientsButton
                type="import"
                onClick={() => setIsImportModalOpen(true)}
              />
              <ImportClientsButton
                type="export"
                onClick={handleExport}           // ← Now working!
                showFormat={false}
              />
            </div>

            <Table
              headers={tableHeaders}
              data={advancedfilteredData}
              setDeleteModal={setIsDeleteModalOpen}
              sortBy={sortBy}
              unit="Clients"
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
      </div>
    </RouteGuard>
  );
}