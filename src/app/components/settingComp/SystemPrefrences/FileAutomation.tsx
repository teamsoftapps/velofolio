import React, { useState } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';

const FileAutomation = () => {
  const [allowUpload, setAllowUpload] = useState(true);
  const [autoSendInvoice, setAutoSendInvoice] = useState(true);
  const [autoSendQuote, setAutoSendQuote] = useState(true);
  const [autoRemind, setAutoRemind] = useState(true);

  return (
    <div className='w-full bg-white p-6 rounded-2xl border border-[#E0E0E2]'>
        <h1 className='text-xl mb-7'>File Automation</h1>
        <div className='w-full space-y-7  p-4'>
            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between w-full border-1 rounded-md px-4 py-3 gap-4'>
                <h3 className='flex items-center gap-3 flex-1'>
                  <span className="leading-snug">Allow Clients Upload</span>
                </h3>
                <div className="flex shrink-0">
                  <button
                    onClick={() => setAllowUpload(!allowUpload)}
                    className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
            </div>
            
            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between w-full border-1 rounded-md px-4 py-3 gap-4'>
                <h3 className='flex items-center gap-3 flex-1'>
                  <span className="leading-snug">Auto Send Invoice Email</span>
                </h3>
                <div className="flex shrink-0">
                  <button
                    onClick={() => setAutoSendInvoice(!autoSendInvoice)}
                    className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
            </div>

            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between w-full border-1 rounded-md px-4 py-3 gap-4'>
                <h3 className='flex items-center gap-3 flex-1'>
                  <span className="leading-snug">Auto Send Quote Email</span>
                </h3>
                <div className="flex shrink-0">
                  <button
                    onClick={() => setAutoSendQuote(!autoSendQuote)}
                    className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
            </div>
            
            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between w-full border-1 rounded-md px-4 py-3 gap-4'>
                <h3 className='flex items-center gap-3 flex-1'>
                  <span className="leading-snug">Auto remind OverDue</span>
                </h3>
                <div className="flex shrink-0">
                  <button
                    onClick={() => setAutoRemind(!autoRemind)}
                    className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
            </div>

               <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                <h3 className='text-lg mb-2 sm:mb-0'>Remind me after </h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
                    <option value="english">3 Days</option>
                    <option value="english">5 Days</option>
                    <option value="english">7 Days</option>
                </select>
            </div>
               <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                <h3 className='text-lg mb-2 sm:mb-0'>Max File upload Size</h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
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
