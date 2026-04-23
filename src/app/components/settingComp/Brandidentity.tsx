import React from 'react'

const Brandidentity = () => {
  return (
    <div  className='w-full bg-white border-[#D4D4D8] border-1 p-8 lg:max-w-2xl rounded-3xl h-full'>
        <h1 className='text-xl font-medium'>Brand Identity</h1>
        <div className='py-6 space-y-3'>
    <div className='lg:flex-nowrap flex-wrap w-full flex items-center justify-between'>
        <h3 className='text-lg'>Primary Color</h3>
        <input type="text" value={"#657BBC"} readOnly  className='w-40 px-2 py-1.5 bg-[#F4F4F5] border-[#D4D4D8]  rounded-sm border-1 '/>
    </div>
        <div className='lg:flex-nowrap flex-wrap w-full flex items-center justify-between'>
        <h3 className='text-lg'>Secondary Color</h3>
        <input type="text" value={"#9BD1A4"} readOnly  className='w-40 px-2 py-1.5 bg-[#F4F4F5] border-[#D4D4D8]  rounded-sm border-1 '/>
    </div>
        <div className='lg:flex-nowrap flex-wrap w-full flex items-center justify-between'>
        <h3 className='text-lg'>Accent Color</h3>
        <input type="text" value={"#F0666F"} readOnly  className='w-40 px-2 py-1.5 bg-[#F4F4F5] border-[#D4D4D8]  rounded-sm border-1 '/>
    </div>


        </div>
        <div className='relative'>
 <div className="relative border-2 border-[#01B0E9] rounded-2xl overflow-hidden w-full h-[380px] my-2">
  {/* Scaled Desktop Preview */}
    
  <div className="absolute top-0 left-0 origin-top-left scale-[0.43] overflow-hidden">
    <iframe
      src="https://velofolio-one.vercel.app/jobs"
      title="Desktop Website Preview"
      width="1440"
      height="900"
      className="border-0"
    />
  </div>


</div>
<span className="bg-[#01B0E9] absolute -bottom-2 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-sm z-10">
    LIVE PREVIEW
  </span>
</div>
        
        
        
        
        </div>
  )
}

export default Brandidentity