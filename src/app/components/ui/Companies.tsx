import Image from 'next/image'
import React from 'react'
import { BiPlus } from 'react-icons/bi'

const Companies = ({companies}:any) => {
  return (
       <div className='text-black'>
          <h1 className='mb-2'>Companies </h1>
   { companies?.length==0 &&   (   <div className='flex items-center gap-3 bg-[#E5F7FD] p-4'>
            <Image alt='0' src="/images/logo2.png" width={100} height={100} className="w-9 h-9 object-contain  bg-white   " />
            <h1>Velofolio</h1>
          </div>)}
          <div className=' max-h-40 overflow-y-auto flex flex-col gap-1 mt-3 scroller'>
{
  companies?.map((company:any)=>{
    return(
      <div className='flex items-center gap-3 bg-[#E5F7FD] p-4'>
        <Image alt='0' src="/images/logo2.png" width={100} height={100} className="w-9 h-9 object-contain  bg-white   " />
        <h1>{company.name}</h1>
      </div>
    )
  })
}

          </div>
          
          <div>
 
          </div>
        </div>
  )
}

export default Companies