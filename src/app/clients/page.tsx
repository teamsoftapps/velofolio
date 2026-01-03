/** @format */

'use client';
import React, { useEffect,useMemo,useState } from 'react';

import Navbar from '../components/Navbar';
import FilterModal from '../components/FilterModal';
import Table from '../components/Table';
import OverviewHeader from '../components/OverviewHeader';
import TableData from '../../utils/Data.json';
import ClientFormModal from '../components/ClientFormModal';
import DeleteModal from '../components/DeleteModal';
import {filterData, sortData, SortState,handleDelete, applyAdvancedFilters} from "../../utils/TableUtils"
import RouteGuard from '../components/RouteGuard';

const tableHeaders = [
  { key: 'name', label: 'Name' },
  { key: 'event', label: 'Event' },
  { key: 'status', label: 'Status' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'assignedTeam', label: 'Assigned Team' },
  { key: 'nextTask', label: 'Next Task' },
  { key: 'lastContact', label: 'Last Contact' },
  { key: 'action', label: 'Action' },
];

export default function Page() {
 const [clients,setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  let tableData: any[] = TableData;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false); 
  const [searchedData, setSearchedData] = React.useState<any[]>([]);
  const [searchedValue, setSearchedValue] = React.useState('');
  const [openFilter, setOpenFilter] = useState<boolean>(false);
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
const mapClientsForTable = (clients: any[]) => {
  return clients.map((client, index) => ({
    id: `CLNT-${String(index + 1).padStart(3, '0')}`,
    name: `${client.firstName} ${client.lastName}`,
    event: client.event||'Client Onboarding',
    status: client.status,
    eventDate: new Date(client.eventDate).toISOString().split('T')[0],
    assignedTeam: 'Unassigned',
    nextTask: '—',
    lastContact: client.invitationSent
      ? 'Invitation Sent'
      : 'Not Contacted',
    action: 'View Details',
    _rawId: client.id, // IMPORTANT for navigation / actions
  }));
};

tableData=mapClientsForTable(clients)

  // Combine search + sort + filter
  const advancedfilteredData = useMemo(() => {
    let result = filterData(tableData, searchedValue);
    result = applyAdvancedFilters(result, filters);
    result = sortData(result, sortBy);
    return result;
  }, [tableData, searchedValue, sortBy, filters]);

//  const filteredData = useMemo(() => filterData(tableData, searchedValue), [tableData, searchedValue]);
//  const sortedData = useMemo(() => sortData(filteredData, sortBy), [filteredData, sortBy]);


console.log("clients",clients)
 

  return (
    <RouteGuard allowedRoles={['superadmin']} >
    
      <Navbar />
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
          onConfirm={()=>handleDelete}
        />
      )}
      
     
         
          <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            isVisible={openFilter}
            setIsVisible={setOpenFilter}
              onApply={(newFilters) => setFilters(newFilters)}
            
          />
      
     
      <div className='min-h-screen  w-full flex flex-col items-start bg-[#FAFAFA]'>
        <div className='container mx-auto w-[100%] h-full]'>
          <OverviewHeader
            title='Clients'
            setOpenForm={setIsFormOpen}
            // setSearchedData={setSearchedData}
            searchedValue={searchedValue}
            setSearchedValue={setSearchedValue}
            setOpenFilter={setOpenFilter}
             sortBy={sortBy}
             setSortBy={setSortBy}

          />
  
          <Table
            headers={tableHeaders}
            data={advancedfilteredData}
            setDeleteModal={setIsDeleteModalOpen}
            setSearchedData={setSearchedData}
          />
        </div>
      </div>
    </RouteGuard>
    
  );
}
