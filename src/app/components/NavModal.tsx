'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaCamera, FaQuestionCircle, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';

interface ProfileModalProps {
   setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileModal({ setProfileOpen }: ProfileModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 p-4"
        onClick={() => setProfileOpen(false)}>
          <div className="absolute top-20 right-10 bg-white rounded-2xl shadow-2xl w-full max-w-80 p-2 space-y-2">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row gap-2 items-center space-y-3">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gray-300" />
                </div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200">
                  <FaCamera className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div >
                <p className="text-sm text-gray-500">Velofolio</p>
                <p className="text-md font-medium text-gray-900">Velofolio@gmail.com</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

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

            {/* Sign Out Button */}
            <div className='flex items-center justify-end '>
            <Link href="/" className="w-full text-center bg-black text-md text-white rounded-full py-2 sm:w-32 space-x-2  hover:bg-gray-800 transition-colors">
              
              <span>Sign Out</span>
            </Link>
            </div>
          </div>
        </div>
    
    </>
  );
}