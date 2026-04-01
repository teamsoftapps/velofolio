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
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import WorkflowSteps from '../components/JobProfileComp/WorkflowSteps';
import InvoiceCard from '../components/JobProfileComp/InvoiceCard';
import EmptyInvoicnQuoteState from '../components/EmptyInvoicnQuoteState';
import { useSelector } from 'react-redux';

const JobProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [openForm, setOpenForm] = useState(false);
  const { invoices, quotes } = useSelector((state: any) => state.persisted.invoiceandQuote);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const router = useRouter();
  const data = JobDetail.find((item) => item.id === id);
  const [notesList, setNotesList] = useState<any[]>((data as any)?.notes ? [{ id: 1, title: 'Initial Briefing', text: (data as any)?.notes, date: 'Oct 12, 2025' }] : []);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
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
    <div className='min-h-screen pb-16 lg:pb-32 w-full flex flex-col items-start bg-[#FAFAFA] inter'>
      <Navbar />
      <div className='container w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 pb-10 flex flex-col lg:flex-row gap-6 lg:gap-20'>

        {/* Left Section */}
        <div className='w-full lg:w-[31%] flex-shrink-0'>
          <div>
            <h1 className='text-2xl font-semibold text-black'>{data?.jobDetails.title}</h1>
            <Link
              href='/jobs'
              className='flex items-center mt-2 text-[#a3a3a3] hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-sm font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'
            >
              Dashboard | Job Overview | {data?.jobDetails.title}
            </Link>
          </div>
          <ClientJobCard data={data} />

          {/* Notes Section */}
          <div className="mt-4 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-800">Private Notes</h2>
              {!selectedNote && (
                <button
                  onClick={() => {
                    setNoteTitle('');
                    setNoteText('');
                    setSelectedNote({ id: 'new' });
                  }}
                  className="text-sm text-[#01B0E9] hover:underline font-medium p-1 cursor-pointer"
                >
                  + Add Note
                </button>
              )}
            </div>

            {!selectedNote ? (
              <div className="flex flex-col gap-3 min-h-[140px] max-h-[400px] overflow-y-auto scroller">
                {notesList.length > 0 ? notesList.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => {
                      setNoteTitle(note.title);
                      setNoteText(note.text);
                      setSelectedNote(note);
                    }}
                    className="flex items-center justify-between bg-gray-50/50 border border-gray-200 rounded-2xl p-4 hover:border-[#01B0E9]/50 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col overflow-hidden text-left">
                      <h3 className="text-[15px] font-semibold text-gray-800 tracking-tight truncate">{note.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 truncate">{note.date}</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-[#01B0E9] transition-colors ml-3 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                )) : (
                  <div className="flex items-center justify-center h-[100px] text-sm text-gray-400">
                    No notes added yet.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  placeholder="Note Title"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#01B0E9]/30 focus:border-[#01B0E9] transition-all"
                />
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-[#01B0E9]/30 focus:border-[#01B0E9] transition-all"
                  placeholder="Type your note details here..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
                <div className="flex items-center justify-between mt-1">
                  {selectedNote.id !== 'new' ? (
                    <button
                      onClick={() => {
                        setNotesList(notesList.filter(n => n.id !== selectedNote.id));
                        setSelectedNote(null);
                      }}
                      className="text-gray-400 hover:text-red-500 p-2 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  ) : <div></div>}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedNote(null)}
                      className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors shadow-sm focus:outline-none cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (selectedNote.id === 'new') {
                          setNotesList([{ id: Date.now(), title: noteTitle || 'Untitled Note', text: noteText, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...notesList]);
                        } else {
                          setNotesList(notesList.map(n => n.id === selectedNote.id ? { ...n, title: noteTitle, text: noteText } : n));
                        }
                        setSelectedNote(null);
                      }}
                      className={`text-sm font-medium text-white px-4 py-1.5 rounded-full transition-colors shadow-sm focus:outline-none cursor-pointer ${noteText.trim() === '' ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#01B0E9] hover:bg-[#01B0E9]/80'}`}
                      disabled={noteText.trim() === ''}
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className='w-full lg:w-[65%] flex flex-col h-screen overflow-y-scroll scroller pb-24 lg:pb-32'>
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
              {['Invoices', 'Quotes', 'Contracts',  'Questionnaires','Files'
              
              // ,'Notes'
            ].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer flex-shrink-0 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium ${activeTab === tab ? 'bg-[#01B0E9] text-white' : 'text-black hover:text-gray-700'
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
                  {invoices?.filter((inv: any) => inv.clientId === id).length > 0 ? (
                    <div className="space-y-4 flex items-center flex-col">
                      {invoices.filter((inv: any) => inv.clientId === id).map((invoice: any) => (
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
                <>
                  {quotes?.filter((q: any) => q.clientId === id).length > 0 ? (
                    <div className='flex flex-col items-center space-y-4'>
                      {quotes.filter((q: any) => q.clientId === id).map((quote: any) => (
                        <InvoiceCard
                          key={quote.id}
                          type='Quote'
                          {...quote}
                          clientId={id}
                          invoiceId={quote.id}
                        />
                      ))}
                      <div className='w-36 mt-4'>
                        <AddButton setOpenForm={() => router.push(`/addQuote?id=${id}`)} title="Add Quote" />
                      </div>
                    </div>
                  ) : (
                    <EmptyInvoicnQuoteState setOpenForm={setOpenForm} id={id} type='Quote' />
                  )}
                </>
              )}
              {activeTab === 'Contracts' && <Contracts />}
              {activeTab === 'Questionnaires' &&   <EmptyInvoicnQuoteState setOpenForm={setOpenForm} id={id} type='Questionnaire'  desibled={true}/>}
              {activeTab === 'Files' &&   <EmptyInvoicnQuoteState setOpenForm={setOpenForm} id={id} type='File'  desibled={true}/>}

            </div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default JobProfilePage;
