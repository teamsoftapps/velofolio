/** @format */

'use client';
import Navbar from '../components/Navbar';
import DashboardGraph from '../components/DashboardGraph';
import UpcomingShoots from '../components/UpcomingShoots';
import RecentLeads from '../components/RecentLeads';
import UpcomingPayements from '../components/UpcomingPayements';
import JobTask from '../components/JobTask';
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
        <DashboardGraph 
          timeRange={timeRange} 
          setTimeRange={setTimeRange} 
          value={value} 
          setValue={setValue} 
        />
        <div className='w-11/12 sm:w-5/6 lg:w-4/5 my-4 flex flex-col sm:flex-col lg:flex-row justify-center mx-auto gap-4 lg:gap-6  '>
          <UpcomingShoots timeRange={timeRange} value={value} />
          <RecentLeads setOpenForm={setOpenForm} timeRange={timeRange} value={value} />
        </div>
        <div className='w-11/12 sm:w-5/6 lg:w-4/5 my-4 flex flex-col sm:flex-col lg:flex-row justify-center mx-auto gap-4 lg:gap-6'>
          <UpcomingPayements timeRange={timeRange} value={value} />
          <JobTask timeRange={timeRange} value={value} />
        </div>
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
