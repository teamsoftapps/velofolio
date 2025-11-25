'use client';

import { clearCredientials } from '@/store/slices/authSlice';
import { persistor } from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import { FaCamera, FaQuestionCircle, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import CreateWorkspaceModal from './CreateWorkspace';
import Companies from './Companies';
import { useSignOutMutation } from '@/store/apis/Auth';
import { toast } from 'react-toastify';


interface ProfileModalProps {
   setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
   companies:any
}


export default function ProfileModal({ setProfileOpen ,companies}: ProfileModalProps) {
  // const [companies, setCompanies] = useState([]);
  const dispatch = useDispatch();
  const [workspace, setWorkspaceOpen] = useState(false);
  const router=useRouter()
const user=useSelector((state:any)=>state.persisted.auth.user)
const [signOut, { isLoading }] = useSignOutMutation();
const handleLogout=async()=>{

  const res = await signOut({}).unwrap();
  toast.success(res.msg);
  dispatch(clearCredientials());
  persistor.purge();
  router.push('/')

  
}
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 p-4"
        onClick={() => setProfileOpen(false)}
        >
          <div className="absolute top-20 right-10 bg-white rounded-2xl shadow-2xl w-full max-w-80 p-2 space-y-2">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row gap-2 items-center space-y-3">
              <div className="relative rounded-full group w-16 h-16 b cursor-pointer">
                <Image alt='0' src="/images/userprofile.png" width={100} height={100} className="w-16 h-16 rounded-full   " />
                <span className='text-xs text-center text-white hidden  group-hover:block w-16 h-16 bg-black/60 pt-2 top-0 rounded-full absolute'>Upload Photo Max 5mb</span>
                <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 shadow-md border border-gray-200">
                  <FaCamera className="w-3 h-3 text-white" />
                </div>
              </div>
              <div >
                <p className="text-sm text-gray-500">{user?.full_name}</p>
                <p className="text-md font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />
            {/* Companies */}
     <Companies companies={companies} setWorkspaceOpen={setWorkspaceOpen} />
           <button onClick={(e)=>{
              e.preventDefault()
              e.stopPropagation()
              setWorkspaceOpen(true)}} className="w-full flex items-center space-x-3 px-1 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className='bg-[#00A4DD] p-1 rounded-full'>
              <BiPlus className="w-6 h-6 text-white " />

              </div>
              <span className="text-gray-800 font-medium">Create New Workpace</span>
            </button>
        
            {/* Menu Items */}
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                               <span className="text-gray-800 font-medium">Help</span>
              </button>
              <hr className="border-gray-200" />
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FaShieldAlt className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800 font-medium">Privacy</span>
              </button>
                <hr className="border-gray-200" />
            </div>

            
            <div className='flex items-center justify-end '>
            <button  onClick={handleLogout}
                               className="w-full text-center bg-black text-md text-white rounded-full py-2 sm:w-32 space-x-2  hover:bg-gray-800 transition-colors">
              
              <span>Sign Out</span>
            </button>
            </div>
          </div>
        </div>
        {workspace && <CreateWorkspaceModal setWorkspaceOpen={setProfileOpen} />}
    
    </>
  );
}