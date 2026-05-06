import { IoNotificationsOutline } from "react-icons/io5";
import { colors } from '@/utils/colors';

interface NotificationButtonProps {
  count: number;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

export const NotificationButton = ({
  count,
  onClick,
  className = '',
  isActive = false
}: NotificationButtonProps) => (
  <button
    onClick={onClick}
    className={`relative focus:outline-none p-2 rounded-full cursor-pointer transition-all duration-200 
      ${isActive 
        ? 'bg-[var(--primary-color)] text-white shadow-md border-none' 
        : 'bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100'} 
      ${className}`}
    aria-label='Notifications'
  >
    <IoNotificationsOutline className='w-6 h-6' />
    {count > 0 && (
      <span className={`absolute -top-1 -right-0 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold transition-all duration-300 ring-2 ring-white
        ${isActive ? 'bg-red-500 text-white' : 'bg-[var(--primary-color)] text-white'}`}>
        {count}
      </span>
    )}
  </button>
);
