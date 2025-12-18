/** @format */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileModal from './NavModal';
import { BiPlus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { clearCredientials } from '@/store/slices/authSlice';
import { useGetOrganizationsQuery } from '@/store/apis/Common';
import Companies from './Companies';
import CreateWorkspaceModal from './CreateWorkspace';
import { IoNotificationsOutline } from "react-icons/io5";


const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
const dispatch = useDispatch();
//  const [companies, setCompanies] = useState([]);
  // const dispatch = useDispatch();
  const [workspace, setWorkspaceOpen] = useState(false);
  // const router=useRouter()
const { data: companies, isLoading, error } = useGetOrganizationsQuery({});


  console.log(companies);
  const tabs = [
    { name: 'Dashboard', icon: '/images/home.png', href: '/dashboard' },
    { name: 'Clients', icon: '/images/users.png', href: '/clients' },
    { name: 'Production', icon: '/images/film.png', href: '/production' },
    { name: 'Leads', icon: '/images/leads.png', href: '/leads' },
    { name: 'Jobs', icon: '/images/briefcase.png', href: '/jobs' },
    { name: 'Calendar', icon: '/images/calendar.png', href: '/calendar' },
    { name: 'Team', icon: '/images/team.png', href: '/team' },
    { name: 'Payments', icon: '/images/creditcard.png', href: '/payments' },
    { name: 'Reports', icon: '/images/chart-histogram.png', href: '/reports' },
    { name: 'Settings', icon: '/images/settings.png', href: '/settings' },
  ];

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50 w-full'>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 sm:h-20'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='VeloFolio Logo'
                width={80}
                height={80}
                className='w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain'
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden lg:flex items-center space-x-2 xl:space-x-4'>
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className='text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-2 py-2 rounded-lg text-sm font-medium flex flex-col items-center transition-colors duration-200'>
                <Image
                  src={tab.icon}
                  alt={`${tab.name} Icon`}
                  width={20}
                  height={20}
                  className='w-5 h-5 mb-1'
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </div>

          {/* Profile Dropdown */}
          <div className='hidden lg:flex items-center relative'>
                    <button
            
              className='text-gray-700 hover:text-gray-900  mr-3 focus:outline-none p-2  bg-gray-50 rounded-full shadow-md'
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
              
                <IoNotificationsOutline className='w-6 h-6' />
          
            </button>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className='flex items-center text-gray-700 cursor-pointer hover:text-gray-900 focus:outline-none transition-colors duration-200 border rounded-full px-2 border-gray-300'
              aria-label='Toggle profile menu'>
              <div className='rounded-full h-9 w-9 flex items-center justify-center bg-gray-200'>
                <Image
                  src='/images/userprofile.png'
                  alt='User Profile'
                  width={24}
                  height={24}
                  className='w-6 h-6 object-cover'
                />
              </div>
              <span className='ml-2 text-sm font-medium hidden xl:inline'>
                Velofolio
              </span>
              <Image
                src='/images/chevron-down.svg'
                alt='Dropdown Icon'
                width={8}
                height={8}
                className='ml-2 w-3 h-3'
              />
            </button>
            {isProfileOpen && (
              <div onClick={()=>setIsProfileOpen(false)} className='bg-red-400'>
              <ProfileModal setProfileOpen={setIsProfileOpen} companies={companies}/>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Visible below 1024px) */}
          <div className='lg:hidden flex items-center'>
            <button
            
              className='text-gray-700 hover:text-gray-900 focus:outline-none p-2  bg-gray-50 rounded-full shadow-md'
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
              
                <IoNotificationsOutline className='w-6 h-6' />
          
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-md'
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMobileMenuOpen ? (
                <FaTimes className='w-6 h-6' />
              ) : (
                <FaBars className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white border-t border-gray-200 w-full'>
          <div className='px-4 py-4 space-y-1 sm:px-6'>
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className='text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors duration-200'
                onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src={tab.icon}
                  alt={`${tab.name} Icon`}
                  width={20}
                  height={20}
                  className='w-5 h-5 mr-3'
                />
                {tab.name}
              </Link>
            ))}
            {/* Profile in Mobile Menu */}
            <div className='border-t border-gray-200 pt-4'>
<div className='flex items-center px-3 mb-3'>
                <div className='rounded-full h-9 w-9 flex items-center justify-center bg-gray-200'>
                  <Image
                    src='/images/userprofile.png'
                    alt='User Profile'
                    width={24}
                    height={24}
                    className='w-6 h-6 object-cover'
                  />
                </div>
                <span className='ml-3 text-base font-medium text-gray-700'>
                  Velofolio
                </span>
              </div>
              <div className='space-y-1'>
                <Link
                  href='/profile'
                  className='block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200'
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </Link>
                  <div className='text-black px-2'>
                          {/* <h1 className='mb-2 text-sm'>Companies</h1> */}
                         <Companies companies={companies} setWorkspaceOpen={setWorkspaceOpen}/>
                          <div>
                            <button onClick={()=>setWorkspaceOpen(true)} className="w-full flex items-center space-x-3 px-1 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                              <div className='bg-[#00A4DD] p-1 rounded-full'>
                              <BiPlus className="w-6 h-6 text-white " />
                
                              </div>
                              <span className="text-gray-800 font-medium">Create New Workpace</span>
                            </button>
                        
                          </div>
                        </div>
                <Link
                  href='/settings'
                  className='block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200'
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Settings
                </Link>
                <button
                  
                  className='block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200'
                  onClick={async () =>{ 
                    dispatch(clearCredientials())
                    setIsMobileMenuOpen(false)
                    
                    // router.push('/')
                  }}>
                  Logout
                </button>
              </div>
            </div>
            
             {/* <ProfileModal setProfileOpen={setIsProfileOpen} /> */}
          </div>
        </div>
      )}
       {workspace && <CreateWorkspaceModal setWorkspaceOpen={setWorkspaceOpen} />}
    </nav>
  );
};

export default Navbar;
