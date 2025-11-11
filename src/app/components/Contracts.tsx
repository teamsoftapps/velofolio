import React from 'react'
import SearchComponent from './SearchComponent'
import SortButton from './sortButton'
import FilterButton from './filterButton'
import Table from './Table'

const tableHeaders = [
    { key: 'documentType', label: 'Document Type' },
    { key: 'type', label: 'Type' },
    { key: 'uploadedBy', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
]
const tableData = [
    {
        "id": 1,
       "name": 'John Doe',
        "email": 'H2VXu@example.com',
       "role": 'Administrator',
       "status": 'Active',
        "actions": 'Edit | Delete',
    },
]
const Contracts = () => {
  return (
    <div className='w-full '>
        <div className='w-3/4 gap-4 bg-red-400 flex items-center  '>
            <SearchComponent 
            placeHolder="Search"/>
            <SortButton />
            <FilterButton />
        </div>
        <Table
        headers={tableHeaders}
        data={tableData}
        />

    </div>
  )
}

export default Contracts