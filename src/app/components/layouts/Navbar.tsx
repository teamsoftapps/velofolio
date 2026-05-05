'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileModal from '@/app/components/layouts/NavModal';
import { useDispatch } from 'react-redux';
import { clearCredientials as clearCredentials } from '@/store/slices/authSlice';
import { logOut } from '@/firebase_Routes/routes';
import { useGetOrganizationsQuery } from '@/store/apis/Common';
import NotificationModal from '@/app/components/layouts/NotificationModal';

// Custom Hooks & Config
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

// Extracted UI Components
import { NavTabs } from '@/app/components/navcomp/NavTabs';
import { NotificationButton } from '@/app/components/navcomp/NotificationButton';

// --- Stub Hook for Notifications ---
// TODO: Move to a real file when implementing notification logic
const useNotifications = () => {
  return { notificationCount: 2 }; 
};

// --- Main Navbar Component ---

const Navbar = ({ guestLabel }: { guestLabel?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Close modals when clicking outside
  const profileRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(profileRef, () => setIsProfileOpen(false));

  const { data: companies } = useGetOrganizationsQuery({});
  const { firebaseUser, firestoreUser, isLoggedIn, displayName, photoURL } = useFirebaseAuth();
  const { notificationCount } = useNotifications();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logOut();
    dispatch(clearCredentials());
    router.push('/');
  };

  return (
    <nav className='bg-white shadow-md sticky top-0 z-1000 w-full'>
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
          {isLoggedIn && <NavTabs variant="desktop" pathname={pathname} />}

          {/* Profile / Login - DYNAMIC */}
          <div className='flex items-center space-x-4'>
            {isLoggedIn ? (
              <div className='hidden lg:flex items-center relative' ref={profileRef}>
                <NotificationButton 
                  count={notificationCount} 
                  onClick={() => setIsNotifOpen(prev => !prev)} 
                  className='mr-3'
                  isActive={pathname === '/notifications'}
                />
                
                <button
                  onClick={() => setIsProfileOpen(prev => !prev)}
                  className='flex items-center cursor-pointer focus:outline-none transition-colors duration-200 border border-gray-300 text-gray-700 rounded-full px-2'
                  aria-label='Toggle profile menu'
                >
                  <div className='bg-gray-200 rounded-full h-9 w-9 flex items-center justify-center overflow-hidden'>
                    <Image
                      src={photoURL || '/images/userprofile.png'}
                      alt='User Profile'
                      width={24}
                      height={24}
                      className='w-7 h-7 object-cover rounded-full'
                    />
                  </div>
                  <span className='ml-2 text-sm font-medium hidden xl:inline'>
                    {displayName}
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
                    <ProfileModal setProfileOpen={setIsProfileOpen} companies={companies} isProfileOpen={isProfileOpen} firestoreUser={firestoreUser} />
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
                <div className='relative mr-2'>
                  <NotificationButton 
                    count={notificationCount} 
                    onClick={() => setIsNotifOpen(prev => !prev)} 
                    className='shadow-sm'
                    isActive={pathname === '/notifications'}
                  />
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
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
              <NavTabs variant="mobile" pathname={pathname} onLogout={handleLogout} />
            ) : (
              <div className="text-gray-400 text-sm px-3 italic">
                {guestLabel || "VeloFolio - Professional Workflow"}
              </div>
            )}
          </div>
        </div>
      )}
      {isNotifOpen && (
        <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
