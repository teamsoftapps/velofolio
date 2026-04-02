"use client"
import React, { useState } from 'react'
import Calendar from '../components/Calender'
import CalenderHeader from '../components/CalenderHeader'
import Navbar from '../components/Navbar'
import DateNavBar from '../components/DateNavbar'
import FilterModal from '../components/FilterModal'
const page = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const [filters, setFilters] = useState({
    status: [],
    selectedMembers: [],
    leadSource: [],
    eventType: [],
    fromDate: "",
    toDate: "",
    paymentStatus: [],
  });




  return (
    <div className='w-full bg-[#FaFaFA]'>
      <Navbar />
      <FilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
        isVisible={openFilter}
        setIsVisible={setOpenFilter}
        onApply={(newfilters) => setFilters(newfilters)}

      />

      <div className='min-h-screen  w-full flex flex-col items-start bg-[#FAFAFA] pb-10 lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto w-[100%] h-full'>
          <CalenderHeader />
          {/* <DateNavBar/> */}


          <Calendar setOpenFilter={setOpenFilter} filters={filters} />
        </div>
      </div>
    </div>
  )
}

export default page