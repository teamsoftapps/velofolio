import React from 'react'

const InvoiceMeta = ({id, issueDate, from, invoiceFor}:any) => {
  return (
       <div className='top flex flex-col gap-3 sm:flex-row justify-between '>
        <div>
<h2>Invoice Id : 234c6</h2>
<h2>Issue Date : 12-12-2023</h2>
        </div>
        <div className='sm:w-2/8'>
          <h2>From : Velofolio</h2>
          <div className='flex flex-col lg:flex-row gap-3 w-full '>
            <h2>Invoice For:</h2>
            <h2 className='sm:w-54'>Sarah Wedding Dec 1, 2025 - 2:20 PM to 4:00 PM New York, USA Sarah Johnson sarahjohnson@gmail.com New York, USA 225 Cherry Street #24</h2>
          </div>

        </div>
      </div>
  )
}

export default InvoiceMeta