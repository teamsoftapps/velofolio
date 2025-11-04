import React from 'react'
import Navbar from '../components/Navbar'
import ReportHeader from '../components/ReportHeader'
import ReportGraph from '../components/ReportGraph'
import ReportPiChart from '../components/ReportPiChart'
const reports = () => {
  return (
     <div className='flex flex-col w-full min-h-screen bg-[#FAFAFA]'>
              <Navbar />

              <div className='container mx-auto  w-[100%] h-full  '>
                <ReportHeader />
                <div className='charts flex gap-3  md:gap-10 w-full flex-col  lg:flex-row  items-center justify-between mt-10 overflow-hidden'>
                    <div className=' w-full sm:w-2/3 md:w-full lg:w-2/3 border border-gray-200 bg-white overflow-hidden'>
                    <ReportGraph/>
                    

                    </div>
                        <ReportPiChart/>
               
              
                    

                    

                </div>
              </div>



    </div>
  )
}

export default reports