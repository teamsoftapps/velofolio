import React from 'react'
import {HiLightBulb} from 'react-icons/hi'
const FooterUtilizPerfom = ({title}:any) => {
  return (
         <div className='my-3 flex items-center justify-between'>
        <p className='flex  items-center text-xs sm:text-sm rounded-full w-72 px-2 bg-[#E5F7FD]'><HiLightBulb className='w-4 h-4 mr-2' />
     Average {title} increased by 5%</p>
     <button className='text-[#19B7EB] text-sm  sm:text-md'>
    
        View Full Report
     </button>
          </div>
  )
}

export default FooterUtilizPerfom