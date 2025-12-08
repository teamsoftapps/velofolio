// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Only icons, optional — you can replace with SVG too
import Image from 'next/image';

export default function NavHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Features', href: '/features' },
    { name: 'Resources', href: '/resources' },
    { name: 'About us', href: '/about' },
  ];

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white">
        <nav className="container mx-auto  py-1 flex  items-center justify-between px-4 sm:px-6 lg:px-2">
          <div className='flex items-center gap-20'>
                       <Link
            
                href={"/"}
                className='text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors duration-200'
              
                >
              <Image
  src="/images/logo.png"
  alt="Icon"
  width={150}  // match w-44
  height={40}  // match h-16
  className="object-contain mr-3"
/>

                {/* {tab.name} */}
              </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
</div>
          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/signin"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#01B0E9] hover:bg-[#01B0E9]/90 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            
              <Menu className="h-7 w-7 text-gray-700" />
       
          </button>
        </nav>

        {/* Mobile Menu - Custom Dropdown */}
      <div
  className={`lg:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 p-2 shadow-lg z-50 transition-all duration-300 ease-in-out ${
    mobileMenuOpen
      ? 'opacity-100 translate-y-0 visible'
      : 'opacity-0 -translate-y-4 invisible'
  }`}
>
   {mobileMenuOpen &&
              <X className="h-7 w-7 text-gray-700 absolute right-3 top-3 " />
   }
          <div className="container mx-auto px-6 py-6 flex flex-col gap-12 h-screen ">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer bg-gray-50 w-full"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-6 flex flex-col gap-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                 className="bg-cyan-500/70 text-white font-medium text-center py-3 rounded-full transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-center py-3 rounded-full transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 bg-opacity-30 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
}