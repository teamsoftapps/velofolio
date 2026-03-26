/** @format */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileModal from './NavModal';
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredientials } from '@/store/slices/authSlice';
import { useGetOrganizationsQuery } from '@/store/apis/Common';
import Companies from './Companies';
import CreateWorkspaceModal from './CreateWorkspace';
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationModal from './NotificationModal';

const Navbar = ({ guestLabel }: { guestLabel?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dispatch = useDispatch();
  const [workspace, setWorkspaceOpen] = useState(false);
  const { data: companies, isLoading, error } = useGetOrganizationsQuery({});

  const { token } = useSelector((state: any) => state.persisted?.auth || {});
  const isLoggedIn = !!token;

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
        <div className='flex items-center justify-between h-20 sm:h-24'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='VeloFolio Logo'
                width={120}
                height={120}
                className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain'
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu - AUTH ONLY */}
          {isLoggedIn && (
            <div className='hidden lg:flex items-center space-x-2 xl:space-x-4'>
              {tabs.map((tab) => {
                const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={`px-3 py-2 rounded-lg text-base xl:text-lg font-medium flex flex-col items-center transition-colors duration-200 ${isActive ? 'text-[#01B0E9] bg-blue-50 ' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                  >
                    <Image
                      src={tab.icon}
                      alt={`${tab.name} Icon`}
                      width={24}
                      height={24}
                      className={`w-6 h-6 mb-1 ${isActive ? 'opacity-100' : 'opacity-80'}`}
                      style={{ filter: isActive ? 'invert(52%) sepia(91%) saturate(2251%) hue-rotate(167deg) brightness(98%) contrast(98%)' : 'none' }}
                    />
                    <span>{tab.name}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Profile / Login - DYNAMIC */}
          <div className='flex items-center space-x-4'>
            {isLoggedIn ? (
              <div className='hidden lg:flex items-center relative'>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className='relative text-gray-700 hover:text-gray-900 mr-3 focus:outline-none p-2 bg-gray-50 rounded-full border-1 border-[#E5E7EB] cursor-pointer'
                  aria-label='Notifications'
                >
<span className="flex bg-[#01B0E9] max-w-[17px] left-4.5    top-0.5 absolute h-4 px-1 pt-[2px] rounded-full items-center justify-center text-[12px] font-semibold text-white">
  {2}
</span>                  <IoNotificationsOutline className='w-6 h-6' />
                </button>
                {isNotifOpen && (
                  <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
                )}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className='flex items-center text-gray-700 cursor-pointer hover:text-gray-900 focus:outline-none transition-colors duration-200 border rounded-full px-2 border-gray-300'
                  aria-label='Toggle profile menu'
                >
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
                  <div className='absolute right-0 top-16'>
                    <ProfileModal setProfileOpen={setIsProfileOpen} companies={companies} />
                  </div>
                )}
              </div>
            ) : (
              <span className="hidden lg:block text-[#01B0E9] font-bold text-lg">
                {guestLabel || "VeloFolio"}
              </span>
            )}

            {/* Mobile Menu Toggle */}
            <div className='lg:hidden flex items-center'>
              {isLoggedIn && (
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className='text-gray-700 hover:text-gray-900 focus:outline-none p-2 mr-2 bg-gray-50 rounded-full shadow-md relative'
                  aria-label='Notifications'
                >
                  <IoNotificationsOutline className='w-6 h-6' />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#01B0E9] rounded-full ring-2 ring-white"></span>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-md'
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className='w-6 h-6' />
                ) : (
                  <FaBars className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white border-t border-gray-200 w-full'>
          <div className='px-4 py-4 space-y-1 sm:px-6'>
            {isLoggedIn ? (
              <>
                {tabs.map((tab) => {
                  const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
                  return (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={`block px-3 py-3 rounded-md text-lg font-medium flex items-center transition-colors duration-200 ${isActive ? 'text-[#01B0E9] bg-blue-50 ' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                      onClick={() => setIsMobileMenuOpen(false)}>
                      <Image
                        src={tab.icon}
                        alt={`${tab.name} Icon`}
                        width={24}
                        height={24}
                        className={`w-6 h-6 mr-3 ${isActive ? 'opacity-100' : 'opacity-80'}`}
                        style={{ filter: isActive ? 'invert(52%) sepia(91%) saturate(2251%) hue-rotate(167deg) brightness(98%) contrast(98%)' : 'none' }}
                      />
                      {tab.name}
                    </Link>
                  );
                })}
                <div className='border-t border-gray-200 pt-4'>
                  <button
                    className='block w-full text-left px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200'
                    onClick={async () => {
                      dispatch(clearCredientials());
                      setIsMobileMenuOpen(false);
                      router.push('/');
                    }}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm px-3 italic">
                {guestLabel || "VeloFolio - Professional Workflow"}
              </div>
            )}
          </div>
        </div>
      )}
      {workspace && <CreateWorkspaceModal setWorkspaceOpen={setWorkspaceOpen} />}
    </nav>
  );
};

export default Navbar;
