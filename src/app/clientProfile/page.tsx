// /** @format */

// 'use client';
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Link from 'next/link';
// import {
//   FaArrowLeft,
//   FaEdit,
//   FaEllipsisV,
//   FaEnvelope,
//   FaFilter,
//   FaInstagram,
//   FaPhone,
//   FaUsers,
// } from 'react-icons/fa';
// import { FaEllipsis } from 'react-icons/fa6';
// import { MdModeEditOutline } from 'react-icons/md';
// import SearchComponent from '../components/SearchComponent';
// import { CiFilter } from 'react-icons/ci';
// import AddButton from '../components/AddButton';
// import Contracts from '../components/Contracts';
// import ClientProfile from '../components/ClientProfile';

// const ClientProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('Overview');
//   const [openForm, setOpenForm] = useState(false);
//   const eventsData = [
//     {
//       title: 'Pre-Wedding Shoot - Sarah & John',
//       status: 'COMPLETED',
//       location: 'Toronto City Hall',
//       date: 'Oct 12, 2025, 5:32 AM',
//       deliverables: ['Full Film', 'Teaser', 'RAW Photos'],
//       team: ['Priya', 'Sofia'],
//     },
//     {
//       title: 'Wedding Ceremony - Sarah & John',
//       status: 'IN PROGRESS',
//       location: 'Toronto City Hall',
//       date: 'Oct 12, 2025, 5:32 AM',
//       deliverables: ['Highlight Reel', 'Edited Photos'],
//       team: ['Priya', 'Sofia'],
//     },
//     {
//       title: 'Engagement Party - Sarah & John',
//       status: 'COMPLETED',
//       location: 'Vancouver Park',
//       date: 'Nov 5, 2025, 3:00 PM',
//       deliverables: ['Event Coverage', 'Photo Album'],
//       team: ['Priya', 'John'],
//     },
//     {
//       title: 'Reception - Sarah & John',
//       status: 'NOT STARTED',
//       location: 'Toronto Grand Hall',
//       date: 'Dec 15, 2025, 6:00 PM',
//       deliverables: ['Full Video', 'Edited Clips'],
//       team: ['Sofia', 'Mike'],
//     },
//   ];

//   return (
//     <div className='min-h-screen w-full flex flex-col items-start bg-white'>
//       <Navbar />
//       <div className='w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-6 md:px-8'>
//         <Link
//           href='/clients'
//           className='flex items-center text-black hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-lg font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'>
//           <FaArrowLeft className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
//           Back to clients
//         </Link>
//         <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 py-2'>
//           {/* Box 1: Client Profile */}
//           <ClientProfile />
//           {/* Box 2: Tabs and Content */}
//           <div className='w-full lg:w-3/5 xl:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-300'>
//             <div className='flex flex-wrap justify-between border-b border-gray-300 mb-3 sm:mb-4 gap-2'>
//               {[
//                 'Overview',
//                 'Events',
//                 'Tasks',
//                 'Contracts & Docs',
//                 'Invoices & Payments',
//               ].map((tab) => (
//                 <a
//                   key={tab}
//                   href='#'
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setActiveTab(tab);
//                   }}
//                   className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base lg:text-lg font-medium ${activeTab === tab
//                     ? 'border-b-2 border-[#0B763E] text-black'
//                     : 'text-black hover:text-gray-700'
//                     }`}>
//                   {tab}
//                 </a>
//               ))}
//             </div>
//             {activeTab === 'Overview' && (
//               <div className='flex flex-col gap-4 sm:gap-6'>
//                 <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
//                   <div className='w-full sm:w-1/2 bg-[#F4F4F5] p-4 sm:p-5 rounded-lg'>
//                     <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>
//                       Lead Source
//                     </span>
//                     <div className='flex flex-row justify-between items-center mt-3 sm:mt-4'>
//                       <div className='flex flex-row items-center gap-2 sm:gap-3'>
//                         <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white p-2 sm:p-3 rounded-full flex justify-center items-center'>
//                           <FaInstagram className='text-[#E4405F] text-xl sm:text-2xl' />
//                         </div>
//                         <span className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                           Instagram
//                         </span>
//                       </div>
//                       <div className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
//                         <MdModeEditOutline className='text-base sm:text-lg' />
//                       </div>
//                     </div>
//                   </div>
//                   <div className='w-full sm:w-1/2 bg-[#F4F4F5] p-4 sm:p-5 rounded-lg'>
//                     <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>
//                       Assigned Team
//                     </span>
//                     <div className='flex flex-row justify-between items-center mt-3 sm:mt-4'>
//                       <div className='flex items-center'>
//                         <img
//                           src='/teampic1.png'
//                           alt='team1'
//                           className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white -mr-3'
//                         />
//                         <img
//                           src='/teampic2.png'
//                           alt='team2'
//                           className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white -mr-3'
//                         />
//                         <img
//                           src='/teampic3.png'
//                           alt='team3'
//                           className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white'
//                         />
//                       </div>
//                       <div className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
//                         <MdModeEditOutline className='text-base sm:text-lg' />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='w-full bg-[#F4F4F5] p-4 sm:p-5 rounded-lg flex flex-col gap-3'>
//                   <div className='flex justify-between items-center'>
//                     <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>
//                       Notes
//                     </span>
//                     <div className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
//                       <MdModeEditOutline className='text-base sm:text-lg' />
//                     </div>
//                   </div>
//                   <span className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                     During our initial consultation, Sarah mentioned that she
//                     prefers a pastel color theme for the wedding and wants extra
//                     focus on candid shots. She also requested a highlight reel
//                     for social media, in addition to the full video package.
//                     Need to confirm the exact start time for the reception.
//                   </span>
//                 </div>
//               </div>
//             )}
//             {activeTab === 'Events' && (
//               <div className='flex flex-col gap-4 sm:gap-6'>
//                 <div className='w-full bg-white p-4 sm:p-5 rounded-lg'>
//                   <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
//                     <div className='w-full sm:w-1/2'>
//                       <SearchComponent placeHolder='Search Events' />
//                     </div>
//                     <div className='w-full sm:w-1/2 flex justify-between items-center gap-3'>
//                       <div className='flex items-center bg-[#F4F4F5] p-1  gap-1.5 rounded cursor-pointer hover:bg-gray-200 transition duration-200'>
//                         <CiFilter className='w-5 h-5 sm:w-6 sm:h-6 text-gray-500' />
//                         <span className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                           Filter
//                         </span>
//                       </div>
//                       <div className='w-48 '>
//                         <AddButton
//                           setOpenForm={setOpenForm}
//                           title='Add Event'
//                         /></div>
//                     </div>
//                   </div>
//                   <div className='h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto mt-4 sm:mt-6'>
//                     <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6'>
//                       {eventsData.map((event, index) => (
//                         <div
//                           key={index}
//                           className='bg-[#F4F4F5] p-4 sm:p-5 rounded-lg border border-gray-300'>
//                           <div className='flex flex-row justify-between'>
//                             <h4 className='text-base sm:text-lg md:text-xl lg:text-2xl text-black font-semibold'>
//                               {event.title}
//                             </h4>
//                             <span className='text-black cursor-pointer'>
//                               <FaEllipsis
//                                 size={18}
//                                 className='sm:w-5 sm:h-5 md:w-6 md:h-6'
//                               />
//                             </span>
//                           </div>
//                           <div className='w-2/3 sm:w-1/2 flex items-center rounded-full py-1 mt-2'>
//                             <p
//                               className={`text-xs sm:text-sm md:text-sm lg:text-base px-2 sm:px-3 py-1 rounded-full ${event.status === 'COMPLETED'
//                                 ? 'text-white bg-[#13CC95]'
//                                 : event.status === 'IN PROGRESS'
//                                   ? 'text-white bg-[#01B0E9]'
//                                   : 'text-white bg-red-500'
//                                 }`}>
//                               {event.status}
//                             </p>
//                           </div>
//                           <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3'>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Location
//                               </div>
//                               <div className='bg-white flex justify-center py-2 rounded-sm my-1'>
//                                 <div className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                                   {event.location}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Date
//                               </div>
//                               <div className='bg-white flex justify-center p-2  rounded-sm my-1'>
//                                 <div className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                                   {event.date}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3'>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Deliverables
//                               </div>
//                               <ul className='flex flex-row flex-wrap'>
//                                 {event.deliverables.map((item, idx) => (
//                                   <li
//                                     key={idx}
//                                     className='text-sm sm:text-base md:text-base lg:text-lg text-black font-semibold'>
//                                     {item +
//                                       (idx < event.deliverables.length - 1
//                                         ? ', '
//                                         : '')}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Team
//                               </div>
//                               <div className='flex flex-wrap gap-2 sm:gap-3'>
//                                 {event.team.map((member, idx) => (
//                                   <span
//                                     key={idx}
//                                     className='flex items-center text-sm sm:text-base md:text-base lg:text-lg text-black font-semibold'>
//                                     <img
//                                       src={`/teampic${idx + 1}.png`}
//                                       alt={member}
//                                       className='w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-1 sm:mr-2 object-cover'
//                                     />
//                                     {member}
//                                     {idx < event.team.length - 1 && ', '}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {activeTab === 'Contracts & Docs' && <Contracts />}
//             {activeTab === 'Tasks' && (
//               <div className='flex flex-col gap-4 sm:gap-6'>
//                 <div className='w-full bg-white p-4 sm:p-5 rounded-lg'>
//                   <div className='h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto mt-4 sm:mt-6 flex flex-col items-center justify-start pt-8 sm:pt-12'>
//                     <div className='mb-6 sm:mb-8 w-full flex justify-center '>
//                       <img
//                         src='/images/no-task.png'
//                         alt='No tasks'
//                         className='w-[100] h-[100]  object-contain'
//                       />
//                     </div>
//                     <div className='text-center mb-6 sm:mb-8 flex justify-center'>
//                       <p className='w-5/8 text-sm sm:text-base md:text-lg lg:text-xl text-black'>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientProfilePage;
'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGoogle,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaEllipsisH,
} from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';
import { MdModeEditOutline, MdClose, MdCheck } from 'react-icons/md';
import { CiFilter } from 'react-icons/ci';
import SearchComponent from '../components/SearchComponent';
import AddButton from '../components/AddButton';
import Contracts from '../components/Contracts';
import ClientProfile from '../components/ClientProfile';
import Image from 'next/image';
import InvoiceCard from '../components/JobProfileComp/InvoiceCard';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

// Types
interface TeamMember {
  id: string;
  name: string;
  image: string;
  role: string;
}

interface Event {
  title: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'NOT STARTED';
  location: string;
  date: string;
  deliverables: string[];
  team: string[];
}

interface ClientData {
  leadSource: string;
  assignedTeam: TeamMember[];
  notes: string;
}

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-md shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <MdClose className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const ClientProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [openForm, setOpenForm] = useState(false);

  // Redux state for invoices
  const { invoices } = useSelector((state: any) => state.persisted.invoiceandQuote);
  const clientId = 1; // Assuming a fixed ID for now or from URL params if available

  // Client Data State
  const [clientData, setClientData] = useState<ClientData>({
    leadSource: 'Instagram',
    assignedTeam: [
      { id: '1', name: 'Sarah Johnson', image: '/teampic1.png', role: 'Lead Photographer' },
      { id: '2', name: 'Priya', image: '/teampic2.png', role: 'Photographer' },
      { id: '3', name: 'Sofia', image: '/teampic3.png', role: 'Assistant' },
    ],
    notes: 'During our initial consultation, Sarah mentioned that she prefers a pastel color theme for the wedding and wants extra focus on candid shots. She also requested a highlight reel for social media, in addition to the full video package. Need to confirm the exact start time for the reception.',
  });

  // Modal States
  const [leadSourceModalOpen, setLeadSourceModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Search States
  const [eventSearch, setEventSearch] = useState('');
  const [taskSearch, setTaskSearch] = useState('');
  const [invoiceSearch, setInvoiceSearch] = useState('');

  // Filter States
  const [eventStatusFilter, setEventStatusFilter] = useState('ALL');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('ALL');
  const [showEventFilter, setShowEventFilter] = useState(false);
  const [showInvoiceFilter, setShowInvoiceFilter] = useState(false);

  // Temporary States for Editing
  const [tempLeadSource, setTempLeadSource] = useState(clientData.leadSource);
  const [tempTeamIds, setTempTeamIds] = useState<string[]>(clientData.assignedTeam.map(t => t.id));
  const [tempNotes, setTempNotes] = useState(clientData.notes);

  // Original Events Data
  const eventsData: Event[] = [
    {
      title: 'Pre-Wedding Shoot - Sarah & John',
      status: 'COMPLETED',
      location: 'Toronto City Hall',
      date: 'Oct 12, 2025, 5:32 AM',
      deliverables: ['Full Film', 'Teaser', 'RAW Photos'],
      team: ['Priya', 'Sofia'],
    },
    {
      title: 'Wedding Ceremony - Sarah & John',
      status: 'IN PROGRESS',
      location: 'Toronto City Hall',
      date: 'Oct 12, 2025, 5:32 AM',
      deliverables: ['Highlight Reel', 'Edited Photos'],
      team: ['Priya', 'Sofia'],
    },
    {
      title: 'Engagement Party - Sarah & John',
      status: 'COMPLETED',
      location: 'Vancouver Park',
      date: 'Nov 5, 2025, 3:00 PM',
      deliverables: ['Event Coverage', 'Photo Album'],
      team: ['Priya', 'John'],
    },
    {
      title: 'Reception - Sarah & John',
      status: 'NOT STARTED',
      location: 'Toronto Grand Hall',
      date: 'Dec 15, 2025, 6:00 PM',
      deliverables: ['Full Video', 'Edited Clips'],
      team: ['Sofia', 'Mike'],
    },
  ];

  // Lead Source Options
  const leadSourceOptions = [
    { value: 'Instagram', icon: FaInstagram, color: '#E4405F' },
    { value: 'Facebook', icon: FaFacebook, color: '#1877F2' },
    { value: 'Twitter', icon: FaTwitter, color: '#1DA1F2' },
    { value: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
    { value: 'Google', icon: FaGoogle, color: '#4285F4' },
    { value: 'Email', icon: FaEnvelope, color: '#EA4335' },
    { value: 'Phone', icon: FaPhone, color: '#34A853' },
    { value: 'Website', icon: FaGlobe, color: '#7B68EE' },
    { value: 'Referral', icon: FaEllipsisH, color: '#6B7280' },
  ];

  // Available Team Members
  const availableTeamMembers: TeamMember[] = [
    { id: '1', name: 'Sarah Johnson', image: '/teampic1.png', role: 'Lead Photographer' },
    { id: '2', name: 'Priya', image: '/teampic2.png', role: 'Photographer' },
    { id: '3', name: 'Sofia', image: '/teampic3.png', role: 'Assistant' },
    { id: '4', name: 'Mike Chen', image: '/teampic4.png', role: 'Videographer' },
    { id: '5', name: 'David P.', image: '/teampic5.png', role: 'Photographer' },
    { id: '6', name: 'Alice Wong', image: '/teampic6.png', role: 'Editor' },
  ];

  // Handlers
  const handleSaveLeadSource = () => {
    setClientData(prev => ({ ...prev, leadSource: tempLeadSource }));
    setLeadSourceModalOpen(false);
  };

  const handleSaveTeam = () => {
    const newTeam = availableTeamMembers.filter(member => tempTeamIds.includes(member.id));
    setClientData(prev => ({ ...prev, assignedTeam: newTeam }));
    setTeamModalOpen(false);
  };

  const handleSaveNotes = () => {
    setClientData(prev => ({ ...prev, notes: tempNotes }));
    setNotesModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    // Use FormData to get values from the form
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const taskData = {
      name: formData.get('taskName'),
      assignee: formData.get('assignee'),
      priority: formData.get('priority'),
      dueDate: formData.get('dueDate'),
      description: formData.get('description'),
    };
    console.log('Task Added:', taskData);
    setIsTaskModalOpen(false);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const eventData = {
      title: formData.get('eventTitle'),
      status: formData.get('status'),
      location: formData.get('location'),
      date: formData.get('date'),
      deliverables: formData.get('deliverables')?.toString().split(',').map(s => s.trim()),
      team: formData.getAll('teamMember'),
    };
    console.log('Event Added:', eventData);
    setIsEventModalOpen(false);
  };

  const toggleTeamMember = (memberId: string) => {
    setTempTeamIds(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const getLeadSourceIcon = (source: string) => {
    const option = leadSourceOptions.find(opt => opt.value === source);
    return option?.icon || FaEllipsisH;
  };

  const getLeadSourceColor = (source: string) => {
    return leadSourceOptions.find(opt => opt.value === source)?.color || '#6B7280';
  };

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(eventSearch.toLowerCase()) || 
                         event.location.toLowerCase().includes(eventSearch.toLowerCase());
    const matchesFilter = eventStatusFilter === 'ALL' || event.status === eventStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const LeadSourceIcon = getLeadSourceIcon(clientData.leadSource);

  return (
    <div className='min-h-screen w-full flex flex-col items-start bg-white'>
      <Navbar />
      <div className='w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-6 md:px-8'>
        <Link
          href='/clients'
          className='flex items-center text-black hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-lg font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'>
          <FaArrowLeft className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
          Back to clients
        </Link>

        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 py-2'>
          <ClientProfile />

          <div className='w-full lg:w-3/5 xl:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-300'>
            <div className='flex flex-wrap justify-between border-b border-gray-300 mb-3 sm:mb-4 gap-2'>
              {['Overview', 'Events', 'Tasks', 'Contracts & Docs', 'Invoices & Payments'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base lg:text-lg font-medium transition-colors ${activeTab === tab
                    ? 'border-b-2 border-[#0B763E] text-black'
                    : 'text-black hover:text-gray-700'
                    }`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'Overview' && (
              <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                  <div className='w-full sm:w-1/2 bg-[#F4F4F5] p-4 sm:p-5 rounded-lg'>
                    <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>Lead Source</span>
                    <div className='flex flex-row justify-between items-center mt-3 sm:mt-4'>
                      <div className='flex flex-row items-center gap-2 sm:gap-3'>
                        <div
                          className='w-10 h-10 sm:w-12 sm:h-12 bg-white p-2 sm:p-3 rounded-full flex justify-center items-center'
                          style={{ border: `2px solid ${getLeadSourceColor(clientData.leadSource)}20` }}
                        >
                          <LeadSourceIcon
                            className='text-xl sm:text-2xl'
                            style={{ color: getLeadSourceColor(clientData.leadSource) }}
                          />
                        </div>
                        <span className='text-sm sm:text-base md:text-base lg:text-lg text-black font-medium'>
                          {clientData.leadSource}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setTempLeadSource(clientData.leadSource);
                          setLeadSourceModalOpen(true);
                        }}
                        className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'
                      >
                        <MdModeEditOutline className='text-base sm:text-lg' />
                      </button>
                    </div>
                  </div>

                  <div className='w-full sm:w-1/2 bg-[#F4F4F5] p-4 sm:p-5 rounded-lg'>
                    <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>Assigned Team</span>
                    <div className='flex flex-row justify-between items-center mt-3 sm:mt-4'>
                      <div className="flex items-center">
                        {clientData.assignedTeam.map((member, idx) => (
                          <div key={member.id} className="relative group" style={{ marginLeft: idx > 0 ? '-12px' : '0', zIndex: clientData.assignedTeam.length - idx }}>
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={40}
                              height={40}
                              className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover'
                            />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                              {member.name} - {member.role}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setTempTeamIds(clientData.assignedTeam.map(t => t.id));
                          setTeamModalOpen(true);
                        }}
                        className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'
                      >
                        <MdModeEditOutline className='text-base sm:text-lg' />
                      </button>
                    </div>
                  </div>
                </div>

                <div className='w-full bg-[#F4F4F5] p-4 sm:p-5 rounded-lg flex flex-col gap-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>Notes</span>
                    <button
                      onClick={() => {
                        setTempNotes(clientData.notes);
                        setNotesModalOpen(true);
                      }}
                      className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'
                    >
                      <MdModeEditOutline className='text-base sm:text-lg' />
                    </button>
                  </div>
                  <p className='text-sm sm:text-base md:text-base lg:text-lg text-black leading-relaxed'>
                    {clientData.notes}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'Events' && (
              <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='w-full bg-white p-4 sm:p-5 rounded-lg'>
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <div className='w-full sm:w-1/2'>
                      <SearchComponent 
                        placeHolder='Search Events' 
                        value={eventSearch}
                        onSearch={(val) => setEventSearch(val)}
                      />
                    </div>
                    <div className='w-full sm:w-1/2 flex justify-between items-center gap-3 relative'>
                      <div 
                        onClick={() => setShowEventFilter(!showEventFilter)}
                        className='flex items-center bg-[#F4F4F5] p-1.5 gap-1.5 rounded-lg border border-transparent hover:border-gray-200 cursor-pointer hover:bg-gray-200 transition duration-200'
                      >
                        <CiFilter className={`w-5 h-5 sm:w-6 sm:h-6 ${eventStatusFilter !== 'ALL' ? 'text-[#01B0E9]' : 'text-gray-500'}`} />
                        <span className={`text-sm sm:text-base font-medium ${eventStatusFilter !== 'ALL' ? 'text-[#01B0E9]' : 'text-black'}`}>
                          {eventStatusFilter === 'ALL' ? 'Filter' : eventStatusFilter}
                        </span>
                      </div>

                      {showEventFilter && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          {['ALL', 'COMPLETED', 'IN PROGRESS', 'NOT STARTED'].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setEventStatusFilter(status);
                                setShowEventFilter(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                eventStatusFilter === status ? 'bg-blue-50 text-[#01B0E9] font-bold' : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {status === 'ALL' ? 'All Statuses' : status}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className='w-48'>
                        <AddButton setOpenForm={() => setIsEventModalOpen(true)} title='Add Event' />
                      </div>
                    </div>
                  </div>
                  <div className='h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto mt-4 sm:mt-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6'>
                      {filteredEvents.map((event, index) => (
                        <div key={index} className='bg-[#F8F9FA] p-5 rounded-xl border border-gray-100 shadow-sm'>
                          <div className='flex justify-between items-start mb-1'>
                            <h4 className='text-[17px] font-bold text-gray-900 leading-tight flex-1'>
                              {event.title}
                            </h4>
                            <button className='text-gray-800 hover:text-black transition-colors pt-1 ml-3'>
                              <div className='flex gap-[2px] items-center'>
                                <div className='w-[3px] h-[3px] rounded-full bg-current'></div>
                                <div className='w-[3px] h-[3px] rounded-full bg-current'></div>
                                <div className='w-[3px] h-[3px] rounded-full bg-current'></div>
                              </div>
                            </button>
                          </div>

                          <div className='mb-4'>
                            <span className={`inline-block text-[11px] font-bold px-[16px] py-[4px] rounded-full uppercase tracking-wider ${event.status === 'COMPLETED'
                              ? 'text-white bg-[#13CC95]'
                              : event.status === 'IN PROGRESS'
                                ? 'text-white bg-[#01B0E9]'
                                : 'text-white bg-red-500'
                              }`}>
                              {event.status}
                            </span>
                          </div>

                          {/* Data Grid */}
                          <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
                            {/* Row 1: Location & Date */}
                            <div className='flex flex-col gap-1.5'>
                              <span className='text-[13px] text-[#949494] font-medium'>Location</span>
                              <div className='bg-white h-[38px] flex items-center justify-center rounded-lg border border-gray-200 px-3'>
                                <span className='text-[13px] font-bold text-gray-800 truncate'>{event.location}</span>
                              </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                              <span className='text-[13px] text-[#949494] font-medium'>Date</span>
                              <div className='bg-white h-[38px] flex items-center justify-center rounded-lg border border-gray-200 px-3'>
                                <span className='text-[13px] font-bold text-gray-800 whitespace-nowrap'>{event.date}</span>
                              </div>
                            </div>

                            {/* Row 2: Deliverables & Team */}
                            <div className='flex flex-col gap-1.5'>
                              <span className='text-[13px] text-[#949494] font-medium'>Deliverables</span>
                              <div className='text-[14px] font-bold text-gray-900 leading-[1.3] pt-0.5'>
                                {event.deliverables.join(', ')}
                              </div>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                              <span className='text-[13px] text-[#949494] font-medium'>Team</span>
                              <div className='flex flex-row gap-4 mt-0.5'>
                                {event.team.map((member, idx) => (
                                  <div key={idx} className='flex items-center gap-2 shrink-0'>
                                    <div className='relative w-[38px] h-[38px] rounded-full overflow-hidden border-[2.5px] border-white ring-1 ring-gray-100'>
                                      <Image
                                        src={`/teampic${(idx % 6) + 1}.png`}
                                        alt={member}
                                        fill
                                        className='object-cover'
                                      />
                                    </div>
                                    <span className='text-[14px] font-bold text-gray-900'>{member}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Contracts & Docs' && <Contracts />}

             {activeTab === 'Tasks' && (
              <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='w-full bg-white p-4 sm:p-5 rounded-lg'>
                  <div className='h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto mt-4 sm:mt-6 flex flex-col items-center justify-start pt-8 sm:pt-12'>
                    <div className='mb-6 sm:mb-8 w-full flex justify-center'>
                      <img src='/images/no-task.png' alt='No tasks' className='w-[100] h-[100] object-contain' />
                    </div>
                    <div className='text-center mb-6 sm:mb-8 flex justify-center'>
                      <p className='w-5/8 text-sm sm:text-base md:text-lg lg:text-xl text-black'>
                        No tasks yet! Create your first task to keep your workflow on track.
                      </p>
                    </div>
                    <div>
                      <AddButton setOpenForm={() => setIsTaskModalOpen(true)} title='Add Task' />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Invoices & Payments' && (
              <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
                {/* Summary Header */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div className='bg-white p-5 rounded-2xl border border-gray-200 shadow-sm'>
                    <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-1'>Total Billed</p>
                    <p className='text-2xl font-bold text-gray-900'>$12,450.00</p>
                  </div>
                  <div className='bg-white p-5 rounded-2xl border border-gray-200 shadow-sm'>
                    <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-1'>Total Paid</p>
                    <p className='text-2xl font-bold text-[#13CC95]'>$8,200.00</p>
                  </div>
                  <div className='bg-white p-5 rounded-2xl border border-gray-200 shadow-sm'>
                    <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-1'>Balance Due</p>
                    <p className='text-2xl font-bold text-[#01B0E9]'>$4,250.00</p>
                  </div>
                </div>

                <div className='w-full bg-white p-4 sm:p-5 rounded-lg border border-gray-200'>
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6'>
                    <div className='w-full sm:w-1/2'>
                      <SearchComponent 
                        placeHolder='Search Invoices' 
                        value={invoiceSearch}
                        onSearch={(val) => setInvoiceSearch(val)}
                      />
                    </div>
                    <div className='w-full sm:w-1/2 flex justify-between items-center gap-3 relative'>
                      <div 
                        onClick={() => setShowInvoiceFilter(!showInvoiceFilter)}
                        className='flex items-center bg-[#F4F4F5] p-1.5 gap-1.5 rounded-lg border border-transparent hover:border-gray-200 cursor-pointer hover:bg-gray-200 transition duration-200'
                      >
                        <CiFilter className={`w-5 h-5 sm:w-6 sm:h-6 ${invoiceStatusFilter !== 'ALL' ? 'text-[#01B0E9]' : 'text-gray-500'}`} />
                        <span className={`text-sm sm:text-base font-medium ${invoiceStatusFilter !== 'ALL' ? 'text-[#01B0E9]' : 'text-black'}`}>
                          {invoiceStatusFilter === 'ALL' ? 'Filter' : invoiceStatusFilter}
                        </span>
                      </div>

                      {showInvoiceFilter && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          {['ALL', 'PAID', 'UNPAID', 'PARTIAL'].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setInvoiceStatusFilter(status);
                                setShowInvoiceFilter(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                invoiceStatusFilter === status ? 'bg-blue-50 text-[#01B0E9] font-bold' : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {status === 'ALL' ? 'All Statuses' : status}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className='w-48'>
                        <AddButton setOpenForm={() => router.push(`/addInvoice?clientId=${clientId}`)} title='Add Invoice' />
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4 max-h-[500px] overflow-y-auto scroller pr-1'>
                    {/* Mock Invoices */}
                    {[
                      { type: "Invoice", invoiceId: "INV-2025-001", reference: "Wedding Photography - Sarah & John", totalAmount: "5500.00", balanceDue: "0.00", status: "PAID" },
                      { type: "Invoice", invoiceId: "INV-2025-004", reference: "Pre-Wedding Shoot - Sarah & John", totalAmount: "2500.00", balanceDue: "1500.00", status: "PARTIAL" },
                      { type: "Invoice", invoiceId: "INV-2025-007", reference: "Engagement Session Add-on", totalAmount: "1200.00", balanceDue: "1200.00", status: "UNPAID" }
                    ].filter(inv => {
                      const matchesSearch = inv.reference.toLowerCase().includes(invoiceSearch.toLowerCase()) || 
                                           inv.invoiceId.toLowerCase().includes(invoiceSearch.toLowerCase());
                      const matchesFilter = invoiceStatusFilter === 'ALL' || inv.status === invoiceStatusFilter;
                      return matchesSearch && matchesFilter;
                    }).map((invoice, idx) => (
                      <InvoiceCard 
                        key={idx}
                        {...(invoice as any)}
                        clientId={clientId}
                      />
                    ))}

                    {/* Redux Invoices */}
                    {invoices?.filter((inv: any) => {
                      const matchesId = inv.clientId === clientId;
                      const matchesSearch = (inv.reference?.toLowerCase().includes(invoiceSearch.toLowerCase()) || 
                                             inv.id?.toLowerCase().includes(invoiceSearch.toLowerCase()));
                      const matchesFilter = invoiceStatusFilter === 'ALL' || inv.status === invoiceStatusFilter;
                      return matchesId && matchesSearch && matchesFilter;
                    }).map((invoice: any) => (
                      <InvoiceCard 
                        key={invoice.id}
                        {...invoice}
                        clientId={clientId}
                        invoiceId={invoice.id}
                        type="Invoice"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Source Modal */}
      <Modal isOpen={leadSourceModalOpen} onClose={() => setLeadSourceModalOpen(false)} title="Edit Lead Source">
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {leadSourceOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = tempLeadSource === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setTempLeadSource(option.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${isSelected ? 'border-[#01B0E9] bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${option.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: option.color }} />
                </div>
                <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{option.value}</span>
                {isSelected && (
                  <div className="ml-auto w-5 h-5 bg-[#01B0E9] rounded-full flex items-center justify-center">
                    <MdCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setLeadSourceModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
            Cancel
          </button>
          <button onClick={handleSaveLeadSource} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#01B0E9] hover:bg-[#0095c7] rounded-md transition-colors">
            Save
          </button>
        </div>
      </Modal>

      {/* Team Modal */}
      <Modal isOpen={teamModalOpen} onClose={() => setTeamModalOpen(false)} title="Edit Assigned Team">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {availableTeamMembers.map((member) => {
            const isSelected = tempTeamIds.includes(member.id);
            return (
              <button
                key={member.id}
                onClick={() => toggleTeamMember(member.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${isSelected ? 'border-[#01B0E9] bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Image src={member.image} alt={member.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-[#01B0E9] rounded-full flex items-center justify-center">
                    <MdCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setTeamModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
            Cancel
          </button>
          <button onClick={handleSaveTeam} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#01B0E9] hover:bg-[#0095c7] rounded-md transition-colors">
            Save ({tempTeamIds.length} selected)
          </button>
        </div>
      </Modal>

      {/* Notes Modal */}
      <Modal isOpen={notesModalOpen} onClose={() => setNotesModalOpen(false)} title="Edit Notes">
        <textarea
          value={tempNotes}
          onChange={(e) => setTempNotes(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent resize-none"
          placeholder="Add notes about this client..."
        />
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setNotesModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
            Cancel
          </button>
          <button onClick={handleSaveNotes} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#01B0E9] hover:bg-[#0095c7] rounded-md transition-colors">
            Save
          </button>
        </div>
      </Modal>

      {/* Add Task Modal */}
      <Modal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        title="Add New Task"
      >
        <form onSubmit={handleAddTask} className="space-y-5">
          <div className="space-y-4">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Task Name</label>
              <input 
                name="taskName"
                type="text" 
                required
                placeholder="e.g., Follow up with Sarah"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            {/* Assignee & Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Assignee</label>
                <select 
                  name="assignee"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition-all text-sm bg-white"
                >
                  <option value="">Select Assignee</option>
                  {availableTeamMembers.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                <select 
                  name="priority"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition-all text-sm bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
              <input 
                name="dueDate"
                type="date" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea 
                name="description"
                rows={3}
                placeholder="Additional details about this task..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition-all text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => setIsTaskModalOpen(false)} 
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#01B0E9] hover:bg-[#0095c7] rounded-full transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Event Modal */}
      <Modal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
        title="Add New Event"
      >
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
            <input 
              name="eventTitle" 
              type="text" 
              required 
              placeholder="e.g., Wedding Ceremony" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] outline-none text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select name="status" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none">
                <option value="NOT STARTED">Not Started</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
              <input name="date" type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
            <input name="location" type="text" placeholder="e.g., Toronto City Hall" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Deliverables</label>
            <input name="deliverables" type="text" placeholder="e.g., Photos, Video (comma separated)" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Team</label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border border-gray-100 rounded-lg">
              {availableTeamMembers.map(m => (
                <label key={m.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input type="checkbox" name="teamMember" value={m.name} className="rounded text-[#01B0E9]" />
                  <span className="text-sm text-gray-600">{m.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setIsEventModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#01B0E9] hover:bg-[#0095c7] rounded-full">Add Event</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClientProfilePage;