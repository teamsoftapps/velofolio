
import React from 'react'
import AddButton from '../AddButton'
import { InfoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import InvoiceTable from './InvoiceTable'
import InvoicePriceData from './InvoicePriceData'
import SplitInvoicePayment from './SplitInvoicePayment'
import PremiumPortraitPackage from '../PremiumPortraitPackage'

const ProductsPackage = ({ id,setOpenForm,invoices,setInvoices,type="Invoice" }: any) => {
  const router = useRouter()
const examplePayments = [
  {
    id: 1,
    dueDate: "Dec 1, 2025",
    status: "UNPAID",
    percentage: "100% of order",
    amount: "$4999.00",
  },
];
const deleteInvoice = (id:any) =>{
  const updatedInvoices = invoices.filter((invoice: any) => invoice.id !== id);
  setInvoices(updatedInvoices);

  
}
// const totalDue=invoices.reduce((total:any,invoice:any) => total + invoice.amount, 0)  
const totalDue="4999.00"
const [totalDues, setTotalDue] = React.useState(totalDue);
  return (
    <div className='flex flex-col gap-4 text-black pt-4 my-3 px-4 sm:px-6 lg:px-0'>
      
      {/* Header */}
      <div>
        <h1 className='text-2xl mb-2'>Products & Packages</h1>
        <h3 className='text-gray-500 text-sm'>Add products and packages to this {type}.</h3>
      </div>

      {/* Empty State */}
     
       {invoices?.length === 0 ?  (
         <div className='w-full rounded-lg bg-[#EDEDED] border-2 border-[#978F8F] h-80 flex flex-col items-center justify-center text-center px-4'>
        <div className='flex items-center justify-center flex-col gap-2'>
          <h1 className='text-xl font-semibold'>Start Adding Items to your {type}</h1>
          <p className='w-full sm:w-2/3 text-center text-sm'>
            You currently don’t have any product or package added to your {type}. Click the button below to start adding them.
          </p>
          <div className='w-full sm:w-60 mt-4'>
            <AddButton title='Add Products & Packages' setOpenForm={setOpenForm} />
          </div>
      </div>
        </div>
        )
        :<>
             <div className={`w-full rounded-lg bg-white ${type==="Invoice" ?" border-2 h-80": ""} border-[#978F8F]   text-center lg:p-4 lg:px-12 overflow-y-scroll scroller`}>
     { type==="Invoice" ? <InvoiceTable  items={invoices} onDelete={deleteInvoice} />:<>
     <div className='flex items-center justify-between'>
      <PremiumPortraitPackage />

     </div>
     
     </>}
   
        </div>
        <div className='flex flex-col gap-3 sm:flex-row   justify-between'>
           <div className='w-full sm:w-60 mt-4'>
            <AddButton title='Add Products & Packages' setOpenForm={setOpenForm} />
          </div>
          <InvoicePriceData invoices={invoices} />
        </div>
        
        
        
        
        </>
      
        }

      {/* Payment Schedule Card */}
      <div className="w-full  rounded-lg sm:p-6 space-y-6">
        
        {/* Header + Totals */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
            <p className="text-sm text-gray-500 mt-1">Assign a payment schedule to this {type}.</p>
          </div>

      { invoices?.length === 0 &&   <InvoicePriceData invoices={invoices} totalDue={totalDues} />}
      
        </div>

        {/* Dropdown + Total */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className="w-full sm:w-2/5">
            <select className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
              <option>No split payments</option>
            </select>
          </div>

         {invoices?.length === 0 || totalDues.length === 0 && <div className="flex justify-between gap-3 border-t sm:border-t-0 border-gray-200 pt-2 sm:pt-0 w-full sm:w-auto">
            <span className="text-lg font-semibold text-gray-900">Total Due</span>
            <span className="text-lg font-semibold text-gray-900">$0.00</span>
          </div>}
        </div>

        {/* Info Alert */}
     {totalDues.length === 0 ?   <div className="bg-cyan-50 rounded-4xl border border-cyan-200 text-cyan-800 w-full px-4 py-3 flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            A payment schedule cannot be calculated because the total amount due is $0.00.
          </p>
        </div>
        :<>
        <SplitInvoicePayment payments={examplePayments} totalDue={totalDues} />
        </>
      
      }

        <hr className='text-gray-300' />

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:w-2/3'>
          <button className='w-full sm:w-40 bg-[#01B0E9] text-white py-3 rounded-full mb-2 sm:mb-0' onClick={()=>router.push(`/view${type}`)}>Save {type}</button> 
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
