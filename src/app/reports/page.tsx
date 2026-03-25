"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ReportHeader from '../components/reportComp/ReportHeader'
import ReportGraph from '../components/reportComp/ReportGraph'
import ReportPiChart from '../components/reportComp/ReportPiChart'
import TeamUtilization from '../components/reportComp/TeamUtilization'
import TopPerfomingProject from '../components/reportComp/TopPerfomingProject'
import ReportDropdown from '../components/ReportDropDown'
const reports = () => {
  const [currentView, setCurrentView] = useState<'leads' | 'jobs' | 'payments'>('leads');
  return (
    <div className='flex flex-col w-full min-h-screen bg-[#FAFAFA]  pb-24'>
      <Navbar />

      <div className='container mx-auto  w-[100%] h-full  '>
        <ReportHeader />
        {/* <div className="md:px-2 mt-6 mb-6">
          <ReportDropdown onViewChange={setCurrentView} />
        </div> */}
        <div className='charts md:px-2  flex gap-3  md:gap-10 w-full flex-col  lg:flex-row  items-center justify-between mt-10 overflow-hidden'>
          <div className=' w-full sm:w-2/3 md:w-full lg:w-2/3 border border-gray-200 bg-white overflow-hidden'>
            <ReportGraph />


          </div>
          <ReportPiChart />






        </div>
        {/* <div className="tables md:px-2  flex-col lg:flex-row flex items-center  justify-between mt-10 w-full">
              <div className='w-full sm:w-1/2 md:w-3/3 lg:w-[49%]'>
                <TeamUtilization/>
              </div>
                  <div className='w-full sm:w-1/2 md:w-3/3 lg:w-[49%]'>

                <TopPerfomingProject />
</div>


              </div> */}
      </div>



    </div>
  )
}

export default reports