'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { FiChevronDown, FiTrash2, FiEdit2, FiMail, FiPhone, FiCalendar, FiMapPin, FiGlobe, FiX, FiSave, FiPlus, FiMinus } from 'react-icons/fi';
import { BsBag, BsArrowUpRight, BsThreeDots } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';
import { AiOutlineFileText } from 'react-icons/ai';
import { LiaCitySolid } from 'react-icons/lia';
import { ImMagnet } from 'react-icons/im';
import DeleteModal from '../components/DeleteModal';
import FormModal from '../components/FormModal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

// --- Profile Sidebar ---
const ProfileSidebar = ({ member, onEditClick, onDeleteClick }: { member: any; onEditClick: () => void; onDeleteClick: () => void }) => {
  return (
    <div className='w-full lg:w-1/3 flex-shrink-0'>
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        {/* Profile Header */}
        <div className='flex items-start justify-between w-full p-6 relative'>
          <div className='flex items-center gap-5'>
            <div className='w-[84px] h-[84px] rounded-full overflow-hidden'>
              <img src='/ClientProfileImage.png' alt='Profile' className='w-full h-full object-cover' />
            </div>
            <div>
              <h2 className='text-[22px] font-semibold text-gray-900'>{member.name}</h2>
              <p className='text-[15px] font-medium text-gray-500 mb-2'>{member.role}</p>
              <button className='flex items-center gap-1.5 px-3 py-1 bg-[#F9FAFB] border border-gray-100 rounded-full text-[13px] font-medium text-gray-800 hover:bg-gray-100 transition cursor-pointer'>
                <span className='w-2 h-2 bg-[#F59E0B] rounded-full'></span> {member.status || 'Active'} <FiChevronDown />
              </button>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={onDeleteClick}
              className='w-10 h-10 flex items-center justify-center rounded-full bg-[#FEF2F2] text-red-500 hover:bg-red-100 transition-colors cursor-pointer border-none'
            >
              <FiTrash2 size={18} />
            </button>
            <button
              onClick={onEditClick}
              className='w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F4F6] text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer border-none'
            >
              <FiEdit2 size={18} />
            </button>
          </div>
        </div>

        <div className='border-t border-gray-100'></div>

        {/* Contact Details */}
        <div className='p-6'>
          <h3 className='text-[16px] font-semibold text-gray-900 mb-5'>Contact Details</h3>
          <div className='space-y-6'>
            <div className='flex gap-4 items-center'>
              <div className='w-11 h-11 rounded-full bg-[#F9FAFB] border border-gray-100 flex items-center justify-center flex-shrink-0'>
                <FiMail className='text-gray-700' size={18} />
              </div>
              <div className='flex flex-col'>
                <span className='text-[14px] font-medium text-gray-400'>Email</span>
                <span className='text-[16px] font-medium text-gray-900'>{member.email || 'sarahjohnson@gmail.com'}</span>
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <div className='w-11 h-11 rounded-full bg-[#F9FAFB] border border-gray-100 flex items-center justify-center flex-shrink-0'>
                <FiPhone className='text-gray-700' size={18} />
              </div>
              <div className='flex flex-col'>
                <span className='text-[14px] font-medium text-gray-400'>Phone</span>
                <span className='text-[16px] font-medium text-gray-900'>{member.phone || '+1(514) 550-3281'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-100'></div>

        {/* Personal Details */}
        <div className='p-6'>
          <h3 className='text-[16px] font-semibold text-gray-900 mb-5'>Personal Details</h3>
          <div className='space-y-6'>
            {[
              { icon: FiCalendar, label: 'Gender', value: member.gender || 'Female' },
              { icon: FiCalendar, label: 'Date of Birth', value: member.dob || 'January 1, 1987' },
              { icon: FiMapPin, label: 'Street Address', value: member.address || '225 Cherry Street #24, New York, NY' },
              { icon: LiaCitySolid, label: 'City', value: member.city || 'New York' },
              { icon: FiGlobe, label: 'Country', value: member.country || 'USA' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className='flex gap-4 items-center'>
                <div className='w-11 h-11 rounded-full bg-[#F9FAFB] border border-gray-100 flex items-center justify-center flex-shrink-0'>
                  <Icon className='text-gray-700' size={18} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-[14px] font-medium text-gray-400'>{label}</span>
                  <span className='text-[16px] font-medium text-gray-900'>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard = () => (
  <div className='bg-[#F7F8FA] border border-gray-200 rounded-lg p-5 w-full flex-1 min-w-[340px] max-w-[45%] flex flex-col justify-between'>
    <div>
      <div className='flex justify-between items-center mb-4'>
        <span className='px-4 py-1 rounded-full border border-gray-300 text-[13px] font-medium text-gray-500'>Wedding</span>
        <BsThreeDots className='text-gray-400 cursor-pointer' size={24} />
      </div>
      <h4 className='text-lg font-semibold text-gray-900 mb-2'>Pre-Wedding Shoot</h4>
      <p className='text-[14px] text-gray-800 mb-8 leading-relaxed line-clamp-2'>
        Full Edited Video (3 hours), Social<br />Media Teasers (3 clips)
      </p>
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-[14px] font-medium text-gray-500'>Progress</span>
          <span className='text-[14px] font-bold text-gray-900'>75%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2.5'>
          <div className='bg-[#00B5E2] h-2.5 rounded-full' style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
    <div className='flex justify-between items-center'>
      <div>
        <p className='text-[14px] font-medium text-gray-900 mb-3'>Date: Oct 12, 2025, 5:32 AM</p>
        <div className='flex -space-x-2'>
          {['/teampic1.png', '/teampic2.png', '/teampic3.png'].map((img, i) => (
            <img key={i} src={img} alt='Team' className='w-8 h-8 rounded-full border-2 border-white object-cover' />
          ))}
        </div>
      </div>
      <span className='px-4 py-1.5 mb-8 bg-[#00B5E2] text-white text-[13px] font-semibold rounded-full'>In Progress</span>
    </div>
  </div>
);

// ─── Main Content ─────────────────────────────────────────────────────────────
// ─── Expandable Section Component ─────────────────────────────────────────────
const ExpandableSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  badgeCount
}: {
  title: string;
  icon: any;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  badgeCount?: number;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer border-none bg-transparent outline-none'
      >
        <div className='flex items-center gap-3'>
          <Icon size={24} className='text-gray-900 group-hover:scale-110 transition-transform' />
          <h3 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
            {title}
            {badgeCount !== undefined && (
              <span className='bg-[#00B5E2] text-white text-sm font-medium px-2 py-1 w-5 h-5 flex items-center justify-center rounded-full'>
                {badgeCount}
              </span>
            )}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#00B5E2] group-hover:text-white transition-all duration-300"
        >
          {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className='px-6 pb-6 pt-0 border-t border-gray-50'>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Content ─────────────────────────────────────────────────────────────
const MainContent = () => {
  const [activeRange, setActiveRange] = useState('7 Days');
  const metrics = [
    { title: 'Total Jobs', val: '22', rate: '+15.01%', bg: 'bg-[#E3F4FC]', icon: BsBag, rateBg: 'bg-[#00B5E2]' },
    { title: 'Active Jobs', val: '8', rate: '+15.01%', bg: 'bg-[#FEECBF]', icon: HiOutlineRefresh, rateBg: 'bg-[#FBBF24]' },
    { title: 'Completed', val: '20', rate: '+15.01%', bg: 'bg-[#DFF6EA]', icon: IoCheckmarkCircleOutline, rateBg: 'bg-[#10B981]' },
    { title: 'Pending Tasks', val: '2', rate: '+15.01%', bg: 'bg-[#F0F2F5]', icon: MdOutlineAccessTime, rateBg: 'bg-[#9CA3AF]' },
  ];

  return (
    <div className='w-full lg:w-2/3 flex flex-col gap-6'>
      {/* Overview - Static Card */}
      <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
        <div className='flex justify-between items-center mb-6 flex-wrap'>
          <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <ImMagnet size={28} className="text-gray-900" /> Overview
          </h3>
          <div className='flex bg-[#F3F4F6] border mt-4 lg:mt-0 border-gray-200 rounded overflow-hidden'>
            {['7 Days', '30 Days', 'Mtd', 'Ytd'].map(r => (
              <button
                key={r}
                onClick={() => setActiveRange(r)}
                className={`px-5 py-2 text-[13px] font-medium transition-colors ${activeRange === r ? 'bg-[#00B5E2] text-white' : 'text-gray-700 border-l border-gray-200 first:border-0 hover:bg-gray-200'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {metrics.map((m, i) => (
            <div key={i} className={`${m.bg} p-5 rounded-lg flex flex-col justify-between h-[150px]`}>
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <span className='text-[16px] text-gray-900'>{m.title}</span>
                  <m.icon className='text-gray-900' size={24} />
                </div>
                <h4 className='text-[34px] font-bold text-gray-900 mb-0'>{m.val}</h4>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded ${m.rateBg} text-white text-[13px] font-medium w-fit`}>
                {m.rate} <BsArrowUpRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs */}
      <ExpandableSection title="Jobs" icon={AiOutlineFileText} defaultOpen={true} badgeCount={2}>
        <div className='flex gap-4 overflow-x-auto pb-2 pt-4'>
          <JobCard />
          <JobCard />
        </div>
      </ExpandableSection>

      {/* Tasks, Availability, Performance */}
      <ExpandableSection title="Tasks" icon={BsBag} badgeCount={0}>
        <p className='text-gray-500 py-4'>No tasks currently assigned.</p>
      </ExpandableSection>
      <ExpandableSection title="Availability" icon={FiMail}>
        <p className='text-gray-500 py-4'>View and manage team member schedule.</p>
      </ExpandableSection>
      <ExpandableSection title="Performance" icon={FiArrowUpRight}>
        <p className='text-gray-500 py-4'>Metrics and analytics for member performance.</p>
      </ExpandableSection>
    </div>
  );
};

// ─── Team Profile Page ────────────────────────────────────────────────────────
const TeamProfilePage = () => {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [member, setMember] = useState({
    name: 'Sarah Lee',
    role: 'Lead Photographer',
    email: 'sarahjohnson@gmail.com',
    phone: '+1(514) 550-3281',
    gender: 'Female',
    dob: 'January 1, 1987',
    address: '225 Cherry Street #24, New York, NY',
    city: 'New York',
    country: 'USA',
    status: 'Active',
  });

  const handleSaveEdit = (updatedData: any) => {
    // MemberForm return data has firstName/lastName instead of just name
    const newMember = {
      ...updatedData,
      name: `${updatedData.firstName} ${updatedData.lastName}`.trim(),
      dob: updatedData.dateOfBirth
    };
    setMember(newMember);
    setIsEditModalOpen(false);
    toast.success('Team member updated successfully!');
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    toast.success('Team member removed.');
    router.push('/team');
  };

  return (
    <div className='min-h-screen w-full flex flex-col bg-[#FAFAFA]'>
      <Navbar />
      <div className='w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Title & Navigation */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-[24px] font-semibold text-gray-950 mb-2">{member.name}</h1>
          <div className="flex items-center gap-4 text-[14px] text-gray-500 font-medium">
            <Link href="/dashboard" className="hover:text-gray-950 transition-colors cursor-pointer">Dashboard</Link>
            <span className="text-gray-300">|</span>
            <Link href="/team" className="hover:text-gray-950 transition-colors cursor-pointer">Teams Overview</Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-700 font-semibold ">{member.name}</span>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <ProfileSidebar
            member={member}
            onEditClick={() => setIsEditModalOpen(true)}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />
          <MainContent />
        </div>
      </div>

      {isEditModalOpen && (
        <FormModal
          onSubmit={handleSaveEdit}
          initialData={{
            ...member,
            firstName: member.name.split(' ')[0],
            lastName: member.name.split(' ').slice(1).join(' '),
            dateOfBirth: member.dob
          }}
          setOpenForm={setIsEditModalOpen}
        />
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Team Member?"
        message={`Are you sure you want to remove ${member.name} from the team? This action cannot be undone.`}
        confirmLabel="Delete Member"
      />
    </div>
  );
};

export default TeamProfilePage;