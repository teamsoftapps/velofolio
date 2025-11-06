"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SettingTab from '../components/SettingTab'
import Image from 'next/image'
import LogoSetting from '../components/LogoSetting'
import SettingForm from '../components/SettingForm'

const page = () => {
  const [activeTab, setActiveTab] = useState('Company Info');
  return (
    <div className='bg-[#FAFAFA] h-full'>
<Navbar />
<div className='container mx-auto  w-[100%] h-full px-2 bg-[#FAFAFA]'>
  <div className='w-full  mt-16 mb-7'>
   <h1 className={`text-2xl mb-3 font-semibold text-black`}>Setting</h1>
<h3 className='text-md text-[#71717A]'>Dashboard | Settings</h3>
  </div>

  <SettingTab activeTab={activeTab} onTabChange={setActiveTab} />
<LogoSetting />
<SettingForm />


</div>



    </div>
  )
}

export default page