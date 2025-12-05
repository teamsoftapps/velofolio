
import React, { useState } from 'react'
import AddButton from '../AddButton'
import { InfoIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import InvoiceTable from './InvoiceTable'
import InvoicePriceData from './InvoicePriceData'
import SplitInvoicePayment from './SplitInvoicePayment'
import PremiumPortraitPackage from '../PremiumPortraitPackage'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoices } from '@/store/slices/invoiceSlice'

const ProductsPackage = ({ id,setOpenForm,type="Invoice" ,packages}: any) => {
  const dispatch=useDispatch()
  const searchParams = useSearchParams();
  const clientId = Number(searchParams.get("clientId") || searchParams.get("id"));

  const invoiceId=String(searchParams.get("InvoiceId"));
const invoices = useSelector((state: any) => state.invoiceandQuote.invoices);
  const router = useRouter()
  const packagesData = [
  {
    id: 1,
    title: "Premium Portrait Package",
    price: 1999,
    description:
      "A deluxe package created for families wanting timeless wall art and keepsake prints.",
    features: [
      "1.5-hour outdoor or studio session",
      "All best photos (40+ fully edited)",
      '2x Medium 16" x 24" canvases',
      '10x 5" x 7" premium matte prints',
      "Custom USB with all images",
    ],
    recommended: false,
    amount: 1999,
    taxLabel: "No Tax",
  },

  {
    id: 2,
    title: "Family Golden Package",
    price: 1299,
    description:
      "Perfect for small families wanting beautifully curated images for albums and frames.",
    features: [
      "1-hour outdoor or studio session",
      "25 fully edited photos",
      '1x Large 24" x 36" canvas',
      '5x 8" x 10" premium prints',
      "Online gallery for downloads",
    ],
    recommended: false,
    amount: 1299,
    taxLabel: "No Tax",
  },

  {
    id: 3,
    title: "Essential Portrait Package",
    price: 799,
    description:
      "A simple and affordable package for individuals or couples wanting memorable photos.",
    features: [
      "45-minute outdoor session",
      "15 edited photos",
      '1x Medium 18" x 24" print',
      "Online gallery for viewing",
      "Fast 3-day delivery",
    ],
    recommended: false,
    amount: 799,
    taxLabel: "No Tax",
  },
];
  const [apackages, setPackages] = useState<any[]>(packagesData);


  const handleRecommended = (id: any) => {
  const updatedPackages = apackages.map((item: any) => ({
    ...item,
    recommended: item.id === id, // only this one becomes true
  }));

  setPackages(updatedPackages);
};

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
  dispatch(setInvoices(updatedInvoices));
}
const duplicateInvoice = (id:any) =>{
  console.log(invoices.find((invoice: any) => invoice.id === id))
  const updatedInvoices = [...invoices, {...invoices.find((invoice: any) => invoice.id === id)}];
  dispatch(setInvoices(updatedInvoices));
}
// const totalDue=invoices.reduce((total:any,invoice:any) => total + invoice.amount, 0)  
const totalDue="4999.00"
const [totalDues, setTotalDue] = React.useState(totalDue);
const handleSaveInvoice = () => {
  if (packages.length === 0) return alert("Add at least one package");

  // create invoice object
  const invoice = {
    id: Math.random().toString(36).substring(2, 9),
    clientId: id,
    packages: packages,
    totalAmount: packages.reduce(
      (sum:any, pkg:any) => sum + parseFloat(pkg.totalAmount || 0),
      0
    ),
  };

  // save to redux
  dispatch(setInvoices([...invoices, invoice]));

  // redirect to view page
  router.push(`/viewInvoice?InvoiceId=${invoice.id}&clientId=${id}`);
};
  return (
    <div className='flex flex-col gap-4 text-black pt-4 my-3 px-4 sm:px-6 lg:px-0'>
      
      {/* Header */}
      <div>
        <h1 className='text-2xl mb-2'>Products & Packages</h1>
        <h3 className='text-gray-500 text-sm'>Add products and packages to this {type}.</h3>
      </div>

      {/* Empty State */}
     
       {packages?.length === 0 ?  (
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
        :<div className='w-full'>
             <div className={`w-full rounded-lg bg-white ${type==="Invoice" ?" border-2 sm:h-80": ""} border-[#978F8F]   text-center lg:p-4 lg:px-12 overflow-y-scroll scroller`}>
     { type==="Invoice" ? <InvoiceTable  items={packages} onDelete={deleteInvoice}  onDuplicate={duplicateInvoice}/>:<>
     <div className='flex items-center justify-between sm:justify-start  gap-7 w-[100%] bg-red-300 grow-1 p-2 overflow-x-scroll pt-5'>
    
      {
        apackages.map((pkg, index) => (
          <PremiumPortraitPackage
          id={pkg.id}
          key={index}
  title={pkg.title}
  price={pkg.price}
  description={pkg.description}
  recommended={pkg.recommended}
  features={pkg.features}
  handleRecommended={handleRecommended}
 
/>
        ))
      }
      


     </div>
     
     </>}
   
        </div>
        <div className='flex flex-col gap-3 sm:flex-row   justify-between'>
           <div className='w-full sm:w-60 mt-4'>
            <AddButton title='Add Products & Packages' setOpenForm={setOpenForm} />
          </div>
          <InvoicePriceData invoices={packages} />
        </div>
        
        
        
        
        </div>
      
        }

      {/* Payment Schedule Card */}
      <div className="w-full  rounded-lg sm:p-6 space-y-6">
        
        {/* Header + Totals */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
            <p className="text-sm text-gray-500 mt-1">Assign a payment schedule to this {type}.</p>
          </div>

      { packages?.length === 0 &&   <InvoicePriceData invoices={invoices} totalDue={totalDues} />}
      
        </div>

        {/* Dropdown + Total */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className="w-full sm:w-2/5">
            <select className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
              <option>No split payments</option>
            </select>
          </div>

         {packages?.length === 0 || totalDues.length === 0 && <div className="flex justify-between gap-3 border-t sm:border-t-0 border-gray-200 pt-2 sm:pt-0 w-full sm:w-auto">
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
 {type==="Quote" && <>
        <div className='p-3 '>
 
          
<div className="flex items-center gap-3">
  <label className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="w-4 h-4 rounded border border-gray-400 cursor-pointer bg-gray-200 checked:bg-[#01B0E9] checked:border-[#01B0E9]
                 appearance-none relative
                  before:absolute before:inset-0 before:flex before:items-center before:justify-center 
                 before:opacity-0 before:text-white before:text-sm before:content-['✔'] checked:before:opacity-100"
    />
    <span className="ml-2">Automatically generate an invoice once the quote is accepted.</span>
  </label>
</div>

         
          <div className='flex items-center gap-3'>
                <input
      type="checkbox"
      className="w-4 h-4 rounded border border-gray-400 cursor-pointer bg-gray-200 checked:bg-[#01B0E9] checked:border-[#01B0E9]
                 appearance-none relative
                  before:absolute before:inset-0 before:flex before:items-center before:justify-center 
                 before:opacity-0 before:text-white before:text-sm before:content-['✔'] checked:before:opacity-100"
    />
            <p> Show in Client Portal</p>
          </div>

        </div>

  <hr className='text-gray-300' />
  </>}
        {/* Buttons */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:w-2/3'>
          <button className='w-full sm:w-40 bg-[#01B0E9] text-white py-3 rounded-full mb-2 sm:mb-0' onClick={handleSaveInvoice}>Save {type}</button> 
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
