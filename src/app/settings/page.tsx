"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SettingTab from '../components/SettingTab'

const page = () => {
  const [activeTab, setActiveTab] = useState('Company Info');
  return (
    <div>
<Navbar />
<div className='container mx-auto  w-[100%] h-[80vh]'>
  <div className='w-full  mt-16 mb-7'>
   <h1 className={`text-2xl mb-3 font-semibold`}>Setting</h1>
<h3 className='text-md'>Dashboard | Settings</h3>
  </div>

  <SettingTab activeTab={activeTab} onTabChange={setActiveTab} />


</div>



    </div>
  )
}

export default page