"use client"
import Link from 'next/link'
import React from 'react'
import Navbar from '../components/Navbar'
import SplitInvoicePayment from '../components/AddInvoiceComp/SplitInvoicePayment'
import InvoiceSend from '../components/AddInvoiceComp/InvoiceSend';
import InvoiceTable from '../components/AddInvoiceComp/InvoiceTable'
import InvoicePriceData from '../components/AddInvoiceComp/InvoicePriceData'
import InvoiceMeta from '../components/AddInvoiceComp/InvoiceMeta'

const examplePayments = [
  {
    id: 1,
    dueDate: "Dec 1, 2025",
    status: "UNPAID",
    percentage: "100% of order",
    amount: "$4999.00",
  },
];
const invoiceItems: any = [
  {
    id: "itm-001",
    name: "Ultimate Family Memories",
    description: "A deluxe package for families wanting timeless wall art and keepsake prints.\n\nIncludes:\n• 1.5-hour outdoor or studio session\n• All best photos (40+ fully edited)\n• 2x Medium 16×24 canvases\n• Custom USB with all images",
    rate: 4999.00,
    quantity: 1,
    total: 4999.00
  }
];
const handleSendQuote = () => {

    console.log('Sending Quote...');
  };
const page = () => {
  return (
   <div className='min-h-screen h-full inter  w-full flex flex-col items-start bg-[#FAFAFA] text-black'>
  <Navbar />
  <div className='container w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 flex flex-col gap-4'>
    
      <div className='border-b-2 border-b-gray-200'>
        <h1 className='text-2xl font-semibold text-black '>Quote-234c6 </h1>
        <Link
          href='/jobs'
          className='flex items-center mt-2 text-[#a3a3a3] hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-sm font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'
        >
          Dashboard | Job Overview | Wedding | Quote |Quote-234c6 
        </Link>
      </div>
        <h1 className='text-xl'>Payment Scheduele</h1>
        <p className='text-sm text-gray-400'>Assign a payment schedule to this Quote</p>
        {/* Payment Schedule */}
    <div className='space-y-3 border-1 border-gray-200 rounded-xl mb-5'>
        <div className='bg-white p-6'>
        <SplitInvoicePayment payments={examplePayments} totalDue="4999.00" />
        <div className='w-full text-right '><h3 className='text-lg'>Balance Due: {"4999.00"}</h3></div>
        <div className='bg-[#E5F7FD]'>
            <InvoiceSend onSendInvoice={handleSendQuote} type="Quote"/>
        </div>
        </div>
    </div>

    <hr className='mt-4 text-gray-300'/>
{/* Invoice Details */}
    <div className='my-3  w-full bg-white p-6 '>
<InvoiceMeta id="234c6" issueDate="12-12-2023" type="Quote" from="Velofolio" invoiceFor="Sarah Wedding Dec 1, 2025 - 2:20 PM to 4:00 PM New York, USA Sarah Johnson sarahjohnson@gmail.com New York, USA 225 Cherry Street #24" />
   
      <div className='my-10'>
        <h1 className='text-xl my-3 '>Quote</h1>
        <div className='w-full border-b-2 border-b-gray-300 sm:p-4 relative'>
        <InvoiceTable  items={invoiceItems} onDelete={() => {}} onDuplicate={()=>"Reachedd"}/>
          </div>
          <div className='flex items-center justify-end'>
          <div className='w-96 text-right mt-4'>
          <InvoicePriceData invoices={invoiceItems} totalDue="4999.00" />
          </div>
          </div>

      </div>


<div>
  <SplitInvoicePayment payments={examplePayments} totalDue="4999.00" />
   <div className='w-full text-right '><h3 className='text-lg'>Balance Due: {"4999.00"}</h3></div>

</div>





    </div>




    </div>
    </div>

  )
}

export default page