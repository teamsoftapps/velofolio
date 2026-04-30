/** @format */
'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';

import { Briefcase } from 'lucide-react';

import JobDetail from "@/utils/JobDetail.json";
import ClientData from "@/utils/Data.json";
import { useSearchParams } from 'next/navigation';

import InvoiceDetailsForm from '@/app/components/AddInvoiceComp/InvoiceDeatil';
import ClientCard from '@/app/components/JobProfileComp/ClientCard';
import { RiTeamFill } from 'react-icons/ri';
import JobCardDetail from '@/app/components/JobProfileComp/JobCardDetail';
import ProductsPackage from '@/app/components/AddInvoiceComp/ProductsPackage';
import AddInvoiceModal from '@/app/components/AddInvoiceComp/AddInvoiceModal';
import { useDispatch, useSelector } from 'react-redux';

const AddInvoiceContent = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state: any) => state.persisted.invoiceandQuote.invoices);
  const searchParams = useSearchParams();
  
  const rawId = searchParams.get("clientId") || searchParams.get("id");
  const id = rawId ? (rawId.startsWith('CLNT-') ? rawId : Number(rawId)) : null;
  
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

  const data = React.useMemo(() => {
    if (!id) return null;
    
    // Try to find in JobDetail first (which has both client and job info)
    const jobData = JobDetail.find((item) => item.id === id);
    if (jobData) return jobData;

    // If not found and it's a client ID or we just want to try finding the client
    const clientFound = ClientData.find((c) => c.id === id);
    if (clientFound) {
      return {
        id: clientFound.id,
        client: {
          name: clientFound.name,
          email: clientFound.email,
          phone: clientFound.phone,
          address: clientFound.address,
          image: (clientFound as any).image || "/teampic1.png"
        },
        jobDetails: {
          title: "New Job",
          type: "General",
          status: "Pending"
        }
      };
    }
    return null;
  }, [id]);

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
      <div className='container w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 flex flex-col gap-4'>

        <div>
          <h1 className='text-2xl font-semibold text-black'>{data?.jobDetails?.title || "Invoice"}</h1>
          <Link
            href='/jobs'
            className='flex items-center mt-2 text-[#a3a3a3] hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-sm font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'
          >
            Dashboard | Job Overview | {data?.jobDetails?.title || "New Job"} | <span className="font-semibold text-black">Invoices</span>
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

const JobProfilePage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AddInvoiceContent />
    </Suspense>
  );
};

export default JobProfilePage;
