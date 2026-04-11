"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { colors } from '@/utils/colors'
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
import SecuritynPassword from '../components/settingComp/SecuritynPassword'
import SystemPrefrences from '../components/settingComp/SystemPrefrences/SystemPrefrences'

const page = () => {
  const [activeTab, setActiveTab] = useState('Company Info');
  return (
    <div className='h-full pb-8 transition-colors duration-300' style={{ backgroundColor: colors.bgLight }}>
      <Navbar />
      <div className='container mx-auto w-[100%] min-h-[90vh] h-full px-10' style={{ backgroundColor: colors.bgLight }}>
        <div className='w-full mt-12 mb-10'>
          <h1 className="text-[24px] font-semibold text-gray-950 mb-2">Settings</h1>
          <div className="flex items-center gap-4 text-[14px] text-gray-500 font-medium">
            <Link href="/dashboard" className="hover:text-gray-950 transition-colors cursor-pointer">Dashboard</Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-700 font-semibold ">Settings</span>
          </div>
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
        {
          activeTab === 'Security & Password' && <SecuritynPassword />
        }
        {
          activeTab === 'System Preferences' && <SystemPrefrences />
        }



      </div>



    </div>
  )
}

export default page