"use client"
import Link from 'next/link'
import React from 'react'
import Navbar from '../components/Navbar'
import SplitInvoicePayment from '../components/AddInvoiceComp/SplitInvoicePayment'
import InvoiceSend from '../components/AddInvoiceComp/InvoiceSend';
import InvoiceTable from '../components/AddInvoiceComp/InvoiceTable'
import InvoicePriceData from '../components/AddInvoiceComp/InvoicePriceData'
import InvoiceMeta from '../components/AddInvoiceComp/InvoiceMeta'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setQuotes } from '@/store/slices/invoiceSlice'
import { toast } from 'react-toastify'
import ClientData from "../../utils/ClientAdvanceData.json"

const QuoteViewPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const clientId = Number(searchParams.get("clientId") || searchParams.get("id"));
    const quoteId = String(searchParams.get("QuoteId"));
    
    const { quotes } = useSelector((state: any) => state.persisted.invoiceandQuote);
    const quote = quotes.find((q: any) => q.id === quoteId);
    
    const client = ClientData.find((c: any) => c.id === clientId);
    const packages = quote?.packages || [];
    const totalAmount = quote?.totalAmount || 0;

    const payments = quote?.payments || [
        {
            id: 1,
            dueDate: "Set Due Date",
            status: quote?.status || "UNPAID",
            percentage: "100% of order",
            amount: totalAmount.toFixed(2),
        },
    ];

    const handleSendQuote = () => {
        const updated = quotes.map((q: any) => 
            q.id === quoteId ? { ...q, status: 'SENT', sentAt: new Date().toISOString() } : q
        );
        dispatch(setQuotes(updated));
        toast.success(`Quote #${quoteId} has been sent to ${client?.email}.`);
    };

    const handleDeleteQuote = () => {
        const updated = quotes.filter((q: any) => q.id !== quoteId);
        dispatch(setQuotes(updated));
        toast.info("Quote deleted successfully.");
        router.push(`/jobProfile?id=${clientId}`);
    };

    const handleDuplicateQuote = () => {
        const newId = Math.random().toString(36).substring(2, 9).toUpperCase();
        const duplicated = { 
            ...quote, 
            id: newId, 
            status: 'DRAFT', 
            createdAt: new Date().toISOString() 
        };
        dispatch(setQuotes([...quotes, duplicated]));
        router.push(`/viewQuote?QuoteId=${newId}&clientId=${clientId}`);
        toast.success(`Quote duplicated as #${newId}`);
    };

    const handleDownloadQuote = () => {
        window.print();
    };

    const handleMarkAsDraft = () => {
        const updated = quotes.map((q: any) => 
            q.id === quoteId ? { ...q, status: 'DRAFT' } : q
        );
        dispatch(setQuotes(updated));
        toast.info("Quote status changed to Draft.");
    };

    const handleClose = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            window.close();
            // Fallback for browsers
            toast.warn("This window was opened directly. You can now close this tab.");
        }
    };

    if (!quote) {
        return (
            <div className='min-h-screen flex flex-col'>
                <Navbar guestLabel="Quote Not Found" />
                <div className='flex-1 flex items-center justify-center'>
                    <div className='text-center'>
                        <h2 className='text-xl font-semibold'>Quote not found</h2>
                        <p className='text-gray-500'>The quote ID {quoteId} does not exist or was deleted.</p>
                        <button 
                            onClick={handleClose}
                            className="text-[#01B0E9] hover:underline mt-4 inline-block font-medium"
                        >
                            Close Tab
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen h-full inter w-full flex flex-col items-start bg-[#FAFAFA] text-black print:bg-white'>
            <div className="print:hidden w-full">
               <Navbar guestLabel={`Quote: #${quoteId}`} />
            </div>
            <div className='container w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 flex flex-col gap-4'>
                <div className='border-b-2 border-b-gray-200 flex justify-between items-center print:hidden'>
                    <div>
                      <h1 className='text-2xl font-semibold text-black '>
                        Quote-{quoteId} <span className="text-sm font-normal text-gray-500 ml-2">({quote.status || 'DRAFT'})</span>
                      </h1>
                      <div className='flex items-center mt-2 text-[#a3a3a3] text-sm sm:text-base md:text-base lg:text-sm font-medium mb-2 sm:mb-3 md:mb-4'>
                          <Link href={`/jobProfile?id=${clientId}`} className="hover:text-gray-900 transition-colors">Job Overview</Link>
                          <span className="mx-2">|</span>
                          <span>Quotes</span>
                          <span className="mx-2">|</span>
                          <span className="text-black font-semibold">Quote-{quoteId}</span>
                      </div>
                    </div>
                    {quote.status === 'SENT' && (
                        <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                            Sent {new Date(quote.sentAt).toLocaleDateString()}
                        </div>
                    )}
                </div>
                
                <div className="print:hidden">
                    <h1 className='text-xl font-semibold'>Payment Schedule</h1>
                    <p className='text-sm text-gray-400'>Assign a payment schedule to this Quote</p>
                    
                    <div className='space-y-3 border-1 border-gray-200 rounded-xl mb-5'>
                        <div className='bg-white p-6 rounded-xl shadow-sm'>
                            <SplitInvoicePayment payments={payments} totalDue={totalAmount.toString()} />
                            <div className='w-full text-right mt-4'>
                                <h3 className='text-lg font-bold'>Balance Due: ${totalAmount.toFixed(2)}</h3>
                            </div>
                            <div className='bg-[#E5F7FD] mt-6 p-4 rounded-lg'>
                                <InvoiceSend 
                                    onSendInvoice={handleSendQuote} 
                                    onDelete={handleDeleteQuote}
                                    onDuplicate={handleDuplicateQuote}
                                    onDraft={handleMarkAsDraft}
                                    onDownload={handleDownloadQuote}
                                    type='Quote' 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='my-3 w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none'>
                    <InvoiceMeta 
                        id={quoteId} 
                        issueDate={new Date(quote.createdAt || Date.now()).toLocaleDateString()} 
                        type='Quote'
                        from="Velofolio" 
                        invoiceFor={client ? `${client.name}\n${client.email}\n${client.phone}\n${client.address}` : "Client details not available"} 
                    />

                    <div className='my-10'>
                        <h1 className='text-xl my-4 font-semibold'>Quote Detail</h1>
                        <div className='w-full border-b border-gray-200 overflow-x-auto'>
                            <InvoiceTable items={packages} onDelete={() => { }} onDuplicate={() => { }} />
                        </div>
                        <div className='flex items-center justify-end mt-6'>
                            <div className='w-full max-w-sm'>
                                <InvoicePriceData invoices={packages} totalDue={totalAmount.toFixed(2)} />
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 pt-8 border-t border-gray-100'>
                        <SplitInvoicePayment payments={payments} totalDue={totalAmount.toFixed(2)} />
                        <div className='w-full text-right mt-4'>
                            <h3 className='text-lg font-bold'>Balance Due: ${totalAmount.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center my-10 print:hidden">
                    <button 
                        onClick={handleClose}
                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Close View
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuoteViewPage;