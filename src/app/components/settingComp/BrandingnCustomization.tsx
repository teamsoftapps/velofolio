import React from 'react'
import Brandidentity from './Brandidentity'
import ClientCustomization from './ClientCustomization'

const BrandingnCustomization = () => {
  return (
        <div className='text-black h-full'>
               <div className="header w-full my-10 ">
        

            <h1 className='text-xl'>Branding & Customization</h1>
            <p className='mt-3 text-md text-[#71717A]'>Customize your studio identity ,client documnets and portal appearance.</p>
            </div>

            <div className="cards w-full flex lg:flex-row flex-col sm:items-start justify-between gap-2 ">
                <Brandidentity />
                <ClientCustomization />
            </div>
            <div className="w-full flex justify-center my-3  lg:my-4">
                <div>
                <button className="bg-[var(--primary-color)] cursor-pointer text-white px-4 py-2 rounded-full mr-2">Save Branding</button>
                <button className="bg-[#F4F4F5] cursor-pointer text-black px-4 py-2 rounded-full border-[#c3c3c7] border-1">Reset to Default</button>
                </div>
            </div>

       

    </div>
  )
}

export default BrandingnCustomization
