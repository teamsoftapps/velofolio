// import React from 'react'
// import AddButton from './AddButton'
// import { InfoIcon } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// const ProductsPackage = ({id}:any) => {
//     const router = useRouter() 
//   return (
//     <div className='flex flex-col gap-4 text-black pt-4 my-3'>
//     <div>
//     <h1 className='text-2xl mb-2'>Produts & Packages</h1>
//     <h3 className='text-[#71717A]'>Add products and packages to this invoice.</h3>
//     </div>
//     <div className='w-full rounded-lg bg-[#EDEDED] border-2 border-[#978F8F] h-80 flex flex-col items-center justify-center text-center '>
// <div className='flex items-center justify-center flex-col gap-2'>
//     <h1 className='text-xl font-semibold'>Start Adding Items to your Invoice</h1>
//     <p className='w-2/3 text-center'>You currently don’t have any product or package add to your Invoice. Click the button below to start adding them.</p>
//     <div className='w-60'>
//     <AddButton title='Add Products & Packages' setOpenForm={()=>console.log('')} />

//     </div>
// </div>
//     </div>
//     <div className="w-full bg-white rounded-lg p-6 space-y-6">
//   {/* Header + Totals */}
//   <div className="flex justify-between  md:flex-row flex-col items-start">
//     <div>
//       <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
//       <p className="text-sm text-gray-500 mt-1">Assign a payment schedule to this invoice.</p>
//     </div>

//     <div className="text-right space-y-2 w-2/8">
//       <div className=" flex items-center  justify-between gap-3 ">
//         <span className=" text-black text-lg font-semibold">Subtotal</span>
//         <span className="text-lg font-medium text-gray-900">$0.00</span>
//       </div>
//       <div className="flex items-center justify-between gap-3">
//         <span className="text-lg font-semibold text-cyan-600 cursor-pointer hover:underline">Discount</span>
//         <span className="text-lg font-medium text-gray-900">None</span>
//       </div>
      
//     </div>
//   </div>

//   {/* Dropdown */}
//   <div className='flex items-start lg:items-center lg:flex-row flex-col-reverse justify-between'>

//   <div className="lg:w-2/5 w-full" >
//     <select className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  cursor-pointer">
//       <option>No split payments</option>
//     </select>
//   </div>

//     <div className="lg:w-2/8 flex items-center justify-between gap-3 pt-2 border-t border-gray-200">
//         <span className="text-lg font-semibold text-gray-900">Total Due</span>
//         <span className="text-lg font-semibold text-gray-900">$0.00</span>
//       </div>
//   </div>


//   {/* Info Alert */}
//   <div className="bg-cyan-50 rounded-4xl border border-cyan-200 text-cyan-800  lg:w-2/4 px-4 py-3 flex items-start gap-3">
//     {/* <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//     </svg> */}
//     <InfoIcon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
//     <p className="text-sm">
//       A payment schedule cannot be calculated because the total amount due is $0.00.
//     </p>
//   </div>
// <hr className='text-gray-300' />
// <div className='lg:w-2/3 gap-2 flex items-center'>
//     <button className='cursor-pointer w-40 bg-[#01B0E9] text-white py-3 rounded-full'>Save Invoice</button> 
//     <button onClick={()=>router.push(`/jobProfile?id=${id}`)} className='cursor-pointer w-32 border-1 px-5  text-black border-gray-400 py-3 rounded-4xl'>Cancel</button>
// </div>


// </div>

// </div>
//   )
// }

// export default ProductsPackage
import React from 'react'
import AddButton from './AddButton'
import { InfoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ProductsPackage = ({ id }: any) => {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-4 text-black pt-4 my-3 px-4 sm:px-6 lg:px-0'>
      
      {/* Header */}
      <div>
        <h1 className='text-2xl mb-2'>Products & Packages</h1>
        <h3 className='text-gray-500 text-sm'>Add products and packages to this invoice.</h3>
      </div>

      {/* Empty State */}
      <div className='w-full rounded-lg bg-[#EDEDED] border-2 border-[#978F8F] h-80 flex flex-col items-center justify-center text-center px-4'>
        <div className='flex items-center justify-center flex-col gap-2'>
          <h1 className='text-xl font-semibold'>Start Adding Items to your Invoice</h1>
          <p className='w-full sm:w-2/3 text-center text-sm'>
            You currently don’t have any product or package added to your Invoice. Click the button below to start adding them.
          </p>
          <div className='w-full sm:w-60 mt-4'>
            <AddButton title='Add Products & Packages' setOpenForm={() => console.log('')} />
          </div>
        </div>
      </div>

      {/* Payment Schedule Card */}
      <div className="w-full bg-white rounded-lg p-6 space-y-6">
        
        {/* Header + Totals */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
            <p className="text-sm text-gray-500 mt-1">Assign a payment schedule to this invoice.</p>
          </div>

          <div className="text-right space-y-2 w-full md:w-auto">
            <div className="flex justify-between gap-3">
              <span className="text-black text-lg font-semibold">Subtotal</span>
              <span className="text-lg font-medium text-gray-900">$0.00</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-lg font-semibold text-cyan-600 cursor-pointer hover:underline">Discount</span>
              <span className="text-lg font-medium text-gray-900">None</span>
            </div>
          </div>
        </div>

        {/* Dropdown + Total */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className="w-full sm:w-2/5">
            <select className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
              <option>No split payments</option>
            </select>
          </div>

          <div className="flex justify-between gap-3 border-t sm:border-t-0 border-gray-200 pt-2 sm:pt-0 w-full sm:w-auto">
            <span className="text-lg font-semibold text-gray-900">Total Due</span>
            <span className="text-lg font-semibold text-gray-900">$0.00</span>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-cyan-50 rounded-4xl border border-cyan-200 text-cyan-800 w-full px-4 py-3 flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            A payment schedule cannot be calculated because the total amount due is $0.00.
          </p>
        </div>

        <hr className='text-gray-300' />

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:w-2/3'>
          <button className='w-full sm:w-40 bg-[#01B0E9] text-white py-3 rounded-full mb-2 sm:mb-0'>Save Invoice</button> 
          <button 
            onClick={() => router.push(`/jobProfile?id=${id}`)} 
            className='w-full sm:w-32 border border-gray-400 text-black py-3 rounded-full'
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductsPackage
