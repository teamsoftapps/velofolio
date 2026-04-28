import React, { useState } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';

const FileAutomation = () => {
  const [allowUpload, setAllowUpload] = useState(true);
  const [autoSendInvoice, setAutoSendInvoice] = useState(true);
  const [autoSendQuote, setAutoSendQuote] = useState(true);
  const [autoRemind, setAutoRemind] = useState(true);

  return (
    <div className='lg:w-3xl w-full bg-white p-6 rounded-2xl border border-[#E0E0E2]'>
        <h1 className='text-xl mb-7'>File Automation</h1>
        <div className='w-full space-y-7  p-4'>
            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border-1 rounded-md px-4 py-2'>
                <h3  className='flex items-center gap-3 '>Allow Clients Upload</h3>
                  <button
              onClick={() => setAllowUpload(!allowUpload)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                allowUpload ? "bg-[#01B0E9]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  allowUpload ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            </div>
            
            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border-1 rounded-md px-4 py-2'>
                <h3  className='flex items-center gap-3 '>Auto Send Invoice Email</h3>
                  <button
              onClick={() => setAutoSendInvoice(!autoSendInvoice)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSendInvoice ? "bg-[#01B0E9]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSendInvoice ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            </div>

            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border-1 rounded-md px-4 py-2'>
                <h3  className='flex items-center gap-3 '>Auto Send Quote Email</h3>
                  <button
              onClick={() => setAutoSendQuote(!autoSendQuote)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSendQuote ? "bg-[#01B0E9]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSendQuote ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            </div>
            
            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border-1 rounded-md px-4 py-2'>
                <h3  className='flex items-center gap-3 '>Auto remind OverDue</h3>
                  <button
              onClick={() => setAutoRemind(!autoRemind)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoRemind ? "bg-[#01B0E9]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoRemind ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            </div>

               <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>Remind me after </h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">3 Days</option>
                    <option value="english">5 Days</option>
                    <option value="english">7 Days</option>
                </select>
            </div>
               <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>Max File upload Size</h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">50MB</option>
                    <option value="english">30MB</option>
                    <option value="english">10MB</option>
                </select>
            </div>
         
        </div>
      
    </div>
  )
}

export default FileAutomation
