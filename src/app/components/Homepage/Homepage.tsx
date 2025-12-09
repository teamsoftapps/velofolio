import React from 'react'
import NavHomePage from './NavHomePage'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'
import FourStepsSection from './StepsView'
import ManagementView from './ManagementView'
import Letter from './Letter'

const Homepage = () => {
  return (<>
    <div className='w-full bg-white mx-auto  h-full '>
      <NavHomePage/>
      <div className='mt-10 container mx-auto  py-1 flex flex-col  items-center gap-10 sm:gap-24 px-4 sm:px-6 lg:px-24'>
         <Hero/>
         <Features/>

      </div>
<div className='w-full bg-[#E5F7FD]'>
  <div className='container mx-auto py-20 flex flex-col items-center gap-24 px-4 sm:px-6 lg:px-24'>
    <FourStepsSection />
    <ManagementView />
  </div>
</div>
  <div className=' container mx-auto  py-14 flex flex-col  items-center gap-24 px-4 sm:px-6 lg:px-24'>
       <Letter/>

      </div>


     <Footer/>

    </div>
    </>
  )
}

export default Homepage