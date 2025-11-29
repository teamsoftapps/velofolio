import React from 'react'
import { SlOptions } from "react-icons/sl";
import { BsSend } from "react-icons/bs";
import { useRouter } from 'next/navigation';

const InvoiceCard = () => {
  const router = useRouter()
  return (
    <div className='h-32 bg-[#F4F4F5] w-full text-black p-3 rounded-2xl inter'>
        <div className='flex items-center justify-between'>
            <div className='space-y-2 text-sm inter'>
                <h2>Invoice 3c779b</h2>
                <h2>Next Payment Due 10 October 2025 (1 day left)</h2>
            </div>

        <div className='space-y-2 text-sm'>
             <h2>Total: $4999.00</h2>
                <h2>Balance Due: $4999.00</h2>
        </div>

        </div>


        <div className='flex items-center justify-between mt-3 '>
            <div className='flex items-center gap-4'>
                 <button onClick={()=>router.push("/addInvoice?id=1")} className='cursor-pointer rounded-4xl  p-1 border-[#01B0E9] border-1  flex items-center gap-2 px-3'><BsSend className='w-4 h-4'/><span> View</span></button>
                  <button className='cursor-pointer rounded-4xl  p-1 border-[#01B0E9] border-1  flex items-center gap-2 px-3'><BsSend className='w-4 h-4'/><span>Send</span> </button>
            </div>
            <button className='cursor-pointer rounded-full  p-2 border-[#01B0E9] border-1 '><SlOptions className='w-4 h-4'/> </button>
        </div>


    </div>
  )
}

export default InvoiceCard