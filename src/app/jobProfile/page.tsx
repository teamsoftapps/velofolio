/** @format */

'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import AddButton from '../components/AddButton';
import Contracts from '../components/Contracts';
import ClientJobCard from '../components/JobProfileComp/JobClientCard';
import JobDetail from "../../utils/JobDetail.json";
import { useRouter, useSearchParams } from 'next/navigation';
import { LuNetwork } from "react-icons/lu";
import WorkflowSteps from '../components/JobProfileComp/WorkflowSteps';
import InvoiceCard from '../components/JobProfileComp/InvoiceCard';
import EmptyInvoicnQuoteState from '../components/EmptyInvoicnQuoteState';
import { useSelector } from 'react-redux';

const JobProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [openForm, setOpenForm] = useState(false);
const invoices = useSelector((state: any) => state.invoiceandQuote.invoices);
const searchParams = useSearchParams();
const id = Number(searchParams.get("id"));
const router = useRouter();
  const data = JobDetail.find((item) => item.id === id);
  console.log("id",id);
  console.log("JobDetail",JobDetail);
  console.log("data",data);
  const steps = [
  { id: 1, title: "Lead", date: "19 Nov 2025", completed: true },
  { id: 2, title: "Qualified", date: "20 Nov 2025", completed: true },
  { id: 3, title: "Proposal", date: "21 Nov 2025", completed: true },
  { id: 4, title: "Negotiation", completed: false },
  { id: 5, title: "Closed Won", completed: false },
];
  const eventsData = [
    {
      title: 'Pre-Wedding Shoot - Sarah & John',
      status: 'COMPLETED',
      location: 'Toronto City Hall',
      date: 'Oct 12, 2025, 5:32 AM',
      deliverables: ['Full Film', 'Teaser', 'RAW Photos'],
      team: ['Priya', 'Sofia'],
    },
    {
      title: 'Wedding Ceremony - Sarah & John',
      status: 'IN PROGRESS',
      location: 'Toronto City Hall',
      date: 'Oct 12, 2025, 5:32 AM',
      deliverables: ['Highlight Reel', 'Edited Photos'],
      team: ['Priya', 'Sofia'],
    },
    {
      title: 'Engagement Party - Sarah & John',
      status: 'COMPLETED',
      location: 'Vancouver Park',
      date: 'Nov 5, 2025, 3:00 PM',
      deliverables: ['Event Coverage', 'Photo Album'],
      team: ['Priya', 'John'],
    },
    {
      title: 'Reception - Sarah & John',
      status: 'NOT STARTED',
      location: 'Toronto Grand Hall',
      date: 'Dec 15, 2025, 6:00 PM',
      deliverables: ['Full Video', 'Edited Clips'],
      team: ['Sofia', 'Mike'],
    },
  ];

  return (
   <div className='min-h-screen  w-full flex flex-col items-start bg-[#FAFAFA] inter'>
  <Navbar />
  <div className='container w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-6 lg:gap-20'>
    
    {/* Left Section */}
    <div className='w-full lg:w-[29%] flex-shrink-0'>
      <div>
        <h1 className='text-2xl font-semibold text-black'>{data?.jobDetails.title}</h1>
        <Link
          href='/jobs'
          className='flex items-center mt-2 text-[#a3a3a3] hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-sm font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'
        >
          Dashboard | Job Overview | {data?.jobDetails.title}
        </Link>
      </div>
      <ClientJobCard  data={data}/>
    </div>

    {/* Right Section */}
    <div className='w-full lg:w-[65%] flex flex-col  h-screen overflow-y-scroll scroller'>
      {/* Stepper */}
      <div className='w-full flex justify-end'>
        <div className='w-40 '>
        <AddButton title='Add New' setOpenForm={setOpenForm} />
      </div>
      </div>
      <div className=''>
        <WorkflowSteps />
      </div>

      {/* Tabs */}
      <div className='w-full mt-4 h-[620px] bg-white p-3 sm:p-6 rounded-lg shadow-md'>
        <div className='flex  lg:justify-between scroller gap-2 sm:gap-3 overflow-x-auto p-2 border-2 border-gray-300 rounded-xl'>
          {['Invoices', 'Quotes', 'Tasks', 'Contracts & Docs', 'Invoices & Payments'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer flex-shrink-0 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium ${
                activeTab === tab ? 'bg-[#01B0E9] text-white' : 'text-black hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className='w-full h-[500px] bg-white p-4 sm:p-8 rounded-lg mt-4   overflow-y-auto scroller'>
     {activeTab === 'Invoices' && (
  <>
    {invoices?.length > 0 ? (
      <div className="space-y-4 flex items-center flex-col">
        {invoices.map((invoice: any) => (
          <InvoiceCard
            key={invoice.id}
            {...invoice}
            clientId={id}
            invoiceId={invoice.id}
            type="Invoice"
          />
        ))}

        {/* Render AddButton only once */}
        <div className="w-36 mt-4">
          <AddButton
            setOpenForm={() => router.push(`/addInvoice?id=${id}`)}
            title="Add Invoice"
          />
        </div>
      </div>
    ) : (
      <EmptyInvoicnQuoteState setOpenForm={setOpenForm} id={id} type="Invoice" />
    )}
  </>
)}



              {activeTab === 'Quotes' && (
  (invoices.length > 0) ? (<div className='flex flex-col items-center'>
  <InvoiceCard type='Quote' {...invoices} clientId={id} invoiceId={invoices.id}/>
    <div className='w-36 mt-4' >
      
     <AddButton setOpenForm={()=>router.push(`/addQuote?id=${id}`)} title={`Add Quote`}/>
  </div>
  
  </div>
  ) : (
    <>
<EmptyInvoicnQuoteState setOpenForm={setOpenForm} id={id} type='Quote'/>
    </>
  )
)}
          {activeTab === 'Tasks' && <div className='flex flex-col gap-4 sm:gap-6'></div>}
          {activeTab === 'Contracts & Docs' && <Contracts />}
        </div>
      </div>
    </div>

  </div>
</div>

  );
};

export default JobProfilePage;
