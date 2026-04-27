
/** @format */

'use client';
import Navbar from '@/app/components/layouts/Navbar';
import DashboardGraph from '@/app/components/ui/DashboardGraph';
import UpcomingShoots from '@/app/components/ui/UpcomingShoots';
import RecentLeads from '@/app/components/ui/RecentLeads';
import TeamUtilization from '@/app/components/ui/TeamUtilization';
import RouteGuard from '@/app/components/layouts/RouteGuard';
import LeadForm from '@/app/components/forms/LeadFormModel';
import { useState } from 'react';
import { DateValue, parseDate } from "@internationalized/date";

export default function Home() {
  const [OpenForm, setOpenForm] = useState(false);
  const [timeRange, setTimeRange] = useState("All Data");
  const [value, setValue] = useState<DateValue>(parseDate("2026-03-25"));

  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <div className='flex flex-col w-full min-h-screen bg-white pb-20 lg:pb-28'>
        <Navbar />


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

        <div className='w-[94%] xl:w-4/5 my-4 flex flex-col lg:flex-row justify-center mx-auto gap-8 items-stretch px-4 sm:px-6'>
          <div className='w-full lg:w-1/2 flex'>
            <UpcomingShoots />
          </div>
          <div className='w-full lg:w-1/2 flex'>
            <RecentLeads setOpenForm={setOpenForm} />
          </div>
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


