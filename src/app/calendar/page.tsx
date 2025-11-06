"use client"
import React, { useState } from 'react'
import Calendar from '../components/Calender'
import CalenderHeader from '../components/CalenderHeader'
import Navbar from '../components/Navbar'
import DateNavBar from '../components/DateNavbar'
import FilterModal from '../components/FilterModal'
const page = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  
  return (
    <div className='w-full bg-[#FaFaFA]'>
        <Navbar />
             <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            isVisible={openFilter}
            setIsVisible={setOpenFilter}
            
          />

   <div className='min-h-screen  w-full flex flex-col items-start bg-[#FAFAFA] pb-10'>
        <div className='container mx-auto w-[100%] h-full'>
        <CalenderHeader  />
        {/* <DateNavBar/> */}

     
        <Calendar  setOpenFilter={setOpenFilter}/>
    </div>
    </div>
   </div>
   )
}

export default page