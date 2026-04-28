import { IoNotificationsOutline } from "react-icons/io5";
import { colors } from '@/utils/colors';

interface NotificationButtonProps {
  count: number;
  onClick: () => void;
  className?: string;
}

export const NotificationButton = ({
  count,
  onClick,
  className = ''
}: NotificationButtonProps) => (
  <button
    onClick={onClick}
    className={`relative focus:outline-none p-2 rounded-full bg-gray-50 border text-gray-700 cursor-pointer transition-colors duration-200 ${className}`}
    aria-label='Notifications'
  >
    <IoNotificationsOutline className='w-6 h-6' />
    {count > 0 && (
      <span className="absolute -top-1 -right-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#01B0E9] px-1 text-[11px] font-bold text-white transition-all duration-300" style={{ boxShadow: `0 0 0 2px ${colors.white}` }}>
        {count}
      </span>
    )}
  </button>
);
