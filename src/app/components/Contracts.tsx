import React from 'react'
import SearchComponent from './SearchComponent'
import SortButton from './sortButton'
import FilterButton from './filterButton'
import Table from './Table'

const tableHeaders = [
    { key: 'documentType', label: 'Document' },
    { key: 'type', label: 'Type' },
    { key: 'uploadedBy', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Actions' },
]
const tableData = [
      {
    documentType: "Federal Tax",
    type: "PDF",
    uploadedBy: "john.doe@example.com",
    role: "Dealer",
    status: "Draft",
    actions: "", 
  },
  {
    documentType: "Driving License",
    type: "PDF",
    uploadedBy: "jane.doe@example.com",
    role: "Customer",
    status: "Signed",
    actions: "",
  },
  {
    documentType: "Social Security",
    type: "PDF",
    uploadedBy: "manager@example.com",
    role: "Admin",
    status: "Signed",
    actions: "",
  },
  {
    documentType: "Resale ",
    type: "PDF",
    uploadedBy: "dealer@example.com",
    role: "Dealer",
    status: "Draft",
    actions: "",
  },
  {
    documentType: "Voided Check",
    type: "PDF",
    uploadedBy: "employee@example.com",
    role: "Vendor",
    status: "Pending",
    actions: "",
  },
]
const Contracts = () => {
  return (
    <div className='w-full '>
        <div className=' w-full  lg:w-3/4 gap-4 flex-wrap flex sm:flex-nowrap items-center  '>
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