import Link from 'next/link';
import Image from 'next/image';
import { NAV_TABS, isTabActive } from '@/utils/navConfig';

interface NavTabsProps {
  pathname: string;
  variant: 'desktop' | 'mobile';
  onLogout?: () => void;
}

export const NavTabs = ({
  pathname,
  variant,
  onLogout
}: NavTabsProps) => {
  if (variant === 'desktop') {
    return (
      <div className='hidden lg:flex items-center space-x-1 xl:space-x-4 overflow-hidden'>
        {NAV_TABS.map((tab) => {
          const active = isTabActive(pathname, tab);
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-[15px] font-medium flex flex-col items-center transition-colors duration-200 flex-shrink-0 whitespace-nowrap 
                ${active ? 'text-[#01B0E9] bg-blue-50' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              <Image
                src={tab.icon}
                alt={`${tab.name} Icon`}
                width={24}
                height={24}
                className={`w-6 h-6 mb-1 ${active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                style={{
                  filter: active
                    ? 'invert(52%) sepia(91%) saturate(2251%) hue-rotate(167deg) brightness(98%) contrast(98%)'
                    : 'none'
                }}
              />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {NAV_TABS.map((tab) => {
        const active = isTabActive(pathname, tab);
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`block px-3 py-3 rounded-md text-lg font-medium flex items-center transition-colors duration-200 
              ${active ? 'text-[#01B0E9] bg-blue-50' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <Image
              src={tab.icon}
              alt={`${tab.name} Icon`}
              width={24}
              height={24}
              className={`w-6 h-6 mr-3 ${active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              style={{
                filter: active
                  ? 'invert(52%) sepia(91%) saturate(2251%) hue-rotate(167deg) brightness(98%) contrast(98%)'
                  : 'none'
              }}
            />
            {tab.name}
          </Link>
        );
      })}
      {onLogout && (
        <div className='border-t border-gray-200 pt-4'>
          <button
            className='block w-full text-left px-3 py-2 text-base font-medium text-gray-700 rounded-md transition-colors duration-200 hover:bg-gray-100'
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};
