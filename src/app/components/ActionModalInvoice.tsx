import React from 'react'

const ActionModalInvoice = ({deleteInvoice,duplicate}:any) => {
    // console.log(id);
  return (
     <div className='bg-white w-40 absolute right-3 top-8 flex flex-col p-3  justify-start gap-1 border border-gray-300  shadow-md rounded-xl text-left inter'>
                <button className='hover:bg-gray-100 cursor-pointer transition-all ease-in-out p-1.5 w-full text-left'>Edit </button>
                <button className='hover:bg-gray-100 cursor-pointer transition-all ease-in-out p-1.5 w-full text-left'>Duplicate </button>
                <button className='text-red-500 hover:bg-gray-100 cursor-pointer transition-all ease-in-out p-1.5 text-left w-full rounded-2xl' onClick={deleteInvoice}>Delete Invoice</button>
              </div>
  )
}

export default ActionModalInvoice