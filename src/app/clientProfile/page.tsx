'use client';
import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import {
  Magnet,
  FileText,
  Briefcase,
  Mail,
} from 'lucide-react';
import { ImMagnet } from "react-icons/im";

import ClientProfileCard from '../components/ClientProfileCard';
import ProfileAccordionItem from '../components/ProfileAccordionItem';
import AddButton from '../components/AddButton';
import Link from 'next/link';
import LeadForm from '../components/LeadFormModel';
import AddJobModal from '../components/AddJobModal';
import ClientForm from '../components/ClientFormModal';
import DeleteModal from '../components/DeleteModal';
import ExpandableSection from '../components/ExpandableSection';
import JobCard from '../components/JobCard';
import { toast } from 'react-toastify';

import { useSearchParams } from 'next/navigation';
import TableData from '../../utils/Data.json';

/**
 * ClientProfilePage Component
 * Using a stable multi-column grid to ensure pixel-perfect fidelity
 * across different screen resolutions.
 */
const ClientProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get('id');

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientOverride, setClientOverride] = useState<Record<string, any>>({});

  const setClient = (updater: (prev: any) => any) =>
    setClientOverride((prev) => updater(prev));

  // Find dynamic client data or fallback to mock
  const baseClient = useMemo(() => {
    const found = TableData.find(c => c.id === clientId);
    if (found) {
      return {
        ...found,
        phone: (found as any).phone || "+1(514) 550-3281",
        address: (found as any).address || "225 Cherry Street #24, New York, NY",
        city: (found as any).city || "New York",
        country: (found as any).country || "USA",
        notes: (found as any).notes || "During our initial consultation, Sarah mentioned that she prefers a pastel color theme for the wedding and wants extra focus on candid shots. She also requested a highlight reel for social media, in addition to the full video package. Need to confirm the exact start time for the reception."
      };
    }
    return {
      id: 1,
      name: "Sarah Johnson",
      firstName: "Sarah",
      lastName: "Johnson",
      status: "Active",
      email: "sarahjohnson@gmail.com",
      phone: "+1(514) 550-3281",
      address: "225 Cherry Street #24, New York, NY",
      city: "New York",
      country: "USA",
      notes: "During our initial consultation, Sarah mentioned that she prefers a pastel color theme for the wedding and wants extra focus on candid shots. She also requested a highlight reel for social media, in addition to the full video package. Need to confirm the exact start time for the reception."
    };
  }, [clientId]);

  // Merge live edits on top of the base client
  const client = { ...baseClient, ...clientOverride };

  return (
    <div className='min-h-screen w-full flex flex-col items-start bg-[#F8F9FB]'>
      <Navbar />

      <div className='w-full max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 px-6 sm:px-8 md:px-10 pb-16'>

        {/* Title & Navigation */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-[24px] font-semibold text-gray-950 mb-2">{client.name}</h1>
          <div className="flex items-center gap-4 text-[14px] text-gray-500 font-medium">
            <Link href="/dashboard" className="hover:text-gray-950 transition-colors cursor-pointer">Dashboard</Link>
            <span className="text-gray-300">|</span>
            <Link href="/clients" className="hover:text-gray-950 transition-colors cursor-pointer">Clients Overview</Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-700 font-semibold ">{client.name}</span>
          </div>
        </div>

        {/* Responsive Grid System for Stability */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start'>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 xl:col-span-5 animate-in fade-in slide-in-from-left-4 duration-700">
            <ClientProfileCard
              data={client}
              onEditClick={() => setIsClientModalOpen(true)}
              onDeleteClick={() => setIsDeleteModalOpen(true)}
            />
          </div>

          {/* Accordion Area */}
          <div className='lg:col-span-8 xl:col-span-7 flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-700'>
            <ExpandableSection
              title="Leads"
              icon={ImMagnet}
              action={<AddButton title="Add Lead" setOpenForm={() => setIsLeadModalOpen(true)} />}
              showToggle={false}
            >
              <div className='py-4'>
                <p className='text-gray-500 text-[14px] italic'>No leads currently available for this client.</p>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title="Invoices & Payments"
              icon={FileText}
              action={<AddButton title="Add Invoice" setOpenForm={() => router.push(`/addInvoice?clientId=${client.id}`)} />}
              showToggle={false}
            >
              <div className='py-4'>
                <p className='text-gray-500 text-[14px] italic'>No invoices or payment history found.</p>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Jobs" 
              icon={Briefcase} 
              defaultOpen={true} 
              badgeCount={2}
              action={<AddButton title="Add Job" setOpenForm={() => setIsJobModalOpen(true)} />}
              showToggle={false}
            >
              <div className='flex gap-4 overflow-x-auto pb-4 pt-4'>
                <JobCard />
                <JobCard />
              </div>
            </ExpandableSection>

            <ExpandableSection
              title="Mail"
              icon={Mail}
              action={<AddButton title="Add Mail" setOpenForm={() => { }} />}
              showToggle={false}
            >
              <div className='py-4'>
                <p className='text-gray-500 text-[14px] italic'>Communication history will appear here.</p>
              </div>
            </ExpandableSection>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {isLeadModalOpen && (
        <LeadForm
          onSubmit={(data) => console.log('Lead data:', data)}
          setOpenForm={setIsLeadModalOpen}
        />
      )}

      {isJobModalOpen && (
        <AddJobModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          onAddJob={(data) => console.log('Job data:', data)}
        />
      )}

      {isClientModalOpen && (
        <ClientForm
          onSubmit={(data) => {
            // Merge updated fields back into client state
            setClient?.((prev: any) => ({ ...prev, ...data }));
            setIsClientModalOpen(false);
            toast.success('Client updated successfully!');
          }}
          setOpenForm={setIsClientModalOpen}
          initialData={client}
          setClients={() => { }}
        />
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          toast.success('Client deleted successfully.');
          router.push('/clients');
        }}
        title="Delete Client?"
        message={`Are you sure you want to delete ${client.name}? This action cannot be undone.`}
        confirmLabel="Delete Client"
      />
    </div>
  );
};

export default ClientProfilePage;