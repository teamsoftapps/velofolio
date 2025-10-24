/** @format */

'use client';
import Navbar from './components/Navbar';
import DashboardGraph from './components/DashboardGraph';
import UpcomingShoots from './components/UpcomingShoots';
import RecentLeads from './components/RecentLeads';
import UpcomingPayements from './components/UpcomingPayements';
import JobTask from './components/JobTask';

export default function Home() {
  return (
    <div className='flex flex-col w-full min-h-screen bg-white'>
      <Navbar />
      <DashboardGraph />
      <div className='w-11/12 sm:w-5/6 lg:w-4/5 my-4 flex flex-col sm:flex-col lg:flex-row justify-center mx-auto gap-4 lg:gap-6'>
        <UpcomingShoots />
        <RecentLeads />
      
      </div>
      <div className='w-11/12 sm:w-5/6 lg:w-4/5 my-4 flex flex-col sm:flex-col lg:flex-row justify-center mx-auto gap-4 lg:gap-6'>
          <UpcomingPayements/>
          <JobTask/>
      </div>
    </div>
  );
}
