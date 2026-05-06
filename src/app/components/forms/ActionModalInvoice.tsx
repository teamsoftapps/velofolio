import React from 'react'

const ActionModalInvoice = ({ deleteInvoice, duplicate, edit }: any) => {
  return (
    <div className='bg-white w-40 absolute right-3 top-8 flex flex-col p-2 justify-start gap-1 border border-gray-200 shadow-xl rounded-xl text-left inter z-[100]'>
      <button 
        onClick={edit}
        className='hover:bg-gray-100 cursor-pointer transition-all p-2 w-full text-left rounded-lg text-sm font-medium'
      >
        Edit
      </button>
      <button 
        onClick={duplicate}
        className='hover:bg-gray-100 cursor-pointer transition-all p-2 w-full text-left rounded-lg text-sm font-medium'
      >
        Duplicate
      </button>
      <button 
        onClick={deleteInvoice}
        className='text-red-500 hover:bg-red-50 cursor-pointer transition-all p-2 text-left w-full rounded-lg text-sm font-medium'
      >
        Delete Invoice
      </button>
    </div>
  )
}

export default ActionModalInvoice
