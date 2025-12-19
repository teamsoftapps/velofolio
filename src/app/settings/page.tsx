"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SettingTab from '../components/settingComp/SettingTab'
import Image from 'next/image'
import LogoSetting from '../components/settingComp/LogoSetting'
import SettingForm from '../components/settingComp/SettingForm'
import CompanyInfo from '../components/CompanyInfo'
import TeamnPermission from '../components/settingComp/TeamnPermission'
import PaymentnBilling from '../components/settingComp/PaymentnBilling'
import EmailNotificationn from '../components/settingComp/Notification'
import EmailnNotification from '../components/settingComp/EmailnNotification'
import GoalsnReport from '../components/settingComp/GoalsnReport'
import BrandingnCustomization from '../components/settingComp/BrandingnCustomization'

const page = () => {
  const [activeTab, setActiveTab] = useState('Company Info');
  return (
    <div className='bg-[#FAFAFA] h-full pb-8'>
<Navbar />
<div className='container mx-auto  w-[100%] min-h-[90vh] h-full px-2 bg-[#FAFAFA] inter'>
  <div className='w-full  mt-16 mb-7'>
   <h1 className={`text-2xl mb-3 font-semibold text-black inter`}>Settings</h1>
<h3 className='text-md text-[#71717A]'>Dashboard | Settings</h3>
  </div>

  <SettingTab activeTab={activeTab} onTabChange={setActiveTab} />
{
  activeTab === 'Company Info' && <CompanyInfo />

}

{
  activeTab === 'Team & Permissions' && <TeamnPermission />
}
{
  activeTab === 'Payments & Billing' && <PaymentnBilling />
}
{
  activeTab === 'Email & Notifications' && <EmailnNotification />
}
{
  activeTab === 'Goals & Reports' && <GoalsnReport />
}
{
  activeTab === 'Branding & Customization' && <BrandingnCustomization />
}


</div>



    </div>
  )
}

export default page