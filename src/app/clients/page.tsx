
// /** @format */
// 'use client';
// import React, { useMemo, useState } from 'react';

// import Navbar from '../components/Navbar';
// import FilterModal from '../components/FilterModal';
// import Table from '../components/Table';
// import OverviewHeader from '../components/OverviewHeader';
// import TableData from '../../utils/Data.json';
// import ClientFormModal from '../components/ClientFormModal';
// import DeleteModal from '../components/DeleteModal';
// import { filterData, sortData, SortState, applyAdvancedFilters } from "../../utils/TableUtils";
// import RouteGuard from '../components/RouteGuard';
// import ImportClientsButton from '../components/ImportClientsButton';
// import ImportClientsModal from '../components/ImportClientModal';

// const tableHeaders = [
//   { key: 'dateCreated', label: 'Date Created' },
//   { key: 'firstName', label: 'First Name' },
//   { key: 'lastName', label: 'Last Name' },
//   { key: 'email', label: 'Email' },
//   { key: 'phone', label: 'Phone' },
//   { key: 'event', label: 'Event' },
//   { key: 'status', label: 'Status' },
//   { key: 'eventDate', label: 'Event Date' },
// ];

// export default function ClientsPage() {
//   const [clients, setClients] = useState<any[]>([]);           // ← your imported + form clients
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [searchedValue, setSearchedValue] = useState('');
//   const [openFilter, setOpenFilter] = useState(false);
//   const [sortBy, setSortBy] = useState<SortState>({
//     value: "dateCreated",
//     direction: "desc",
//   });
//   const [filters, setFilters] = useState({
//     status: [],
//     selectedMembers: [],
//     leadSource: [],
//     eventType: [],
//     fromDate: "",
//     toDate: "",
//     paymentStatus: [],
//   });

//   const [isImportModalOpen, setIsImportModalOpen] = useState(false);

//   // ====================== MERGE CSV DATA ======================
//   const handleImportSuccess = (newClientsFromCSV: any[]) => {
//     const existingEmails = new Set(
//       clients.map((c: any) => c.email?.toLowerCase().trim())
//     );

//     const uniqueNewClients = newClientsFromCSV.filter((client: any) => {
//       const email = client.email?.toLowerCase().trim();
//       return email && !existingEmails.has(email);
//     });

//     if (uniqueNewClients.length > 0) {
//       setClients((prev) => [...prev, ...uniqueNewClients]);
//     }
//   };

//   // ====================== COMBINE STATIC + DYNAMIC DATA ======================
//   const allTableData = useMemo(() => {
//     const mappedImportedClients = clients.map((client, index) => ({
//       id: `CLNT-${String(index + 1).padStart(3, '0')}`,
//       dateCreated: client.dateCreated || new Date().toISOString().split('T')[0],
//       firstName: client.firstName || 'Unknown',
//       lastName: client.lastName || '',
//       email: client.email || 'N/A',
//       phone: client.phone || 'N/A',
//       event: client.event || 'Client Onboarding',
//       status: client.status || 'New Lead',
//       eventDate: client.eventDate 
//         ? new Date(client.eventDate).toISOString().split('T')[0] 
//         : 'N/A',
//       nextTask: '—',
//       _rawId: client.id,
//     }));

//     return [...TableData, ...mappedImportedClients];
//   }, [clients]);   // ← This is the key fix

//   // Apply search + filter + sort
//   const advancedfilteredData = useMemo(() => {
//     let result = filterData(allTableData, searchedValue);
//     result = applyAdvancedFilters(result, filters);
//     result = sortData(result, sortBy);
//     return result;
//   }, [allTableData, searchedValue, sortBy, filters]);
// const handleDelete=()=>{

// }
//   return (
//     <RouteGuard allowedRoles={['superadmin']}>
//       <Navbar />

//       <ImportClientsModal
//         isOpen={isImportModalOpen}
//         onClose={() => setIsImportModalOpen(false)}
//         onImportSuccess={handleImportSuccess}
//       />

//       {isFormOpen && (
//         <ClientFormModal
//           onSubmit={(data) => {
//             console.log('Form submitted:', data);
//             setIsFormOpen(false);
//           }}
//           setOpenForm={setIsFormOpen}
//           setClients={setClients}
//         />
//       )}

//       {isDeleteModalOpen && (
//         <DeleteModal
//           isOpen={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={handleDelete}   // make sure handleDelete is imported correctly
//         />
//       )}

//       <FilterModal
//         isOpen={openFilter}
//         onClose={() => setOpenFilter(false)}
//         isVisible={openFilter}
//         setIsVisible={setOpenFilter}
//         onApply={(newFilters) => setFilters(newFilters)}
//       />

//       <div className="min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] pt-6 pb-24">
//         <div className="container mx-auto w-full">
//           <OverviewHeader
//             title="Clients"
//             setOpenForm={setIsFormOpen}
//             searchedValue={searchedValue}
//             setSearchedValue={setSearchedValue}
//             setOpenFilter={setOpenFilter}
//             sortBy={sortBy}
//             setSortBy={setSortBy}
//           />

//           <div className="w-full flex justify-end gap-5 mb-6">
//             <ImportClientsButton 
//               type="import" 
//               onClick={() => setIsImportModalOpen(true)} 
//             />
//             <ImportClientsButton type="export" showFormat={false} />
//           </div>

//           <Table
//             headers={tableHeaders}
//             data={advancedfilteredData}
//             setDeleteModal={setIsDeleteModalOpen}
//             sortBy={sortBy}
//             onSort={(key: string) => {
//               if (sortBy.value === key) {
//                 setSortBy({
//                   value: key,
//                   direction: sortBy.direction === 'asc' ? 'desc' : 'asc',
//                 });
//               } else {
//                 setSortBy({ value: key, direction: 'desc' });
//               }
//             }}
//           />
//         </div>
//       </div>
//     </RouteGuard>
//   );
// }
/** @format */
'use client';
import React, { useMemo, useState } from 'react';

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

const tableHeaders = [
  { key: 'dateCreated', label: 'Date Created' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'event', label: 'Event' },
  { key: 'status', label: 'Status' },
  { key: 'eventDate', label: 'Event Date' },
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
    const mappedImportedClients = clients.map((client, index) => ({
      id: `CLNT-${String(index + 1).padStart(3, '0')}`,
      dateCreated: client.dateCreated || new Date().toISOString().split('T')[0],
      firstName: client.firstName || 'Unknown',
      lastName: client.lastName || '',
      email: client.email || 'N/A',
      phone: client.phone || 'N/A',
      event: client.event || 'Client Onboarding',
      status: client.status || 'New Lead',
      eventDate: client.eventDate 
        ? new Date(client.eventDate).toISOString().split('T')[0] 
        : 'N/A',
      nextTask: '—',
      _rawId: client.id,
    }));

    return [...TableData, ...mappedImportedClients];
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

    // Create CSV Header
    const headers = [
      "Date Created", "First Name", "Last Name", "Email", 
      "Phone", "Event", "Status", "Event Date"
    ];

    // Convert data to CSV rows
    const rows = allTableData.map(row => [
      row.dateCreated || '',
      row.firstName || '',
      row.lastName || '',
      row.email || '',
      row.phone || '',
      row.event || '',
      row.status || '',
      row.eventDate || ''
    ]);

    // Combine headers + rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))  // Quote fields to handle commas
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `clients_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
const handleDelete=()=>{
  console.log("Delte")
}
  return (
    <RouteGuard allowedRoles={['superadmin']}>
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

      <div className="min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] pt-6 pb-24">
        <div className="container mx-auto w-full">
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
          <div className="w-full flex justify-end gap-5 mb-6">
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