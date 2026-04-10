
/** @format */

'use client';
import Navbar from '../components/Navbar';
import DashboardGraph from '../components/DashboardGraph';
import UpcomingShoots from '../components/UpcomingShoots';
import RecentLeads from '../components/RecentLeads';
import UpcomingPayements from '../components/UpcomingPayements';
import JobTask from '../components/JobTask';
import TeamUtilization from '../components/TeamUtilization';
import RouteGuard from '../components/RouteGuard';
import LeadForm from '../components/LeadFormModel';
import { useState } from 'react';
import { DateValue, parseDate } from "@internationalized/date";

export default function Home() {
  const [OpenForm, setOpenForm] = useState(false);
  const [timeRange, setTimeRange] = useState("All Data");
  const [value, setValue] = useState<DateValue>(parseDate("2026-03-25")); // Use a date that has data in the JSON

  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <div className='flex flex-col w-full min-h-screen bg-white pb-20 lg:pb-28'>
        <Navbar />

        {/* Top Row: Main Graph & Team Stats */}
        <div className='w-full lg:w-[94%] xl:w-4/5 my-8 flex flex-col lg:flex-row justify-center mx-auto gap-8 items-stretch px-4 pt-6 sm:px-8'>
          <div className='w-full lg:w-[62%] flex'>
            <DashboardGraph
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              value={value}
              setValue={setValue}
            />
          </div>
          <div className='w-full lg:w-[38%] flex'>
            <TeamUtilization />
          </div>
        </div>

        {/* Middle Row: Detail Cards 1 - Independent of Graph Filters */}
        <div className='w-[94%] xl:w-4/5 my-4 flex flex-col lg:flex-row justify-center mx-auto gap-8 items-stretch px-4 sm:px-6'>
          <div className='w-full lg:w-1/2 flex'>
            <UpcomingShoots />
          </div>
          <div className='w-full lg:w-1/2 flex'>
            <RecentLeads setOpenForm={setOpenForm} />
          </div>
        </div>

        {/* Bottom Row: Detail Cards 2 - Independent of Graph Filters */}
        {/* <div className='w-[94%] xl:w-4/5 my-4 flex flex-col lg:flex-row justify-center mx-auto gap-8 items-stretch px-4 sm:px-6'>
          <div className='w-full lg:w-1/2 flex'>
            <UpcomingPayements />
          </div>
          <div className='w-full lg:w-1/2 flex'>
            <JobTask />
          </div>
        </div> */}

        {OpenForm && (
          <LeadForm
            onSubmit={(data) => console.log('Form submitted:', data)}
            setOpenForm={setOpenForm}
          />
        )}
      </div>
    </RouteGuard>
  );
}
