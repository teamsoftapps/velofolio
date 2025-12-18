import React, { useState } from 'react'
import AddButton from '../AddButton'
import GoalsDashboard from './GoalsHeaderCard'
import PerfomanceSummary from './PerfomanceSummary'
import InsightsSummary from './InsightsSummary'
import ReportingPrefrences from './ReportingPrefrences'
import AddGoalModal from './AddGoalModal'

const GoalsnReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='text-black h-full'>
        <div className="header w-full items-center flex justify-between md:flex-row flex-col  my-10 ">
            <div >

            <h1 className='text-xl'>Goals & Reports</h1>
            <p className='mt-3 text-md text-[#71717A]'>Set performance goals and track progress across your studio.</p>
            </div>
<div className='w-full mt-4 md:w-48'>
    <AddButton title="Add New Goal" setOpenForm={() => setIsModalOpen(true)} />
</div>
        </div>
<GoalsDashboard />
<div className='cards py-10 flex lg:flex-row flex-col sm:items-start gap-2 '>
    <PerfomanceSummary />
<InsightsSummary />
<ReportingPrefrences />


</div>


{isModalOpen && <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={() => {}} />}


    </div>
  )
}

export default GoalsnReport