'use client';

import { clearCredientials } from '@/store/slices/authSlice';
import { persistor } from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import { FaCamera, FaQuestionCircle, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import CreateWorkspaceModal from '@/app/components/forms/CreateWorkspace';
import Companies from '@/app/components/ui/Companies';
import { logOut } from '@/firebase_Routes/routes';
import { auth } from '@/config/firebase';
import { toast } from 'react-toastify';


interface ProfileModalProps {
  setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  companies: any;
  isProfileOpen: boolean;
  firestoreUser: any;
}


export default function ProfileModal({ setProfileOpen, companies, isProfileOpen, firestoreUser }: ProfileModalProps) {
  const dispatch = useDispatch();
  const [workspace, setWorkspaceOpen] = useState(false);
  const router = useRouter();
  const firebaseUser = auth.currentUser;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const displayName = firestoreUser?.displayName || firebaseUser?.displayName || "User";
  const email = firestoreUser?.email || firebaseUser?.email || "";

  const handleLogout = async () => {
    try {
      const res = await logOut();
      if (res.success) {
        toast.success("Successfully logged out");
        // Opt-in clearance if Redux persists
        dispatch(clearCredientials());
        persistor.purge();

        router.push('/');
      } else {
        toast.error(res.error || "Failed to log out");
      }
    } catch (err) {
      console.error("Sign Out API error:", err);
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 p-4"
        onClick={() => setProfileOpen(false)}
      >
        <div 
          className="absolute top-20 right-10 bg-white rounded-2xl shadow-2xl w-full max-w-80 p-2 space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row gap-2 items-center space-y-3">
            <div 
              className="relative rounded-full group w-16 h-16 b cursor-pointer"
              onClick={handleImageClick}
            >
              <Image 
                alt='User Profile' 
                src={previewImage || firestoreUser?.photoURL || firebaseUser?.photoURL || '/images/userprofile.png'} 
                width={64} 
                height={64} 
                className="w-16 h-16 rounded-full object-cover" 
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
              <span className='text-xs text-center text-white hidden group-hover:block w-16 h-16 bg-black/60 pt-2 top-0 rounded-full absolute'>Upload Photo Max 5mb</span>
              <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 shadow-md border border-gray-200">
                <FaCamera className="w-3 h-3 text-white" />
              </div>
            </div>
            <div >
              <p className="text-sm text-gray-500">{displayName}</p>
              <p className="text-md font-medium text-gray-900 truncate max-w-[200px]">{email}</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />
          {/* Companies */}
          <Companies companies={companies} setWorkspaceOpen={setWorkspaceOpen} />
          <button onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setWorkspaceOpen(true)
          }} className="w-full flex items-center space-x-3 px-1 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className='bg-[#00A4DD] p-1 rounded-full'>
              <BiPlus className="w-6 h-6 text-white " />

            </div>
            <span className="text-gray-800 font-medium">Create New Workpace</span>
          </button>

          {/* Menu Items */}
          <div className="space-y-1">
            <Link 
              href="/help"
              onClick={() => setProfileOpen(false)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaQuestionCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Help Center</span>
            </Link>
            <hr className="border-gray-100" />
            <Link 
              href="/privacy"
              onClick={() => setProfileOpen(false)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaShieldAlt className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Privacy Policy</span>
            </Link>
            <hr className="border-gray-100" />
          </div>


          <div className='flex items-center justify-end '>
            <button onClick={handleLogout}
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
