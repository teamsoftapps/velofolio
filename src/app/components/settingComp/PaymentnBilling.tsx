import React from 'react'
import LeftHeaderCard from './LeftHeaderCard'
import RightHeaderCard from './RightHeaderCard'
import InvoiceTable from './InvoiceTable'
import AddButton from '@/app/components/ui/AddButton';
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import PaymentMethod from './PaymentMethod';

const tableHeaders = [
  { key: 'name', label: 'Invoice #' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Amount' },
  { key: 'action', label: 'Download' },
];

const tableData = [
  {
    name: "INV-1001",
    date: "2025-11-01",
    status: "Paid",
    amount: "$250.00",
    action: "/pdfpath"
  },
  {
    name: "INV-1002",
    date: "2025-11-05",
    status: "Pending",
    amount: "$120.00",
    action: "/pdfpath"
  },
  {
    name: "INV-1003",
    date: "2025-11-09",
    status: "Overdue",
    amount: "$580.00",
    action: "/pdfpath"
  },
  {
    name: "INV-1004",
    date: "2025-11-10",
    status: "Paid",
    amount: "$75.00",
    action: "/pdfpath"
  },
  {
    name: "INV-1005",
    date: "2025-11-12",
    status: "Pending",
    amount: "$310.00",
    action: "/pdfpath"
  }
];

const PaymentnBilling = () => {
  return (
    <div className='text-black '>
      <div className='mt-13 flex-col flex lg:flex-row items-center justify-between gap-8 '>
    <LeftHeaderCard />
   <RightHeaderCard />
      </div>
      <div className='mt-10 pb-3 w-full flex-col flex lg:flex-row items-center justify-between gap-10'>
        <div className='w-full lg:w-1/2 bg-white rounded-xl p-5 border-b border-gray-300 '>
        <h1 className='mb-3 text-xl'>Invoices & Billing History</h1>
        <InvoiceTable headers={tableHeaders} data={tableData}/>

        </div>
<PaymentMethod />
      </div>
      
      </div>
  )
}

export default PaymentnBilling