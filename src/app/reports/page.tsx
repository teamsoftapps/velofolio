"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ReportHeader from '../components/reportComp/ReportHeader'
import ReportGraph from '../components/reportComp/ReportGraph'
import ReportPiChart from '../components/reportComp/ReportPiChart'
import TeamUtilization from '../components/reportComp/TeamUtilization'
import TopPerfomingProject from '../components/reportComp/TopPerfomingProject'
import ReportDropdown from '../components/ReportDropDown'
import { DateValue, parseDate } from "@internationalized/date";

const reports = () => {
  const [selectedView, setSelectedView] = useState<'leads' | 'jobs' | 'payments'>('leads');
  const [selectedTab, setSelectedTab] = useState<'All' | 'Leads' | 'Shoots' | 'Revenue'>('All');
  
  // --- Centralized Time State ---
  const [timeRange, setTimeRange] = useState('7 Days');
  const [calendarValue, setCalendarValue] = useState<DateValue>(parseDate("2026-03-26"));

  return (
    <div className='flex flex-col w-full min-h-screen bg-[#FAFAFA] pb-24'>
      <Navbar />

      <div className='container mx-auto w-[100%] h-full'>
        <ReportHeader 
          timeRange={timeRange} 
          setTimeRange={setTimeRange} 
          value={calendarValue} 
          setValue={setCalendarValue} 
        />
        
        <div className='charts md:px-2 flex gap-3 md:gap-10 w-full flex-col lg:flex-row items-center justify-between mt-10 overflow-hidden'>
          <div className='w-full sm:w-2/3 md:w-full lg:w-2/3 border border-gray-200 bg-white overflow-hidden'>
            <ReportGraph 
              selectedView={selectedView} 
              setSelectedView={setSelectedView} 
              selectedTab={selectedTab} 
              setSelectedTab={setSelectedTab}
              timeRange={timeRange}
            />
          </div>
          <ReportPiChart 
            selectedView={selectedView} 
            timeRange={timeRange}
          />
        </div>

        {/* Tables section could also use timeRange if needed */}
      </div>
    </div>
  )
}

export default reports