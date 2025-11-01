import React from 'react'
import Calendar from '../components/Calender'
import CalenderHeader from '../components/CalenderHeader'
import Navbar from '../components/Navbar'
import DateNavBar from '../components/DateNavbar'
const page = () => {
  return (
    <div className='w-full'>
        <Navbar />
        
   <div className='min-h-screen  w-full flex flex-col items-start bg-[#FAFAFA]'>
        <div className='container mx-auto w-[100%] h-[80vh]'>
        <CalenderHeader  />
        {/* <DateNavBar/> */}

     
        <Calendar />
    </div>
    </div>
   </div>
   )
}

export default page