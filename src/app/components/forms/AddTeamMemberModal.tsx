
// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { MdClose, MdSearch, MdCheck, MdPersonAdd } from 'react-icons/md';
// import InviteMember from './InviteMember';
// import Image from 'next/image';
// import { CgSandClock } from "react-icons/cg";
// import { useGetInvitedUsersQuery, useInviteMemberMutation } from '@/store/apis/Common';

// interface Member {
//   _id?: string;
//   id?: string;
//   name: string;
//   role: string;
//   status?: 'pending';
//   avatar?: string;
//   image?: string;
//   email?: string
// }

// const workspaceMembers: Member[] = [
//   { id: '1', image: '/teampic1.png', name: 'John Smith', role: 'Editor',email:'john.doe@example.com'  },
//   { id: '2', image: '/teampic2.png', name: 'Sara Lee', role: 'Designer' },
//   { id: '3', image: '/teampic3.png', name: 'Sarah Johnson', role: 'Designer', status: 'pending' },
// ];

// const BoardMembers = [
//   { id: '1', name: 'John Smith', role: 'Editor' },
//   { id: '2', name: 'Sara Lee', role: 'Designer' },
//   { id: '3', name: 'Sarah Johnson', role: 'Designer' },
//   { id: '4', name: 'Mike Chen', role: 'Developer' },

// ];

// export default function AddTeamMembersModal({
//   isOpen,
//   onClose,
//   boardMembers: propBoardMembers = [],   
//   onAddMembers,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   boardMembers?: Member[];
//   onAddMembers: (members: Member[]) => void;
// }) {
 
//   const boardMembersList =
//   propBoardMembers && propBoardMembers.length > 0
//     ? propBoardMembers
//     : BoardMembers;

//   const [selectedMembers, setSelectedMembers] = useState<Member[]>(() => boardMembersList);

// // Initialize workspaceMembers with the propBoardMembers or BoardMembers
// const [workspaceMembers, setWorkspaceMembers] = useState<Member[]>(
//  []
// );

//   const [searchQuery, setSearchQuery] = useState('');
//   const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);


//   const {data, isLoading}= useGetInvitedUsersQuery({})
// useEffect(() => {
//   if (data) setWorkspaceMembers(data);
// }, [data]);

//   // Filter members based on search
//   console.log(workspaceMembers)
//   const filteredMembers = useMemo(() => {
//   return workspaceMembers.filter(
//     (member) =>
//       member?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member?.role?.toLowerCase().includes(searchQuery.toLowerCase())||
//       member?.email?.toLowerCase().includes(searchQuery.toLowerCase())
//   );
// }, [workspaceMembers, searchQuery]); // <-- also depend on workspaceMembers


// const toggleMember = (member: Member) => {
//   setSelectedMembers((prev) => {
//     const exists = prev.some(
//       (m) => m._id === member._id || m.id === member.id
//     );

//     if (exists) {
//       return prev.filter(
//         (m) => !(m._id === member._id || m.id === member.id)
//       );
//     }

//     return [...prev, member];
//   });
// };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div className="fixed inset-0  bg-opacity-50 z-40" onClick={onClose} />

//       {/* Modal */}
//       <div className="absolute top-14 -right-7.5 sm:right-0 w-80 sm:w-96 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-md shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between p-3 text-black">
//             <h2 className="text-md font-medium text-gray-900">
//               Add Team Members to this Board
//             </h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <MdClose className="w-6 h-6 text-black" />
//             </button>
//           </div>

//           {/* Search */}
//           <div className="px-4 text-black">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search team members"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-4 pr-10 py-2 text-black bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <MdSearch className="absolute right-3 top-2 w-5 h-5 text-black" />
//             </div>
//           </div>

//           {/* Board Members (Already Added) */}
//           {propBoardMembers && (
//             <div className="px-6 pb-2 mt-3  w-full">
//               <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
//                 Board members
//               </p>
//               <div className="space-y-2">
//                 {propBoardMembers.map((member) => (
//                   <div
//                     key={member.id}                     
//                     className="flex items-center justify-between p-1 rounded-lg w-full"
//                   >
//                     <div className="flex items-center gap-3 w-full">
//                       <Image
//                         src={member.image ?? '/teampic1.png'}
//                         alt={member.name}
//                         width={40}
//                         height={40}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div className="flex w-full items-center justify-between  ">
//                         <p className="text-sm font-medium text-gray-900">{member.name}</p>
//                         <p className="text-xs text-black mr-4">{member.role}</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => toggleMember(member)}  
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <MdClose className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Workspace Members */}
//           <div className="px-6 pb-4">
//             <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
//               Workspace members
//             </p>
//             <div className="space-y-1 h-40 overflow-y-auto scroller">
//               {filteredMembers.map((member) => {
//                 const isSelected = selectedMembers.some((m) => m._id === member._id || m.id === member.id);
//                 const isPending = member.status === 'pending';

//                 return (
//                   <button
//                     key={member._id}                   
//                     onClick={() => !isPending && toggleMember(member)}
//                     disabled={isPending}
//                     className={`w-full flex items-center justify-between p-1 rounded-lg transition-all ${
//                       isSelected
//                         ? ''
//                         : isPending
//                           ? 'cursor-not-allowed'
//                           : 'hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3  w-full">
//                     {member.status === 'pending' ? (
//   <div className="w-5 h-5 flex items-center justify-center">
//     <CgSandClock className="w-5 h-5 text-gray-400" />
//   </div>
// ) : isSelected ? (
//   <div className="w-5 h-5 bg-[var(--primary-color)] rounded flex items-center justify-center">
//     <MdCheck className="w-3 h-3 text-white" />
//   </div>
// ) : (
//   <div className="w-5 h-5 border-2 border-gray-300 rounded" />
// )}
//                       <div className={`flex items-center gap-3 w-full ${isPending ? 'opacity-50' : ''}` }>
//                         {/* <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
//                           {member.name.charAt(0)}
//                         </div> */}
//                           <Image
//                         src={'/teampic1.png'}
//                         alt={member.email??'Team Member Image'}
//                         width={40}
//                         height={40}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                         <div className=" flex items-center   justify-between w-full flex-wrap">
//                           <p className="text-sm min-w-[100px] font-medium text-gray-900 flex items-center gap-1">
//                             {member.name===''?member.email:member.name}
                           
//                           </p>
//                            {isPending && <span className="text-xs text-black">(Pending)</span>}
//                           <p className="text-xs text-black">({member.role})</p>
//                         </div>
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Invite New Member */}
//             <button
//               className="w-full mt-2 flex items-center justify-center gap-2 p-4 cursor-pointer text-[var(--primary-color)] hover:bg-blue-50 rounded-lg transition-colors"
//               onClick={() => setIsInviteModalOpen(true)}
//             >
//               <MdPersonAdd className="w-5 h-5" />
//               <span className="text-sm font-medium">Invite New Member</span>
//             </button>

//             {/* Invite Modal */}
//             <InviteMember
//               isOpen={isInviteModalOpen}
//               onClose={() => setIsInviteModalOpen(false)}
//               setWorkspaceMembers={setWorkspaceMembers}
            
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MdClose, MdSearch, MdCheck, MdPersonAdd } from 'react-icons/md';
import InviteMember from './InviteMember';
import Image from 'next/image';
import { CgSandClock } from "react-icons/cg";
import { useGetInvitedUsersQuery } from '@/store/apis/Common';

interface Member {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  status?: 'pending';
  avatar?: string;
  image?: string;
  email?: string;
}

export default function AddTeamMembersModal({
  isOpen,
  onClose,
  boardMembers: propBoardMembers = [],
  onAddMembers,
}: {
  isOpen: boolean;
  onClose: () => void;
  boardMembers?: Member[];
  onAddMembers: (members: Member[]) => void;
}) {

  const [boardMembers, setBoardMembers] = useState<Member[]>(propBoardMembers);
const [workspaceMembers, setWorkspaceMembers] = useState<Member[]>([
  { id: '1', name: 'John Doe', role: 'Editor', email: 'john@example.com', image: '/teampic1.png' },
  { id: '2', name: 'Sara Lee', role: 'Designer', email: 'sara@example.com', image: '/teampic2.png' },
  { id: '3', name: 'Mike Chen', role: 'Developer', email: 'mike@example.com', status: 'pending', image: '/teampic3.png' },
  { id: '4', name: 'Alice Wong', role: 'Tester', email: 'alice@example.com', image: '/teampic4.png' },
  { id: '5', name: 'Bob Smith', role: 'Manager', email: 'bob@example.com', image: '/teampic5.png' },
]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const { data, isLoading } = useGetInvitedUsersQuery({});

  // Load workspace members from API
  useEffect(() => {
    if (data) setWorkspaceMembers(data);
  }, [data]);

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    return workspaceMembers.filter(
      (member) =>
        member?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member?.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [workspaceMembers, searchQuery]);

  // Add member to board
  const selectMember = (member: Member) => {
    if (member.status === 'pending') return;
    const memberId = member._id || member.id;
    if (!memberId) return;

    // If not already in boardMembers, add
    if (!boardMembers.some((m) => (m._id || m.id) === memberId)) {
      const updatedBoard = [...boardMembers, member];
      setBoardMembers(updatedBoard);
      onAddMembers(updatedBoard);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="absolute top-14 -right-7.5 sm:right-0 w-80 sm:w-96 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-md shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-3 text-black">
            <h2 className="text-md font-medium text-gray-900">
              Add Team Members to this Board
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <MdClose className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 text-black">
            <div className="relative">
              <input
                type="text"
                placeholder="Search team members"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-black bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MdSearch className="absolute right-3 top-2 w-5 h-5 text-black" />
            </div>
          </div>

          {/* Board Members */}
          {boardMembers && (
            <div className="px-6 pb-2 mt-3 w-full">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Board members
              </p>
              <div className="space-y-2 max-h-40  overflow-y-scroll scroller">
                {boardMembers.length === 0 && (
                  <p className="text-md text-gray-500 text-center">No members added yet</p>
                )}
                {boardMembers.map((member) => (
                  <div
                    key={member._id || member.id}
                    className="flex items-center justify-between p-1 rounded-lg w-full"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Image
                        src={member.image ?? '/teampic1.png'}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{member.name || member.email}</p>
                        <p className="text-xs text-black mr-4">{member.role.charAt(0).toUpperCase() + member.role.slice(1)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setBoardMembers((prev) =>
                          prev.filter((m) => (m._id || m.id) !== (member._id || member.id))
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MdClose className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workspace Members */}
          <div className="px-6 pb-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Workspace members
            </p>

            {isLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-1 h-40 overflow-y-auto scroller">
                {filteredMembers.map((member) => {
                  const memberId = member._id || member.id;
                  const isSelected = boardMembers.some((m) => (m._id || m.id) === memberId);
                  const isPending = member.status === 'pending';

                  return (
                    <button
                      key={memberId}
                      onClick={() => !isPending && selectMember(member)}
                      disabled={isPending}
                      className={`w-full flex items-center justify-between p-1 rounded-lg transition-all ${
                        isSelected ? '' : isPending ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {isPending ? (
                          <CgSandClock className="w-5 h-5 text-gray-400" />
                        ) : isSelected ? (
                          <div className="w-5 h-5 bg-[var(--primary-color)] rounded flex items-center justify-center">
                            <MdCheck className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                        )}

                        <div className={`flex items-center gap-3 w-full ${isPending ? 'opacity-50' : ''}`}>
                          <Image
                            src={member.image ?? '/teampic1.png'}
                            alt={member.email ?? 'Team Member'}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex items-center justify-between w-full flex-wrap">
                            <p className="text-sm min-w-[100px] font-medium text-gray-900 flex items-center gap-1">
                              {member.name || member.email}
                            </p>
                            {isPending && <span className="text-xs text-black">(Pending)</span>}
                            <p className="text-xs text-black">({member.role})</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Invite New Member */}
            <button
              className="w-full mt-2 flex items-center justify-center gap-2 p-4 cursor-pointer text-[var(--primary-color)] hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => setIsInviteModalOpen(true)}
            >
              <MdPersonAdd className="w-5 h-5" />
              <span className="text-sm font-medium">Invite New Member</span>
            </button>

            {/* Invite Modal */}
            <InviteMember
              isOpen={isInviteModalOpen}
              onClose={() => setIsInviteModalOpen(false)}
              setWorkspaceMembers={setWorkspaceMembers}
            />
          </div>
        </div>
      </div>
    </>
  );
}
