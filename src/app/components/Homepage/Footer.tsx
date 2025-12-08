// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';
import { DiAndroid } from "react-icons/di";
import { FaApple } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">

        {/* Logo + Brand (centered on mobile, left on desktop) */}
        <div className="flex justify-center lg:justify-center mb-12">
          <Link href="/" className="flex items-center gap-3">
         <Image src="/images/blacklogo.png" alt="Logo" width={150} height={150} />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-sm font-medium">
          {['Home', 'Pricing', 'Features', 'Resources', 'About us'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Divider Line */}
      

        {/* Bottom Section */}
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-8 text-sm">

          {/* Left: Social + Mobile App */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center  gap-10 lg:gap-16 w-full justify-between">

            {/* Follow Us + Social Icons */}
            <div className="flex-col flex sm:flex-row items-center gap-6">
              <span className="text-gray-500">Follow Us</span>
              <div className="flex gap-5">
                <a href="#" aria-label="Facebook" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            {/* Mobile App */}
            <div className="flex sm:flex-row flex-col items-center gap-6">
              <span className="text-gray-500">Mobile app</span>
              <div className="flex gap-4">
                <a href="#" aria-label="App Store" className="hover:text-white transition">
                 <FaApple className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Google Play" className="hover:text-white transition">
            <DiAndroid className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Legal Links */}
         
        </div>
          <div className="w-full mt-12  h-px bg-gray-800 mb-10"></div>
<div className=' flex sm:flex-row flex-col-reverse items-center  justify-between w-full'>
        {/* Copyright */}
        <div className="text-sm text-center lg:text-left  text-gray-500 my-3">
          © 2025 VeloFolio. All rights reserved.
        </div>
         <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium">
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}