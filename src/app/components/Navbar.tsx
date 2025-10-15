"use client";
import Image from "next/image";
import Link from "next/link";
// components/Navbar.jsx
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const tabs = [
    { name: "Dashboard", icon: "/images/home.png", href: "/dashboard" },
    { name: "Clients", icon: "/images/users.png", href: "/clients" },
    { name: "Production", icon: "/images/film.png", href: "/production" },
    { name: "Leads", icon: "/images/leads.png", href: "/leads" },
    { name: "Jobs", icon: "/images/briefcase.png", href: "/jobs" },
    { name: "Calendar", icon: "/images/calendar.png", href: "/calendar" },
    { name: "Team", icon: "/images/team.png", href: "/team" },
    { name: "Payments", icon: "/images/creditcard.png", href: "/payments" },
    { name: "Reports", icon: "/images/chart-histogram.png", href: "/reports" },
    { name: "Settings", icon: "/images/settings.png", href: "/settings" },
  ];

  return (
    <nav className="bg-white ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="VeloFolio Logo"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-10 md:w-24 md:h-10 lg:w-28 lg:h-15"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className="text-gray-700 hover:bg-blue-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex flex-col items-center"
              >
                <Image
                  src={tab.icon}
                  alt={`${tab.name} Icon`}
                  width={24} // Base width for icons
                  height={24} // Base height for icons
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 mb-1" // Responsive sizes with margin-bottom
                />
                {tab.name}
              </Link>
            ))}
          </div>

          {/* Profile Dropdown */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <div className=" rounded-full h-8 w-8 flex items-center justify-center text-white">
                <Image
                  src="/images/userprofile.png" // Assuming a user circle image
                  alt="User Icon"
                  width={24}
                  height={24}
                  className="w-16 h-8"
                />
              </div>
              <span className="ml-2 text-sm font-medium">Demo User</span>
              <Image
                src="/images/chevron-down.svg" // Assuming a chevron down image
                alt="Dropdown Icon"
                width={16}
                height={16}
                className="ml-1 w-4 h-4"
              />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <Image
                  src="/images/times.png" // Assuming a times image
                  alt="Close Icon"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              ) : (
                <Image
                  src="/images/bars.png" // Assuming a bars image
                  alt="Menu Icon"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className="text-gray-700 hover:bg-blue-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <Image
                  src={tab.icon}
                  alt={`${tab.name} Icon`}
                  width={20} // Slightly smaller for mobile
                  height={20}
                  className="w-5 h-5 mr-2"
                />
                {tab.name}
              </Link>
            ))}
            {/* Profile in mobile menu */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center px-3">
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center text-white">
                  <Image
                    src="/images/user-circle.png" // Assuming a user circle image
                    alt="User Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <span className="ml-2 text-base font-medium">Demo User</span>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
