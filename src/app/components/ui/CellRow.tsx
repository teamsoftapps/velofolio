import { FaCircleCheck, FaClock } from 'react-icons/fa6';
import { IoMdRefreshCircle } from 'react-icons/io';
import { SlOptionsVertical } from 'react-icons/sl';
import Image from 'next/image';

// Status Cell
export const StatusCell = ({ status }: { status: string }) => {
  const colors: any = {
    'New Lead': 'bg-[#FEBE2A] text-black',
    Proposal: 'bg-[var(--primary-color)] text-white',
    Booked: 'bg-[#14CB95] text-white',
    Done: 'bg-green-500 text-white',
    Paid: 'bg-[var(--primary-color)] text-white',
    Pending: 'bg-[#FEBE2A] text-black',
    Inactive: 'bg-gray-200 text-black',
    Overdue: 'bg-[#14CB95] text-white',
  };
  return <span className={`p-1 px-3 rounded-2xl inline-block ${colors[status] || 'bg-gray-200'}`}>{status}</span>;
};

// Availability Cell
export const AvailabilityCell = ({ availability }: { availability: string }) => {
  const map: any = {
    Free: { color: 'text-green-500', icon: <FaCircleCheck className="w-4 h-4" /> },
    Busy: { color: 'text-blue-500', icon: <IoMdRefreshCircle className="w-4 h-4" /> },
    'Part-Time': { color: 'text-yellow-500', icon: <FaClock className="w-4 h-4" /> },
  };
  const item = map[availability] || { color: 'text-gray-500', icon: null };
  return (
    <span className={`flex items-center justify-center gap-1 ${item.color}`}>
      {item.icon} {availability}
    </span>
  );
};

// Priority Cell
export const PriorityCell = ({ priority }: { priority: string }) => {
  const colors: any = {
    High: 'bg-red-300',
    Medium: 'bg-orange-200',
    Low: 'bg-green-200',
  };
  return <span className={`p-1 px-3 rounded-2xl ${colors[priority] || 'bg-gray-200'}`}>{priority}</span>;
};

// Avatar Cell (Client/Team)
export const AvatarCell = ({ src, name }: { src: string; name: string }) => (
  <div className="flex items-center justify-center gap-2">
    <Image src={src} alt={name} width={32} height={32} className="rounded-full object-cover" />
    <span className="text-sm font-medium truncate max-w-[100px]">{name}</span>
  </div>
);

// Action Cell
export const ActionCell = () => <SlOptionsVertical className="w-5 h-5 mx-auto cursor-pointer" />;

// Progress Cell
export const ProgressCell = ({ progress }: { progress: number | string }) => {
  const value = Math.min(100, Math.max(0, Number(progress)));
  const color = value === 100 ? 'bg-[#14CB95]' : 'bg-[#00A4DD]';
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 relative p-2 pb-3 border-1">
      <p className="text-[10px] sm:text-xs md:text-sm absolute inset-0 flex items-center justify-center z-20">
        {value}%
      </p>
      <div className={`h-3 -mt-1 relative rounded-full ${color} transition-all duration-300`} style={{ width: `${value}%` }}></div>
    </div>
  );
};
