import React from 'react'

const InvoiceMeta = ({id, issueDate, from, invoiceFor,type="Invoice"}:any) => {
  return (
       <div className='top flex flex-col gap-3 sm:flex-row justify-between '>
        <div>
<h2>{type} Id : {id}</h2>
<h2>Issue Date : {issueDate}</h2>
        </div>
        <div className='sm:w-2/8'>
          <h2>From : {from}</h2>
          <div className='flex flex-col lg:flex-row gap-3 w-full '>
            <h2>{type} For:</h2>
            <h2 className='sm:w-54'>{invoiceFor}</h2>
          </div>

        </div>
      </div>
  )
}

export default InvoiceMeta