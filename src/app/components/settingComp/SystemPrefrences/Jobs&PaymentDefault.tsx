import React from 'react'

const JobsPayment = () => {
  return (
    <div className='lg:w-3xl w-full bg-white p-6 border border-[#E0E0E2] rounded-2xl '>
        <h1 className='text-xl mb-7'>Jobs & Payment Default</h1>
        <div className='w-full space-y-7  p-4'>
            <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>Default Payment Due </h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">English US</option>
                    <option value="english">Chinese</option>
                    <option value="english">English UK</option>
                </select>
            </div>


               <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>Late Fee</h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">5%</option>
                    <option value="english">10%</option>
                
                </select>
            </div>


               <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>Default tax Rate </h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">10&</option>
                    <option value="english">5%</option>
                                   </select>
            </div>


               <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>Invoice Number Format </h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">2025-INV-001</option>
                    <option value="english">2025-INV-001</option>
                    <option value="english">INV-001-2025</option>
                </select>
            </div>


               <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>Default Payment Method</h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">Stripe</option>
                    {/* <option value="english">Goo</option>
                    <option value="english">Teusday</option> */}
                </select>
            </div>
        </div>
      
    </div>
  )
}

export default JobsPayment
