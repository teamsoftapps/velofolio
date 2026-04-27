/** @format */

'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/layouts/Navbar';
import Link from 'next/link';

import { Briefcase } from 'lucide-react';

import JobDetail from "@/utils/JobDetail.json";
import { useSearchParams } from 'next/navigation';

import InvoiceDetailsForm from '@/app/components/AddInvoiceComp/InvoiceDeatil';
import ClientCard from '@/app/components/JobProfileComp/ClientCard';
import { RiTeamFill } from 'react-icons/ri';
import JobCardDetail from '@/app/components/JobProfileComp/JobCardDetail';
import ProductsPackage from '@/app/components/AddInvoiceComp/ProductsPackage';
import AddInvoiceModal from '@/app/components/AddInvoiceComp/AddInvoiceModal';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoices } from '@/store/slices/invoiceSlice';

const JobProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Invoices');

  const dispatch = useDispatch();
  const invoices = useSelector((state: any) => state.persisted.invoiceandQuote.invoices);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("clientId") || searchParams.get("id"));
  const invoiceIdParam = searchParams.get("InvoiceId");
  const isEditing = searchParams.get("edit") === "true";

  const existingInvoice = React.useMemo(() => {
    return invoices.find((inv: any) => inv.id === invoiceIdParam);
  }, [invoices, invoiceIdParam]);

  const [packages, setPackages] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [packageToEdit, setPackageToEdit] = useState<any>(null);
  const today = new Date().toISOString().split('T')[0];
  const [invoiceDate, setInvoiceDate] = React.useState(today);

  React.useEffect(() => {
    if (isEditing && existingInvoice) {
      setPackages(existingInvoice.packages || []);
      if (existingInvoice.createdAt) {
        setInvoiceDate(new Date(existingInvoice.createdAt).toISOString().split('T')[0]);
      }
    }
  }, [isEditing, existingInvoice]);

  const generatedId = React.useMemo(() => {
    if (isEditing && invoiceIdParam) return invoiceIdParam;
    return Math.random().toString(36).substring(2, 9).toUpperCase();
  }, [isEditing, invoiceIdParam]);

  const data = JobDetail.find((item) => item.id === id);
  console.log("id", id);
  console.log("JobDetail", JobDetail);
  console.log("data", data);
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
  // Inside JobProfilePage component
  const handleAddPackage = (pkg: any) => {
    if (packageToEdit) {
      setPackages(packages.map((p) => p.id === packageToEdit.id ? { ...pkg, id: p.id } : p));
      setPackageToEdit(null);
    } else {
      setPackages((prev: any) => [...prev, pkg]);
    }
  };

  return (
    <div className='min-h-screen h-full  w-full flex flex-col items-start bg-[#FAFAFA] inter'>
      <Navbar />
      <div className='container w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 flex flex-col gap-4'>

        <div>
          <h1 className='text-2xl font-semibold text-black'>{data?.jobDetails.title}</h1>
          <Link
            href='/jobs'
            className='flex items-center mt-2 text-[#a3a3a3] hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-sm font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'
          >
            Dashboard | Job Overview | {data?.jobDetails.title} | <span className="font-semibold text-black">Invoices</span>
          </Link>
        </div>
        {/*bottom Section 1 */}
        <div className='w-full  flex lg:flex-row flex-col items-center gap-4 lg:h-80 my-3'>
          <InvoiceDetailsForm generatedId={generatedId} issueDate={invoiceDate} onDateChange={setInvoiceDate} />
          <div className='bg-white rounded-2xl p-3 w-full lg:w-2/6 h-74'>
            <h1 className="text-lg sm:text-xl text-black flex gap-2 items-center font-semibold mb-3">
              <RiTeamFill className="w-5 h-5 text-black" /> Client
            </h1>
            <ClientCard data={data?.client} />

          </div>

          <div className='bg-white rounded-2xl p-3 w-full lg:w-2/6 h-74'>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-gray-600" />
              Job Details
            </h3>
            <div className='bg-[#F4F4F5] p-2 rounded-lg'>
              <JobCardDetail data={data?.jobDetails} />
            </div>

          </div>

        </div>
        <hr />
        {/*bottom Section 1 */}
        <ProductsPackage 
          id={id} 
          setOpenForm={setOpenForm} 
          packages={packages} 
          setPackages={setPackages} 
          generatedId={generatedId} 
          invoiceDate={invoiceDate} 
          clientName={data?.client?.name}
          jobTitle={data?.jobDetails?.title}
          onEditItem={(itemId: any) => {
            const item = packages.find(p => p.id === itemId);
            if (item) {
              setPackageToEdit(item);
              setOpenForm(true);
            }
          }}
        />


      </div>
      <AddInvoiceModal 
        isOpen={openForm} 
        onClose={() => {
          setOpenForm(false);
          setPackageToEdit(null);
        }} 
        onSubmit={handleAddPackage} 
        initialData={packageToEdit}
      />
    </div>

  );
};

export default JobProfilePage;




