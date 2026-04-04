/** @format */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileModal from './NavModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredientials } from '@/store/slices/authSlice';
import { useGetOrganizationsQuery } from '@/store/apis/Common';
import CreateWorkspaceModal from './CreateWorkspace';
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationModal from './NotificationModal';
import { colors } from '@/utils/colors';

const Navbar = ({ guestLabel }: { guestLabel?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dispatch = useDispatch();
  const [workspace, setWorkspaceOpen] = useState(false);
  const { data: companies } = useGetOrganizationsQuery({});

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
            <div className='hidden lg:flex items-center space-x-1 xl:space-x-4 overflow-hidden'>
              {tabs.map((tab) => {
                const isClientProfile = tab.name === 'Clients' && (pathname.startsWith('/clientProfile') || pathname.startsWith('/clientprofile'));
                const isJobProfile = tab.name === 'Jobs' && (pathname.startsWith('/jobProfile') || pathname.startsWith('/jobprofile'));
                const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/') || isClientProfile || isJobProfile;
                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={`px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-[15px] font-medium flex flex-col items-center transition-colors duration-200 flex-shrink-0 whitespace-nowrap 
                      ${isActive ? 'text-[#01B0E9] bg-blue-50' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                  >
                    <Image
                      src={tab.icon}
                      alt={`${tab.name} Icon`}
                      width={24}
                      height={24}
                      className={`w-6 h-6 mb-1 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                      style={{ 
                        filter: isActive 
                          ? 'invert(52%) sepia(91%) saturate(2251%) hue-rotate(167deg) brightness(98%) contrast(98%)' 
                          : 'none'
                      }}
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
                  className='relative mr-3 focus:outline-none p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 cursor-pointer transition-colors duration-200'
                  aria-label='Notifications'
                >
                  <IoNotificationsOutline className='w-6 h-6' />
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#01B0E9] px-1 text-[11px] font-bold text-white transition-all duration-300" style={{ boxShadow: `0 0 0 2px ${colors.white}` }}>
                    2
                  </span>
                </button>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className='flex items-center cursor-pointer focus:outline-none transition-colors duration-200 border border-gray-300 text-gray-700 rounded-full px-2'
                  aria-label='Toggle profile menu'
                >
                  <div className='bg-gray-200 rounded-full h-9 w-9 flex items-center justify-center'>
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
                <div className='relative'>
                  <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className='focus:outline-none p-2 mr-2 rounded-full bg-gray-50 border border-gray-100 text-gray-700 shadow-sm relative transition-colors duration-200'
                    aria-label='Notifications'
                  >
                    <IoNotificationsOutline className='w-6 h-6' />
                    <span className="absolute -top-1 -right-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#01B0E9] px-1 text-[11px] font-bold text-white transition-all duration-300" style={{ boxShadow: `0 0 0 2px ${colors.white}` }}>
                      2
                    </span>
                  </button>
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-gray-700 focus:outline-none p-2 rounded-md transition-colors duration-200'
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
                  const isClientProfile = tab.name === 'Clients' && (pathname.startsWith('/clientProfile') || pathname.startsWith('/clientprofile'));
                  const isJobProfile = tab.name === 'Jobs' && (pathname.startsWith('/jobProfile') || pathname.startsWith('/jobprofile'));
                  const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/') || isClientProfile || isJobProfile;
                  return (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={`block px-3 py-3 rounded-md text-lg font-medium flex items-center transition-colors duration-200 
                        ${isActive ? 'text-[#01B0E9] bg-blue-50' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                      onClick={() => setIsMobileMenuOpen(false)}>
                      <Image
                        src={tab.icon}
                        alt={`${tab.name} Icon`}
                        width={24}
                        height={24}
                        className={`w-6 h-6 mr-3 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        style={{ 
                          filter: isActive 
                            ? 'invert(52%) sepia(91%) saturate(2251%) hue-rotate(167deg) brightness(98%) contrast(98%)' 
                            : 'none'
                        }}
                      />
                      {tab.name}
                    </Link>
                  );
                })}
                <div className='border-t border-gray-200 pt-4'>
                  <button
                    className='block w-full text-left px-3 py-2 text-base font-medium text-gray-700 rounded-md transition-colors duration-200 hover:bg-gray-100'
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
      {isNotifOpen && (
        <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
