// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// const Navbar = () => {
//   const router = useRouter();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const tabs = [
//     { name: "Dashboard", icon: "/images/home.png", href: "/Dashboard" },
//     { name: "Clients", icon: "/images/users.png", href: "/Clients" },
//     { name: "Production", icon: "/images/film.png", href: "/Production" },
//     { name: "Leads", icon: "/images/leads.png", href: "/Leads" },
//     { name: "Jobs", icon: "/images/briefcase.png", href: "/Jobs" },
//     { name: "Calendar", icon: "/images/calendar.png", href: "/Calendar" },
//     { name: "Team", icon: "/images/team.png", href: "/Team" },
//     { name: "Payments", icon: "/images/creditcard.png", href: "/Payments" },
//     { name: "Reports", icon: "/images/chart-histogram.png", href: "/Reports" },
//     { name: "Settings", icon: "/images/settings.png", href: "/Settings" },
//   ];

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50 ">
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
//         <div className="flex items-center justify-between h-16 sm:h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/">
//               <Image
//                 src="/images/logo.png"
//                 alt="VeloFolio Logo"
//                 width={80}
//                 height={80}
//                 className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
//                 priority
//               />
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
//             {tabs.map((tab) => (
//               <Link
//                 key={tab.name}
//                 href={tab.href}
//                 className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-2 py-2 rounded-lg text-sm font-medium flex flex-col items-center transition-colors duration-200"
//               >
//                 <Image
//                   src={tab.icon}
//                   alt={`${tab.name} Icon`}
//                   width={20}
//                   height={20}
//                   className="w-5 h-5 mb-1"
//                 />
//                 <span>{tab.name}</span>
//               </Link>
//             ))}
//           </div>

//           {/* Profile Dropdown */}
//           <div className="hidden lg:flex items-center relative">
//             <button
//               onClick={() => setIsProfileOpen(!isProfileOpen)}
//               className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200"
//               aria-label="Toggle profile menu"
//             >
//               <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-200">
//                 <Image
//                   src="/images/userprofile.png"
//                   alt="User Profile"
//                   width={24}
//                   height={24}
//                   className="w-6 h-6 object-cover"
//                 />
//               </div>
//               <span className="ml-2 text-sm font-medium hidden xl:inline">
//                 Demo User
//               </span>
//               <Image
//                 src="/images/chevron-down.svg"
//                 alt="Dropdown Icon"
//                 width={16}
//                 height={16}
//                 className="ml-1 w-4 h-4"
//               />
//             </button>
//             {isProfileOpen && (
//               <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 ring-1 ring-black ring-opacity-5">
//                 <button
//                   onClick={() => router.push("/ClientProfile")}
//                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={() => console.log("Settings clicked")}
//                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Settings
//                 </button>
//                 <button
//                   onClick={() => console.log("Logout clicked")}
//                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Hamburger Menu (Visible below 1024px) */}
//           <div className="lg:hidden flex items-center">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-md"
//               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//             >
//               {isMobileMenuOpen ? (
//                 <FaTimes className="w-6 h-6" />
//               ) : (
//                 <FaBars className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-200">
//           <div className="px-4 py-4 space-y-1 sm:px-6">
//             {tabs.map((tab) => (
//               <Link
//                 key={tab.name}
//                 href={tab.href}
//                 className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors duration-200"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Image
//                   src={tab.icon}
//                   alt={`${tab.name} Icon`}
//                   width={20}
//                   height={20}
//                   className="w-5 h-5 mr-3"
//                 />
//                 {tab.name}
//               </Link>
//             ))}
//             {/* Profile in Mobile Menu */}
//             <div className="border-t border-gray-200 pt-4">
//               <div className="flex items-center px-3 mb-3">
//                 <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-200">
//                   <Image
//                     src="/images/userprofile.png"
//                     alt="User Profile"
//                     width={24}
//                     height={24}
//                     className="w-6 h-6 object-cover"
//                   />
//                 </div>
//                 <span className="ml-3 text-base font-medium text-gray-700">
//                   Demo User
//                 </span>
//               </div>
//               <div className="space-y-1">
//                 <Link
//                   href="/profile"
//                   className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <Link
//                   href="/settings"
//                   className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Settings
//                 </Link>
//                 <Link
//                   href="/logout"
//                   className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Logout
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const tabs = [
    { name: "Dashboard", icon: "/images/home.png", href: "/Dashboard" },
    { name: "Clients", icon: "/images/users.png", href: "/Clients" },
    { name: "Production", icon: "/images/film.png", href: "/Production" },
    { name: "Leads", icon: "/images/leads.png", href: "/leads" },
    { name: "Jobs", icon: "/images/briefcase.png", href: "/jobs" },
    { name: "Calendar", icon: "/images/calendar.png", href: "/Calendar" },
    { name: "Team", icon: "/images/team.png", href: "/team" },
    { name: "Payments", icon: "/images/creditcard.png", href: "/Payments" },
    { name: "Reports", icon: "/images/chart-histogram.png", href: "/Reports" },
    { name: "Settings", icon: "/images/settings.png", href: "/Settings" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="VeloFolio Logo"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-2 py-2 rounded-lg text-sm font-medium flex flex-col items-center transition-colors duration-200"
              >
                <Image
                  src={tab.icon}
                  alt={`${tab.name} Icon`}
                  width={20}
                  height={20}
                  className="w-5 h-5 mb-1"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </div>

          {/* Profile Dropdown */}
          <div className="hidden lg:flex items-center relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200"
              aria-label="Toggle profile menu"
            >
              <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-200">
                <Image
                  src="/images/userprofile.png"
                  alt="User Profile"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-cover"
                />
              </div>
              <span className="ml-2 text-sm font-medium hidden xl:inline">
                Demo User
              </span>
              <Image
                src="/images/chevron-down.svg"
                alt="Dropdown Icon"
                width={16}
                height={16}
                className="ml-1 w-4 h-4"
              />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => {
                    router.push("/ClientProfile");
                    setIsProfileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Profile
                </button>
                <button
                  onClick={() => console.log("Settings clicked")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Settings
                </button>
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Visible below 1024px) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-md"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 w-full">
          <div className="px-4 py-4 space-y-1 sm:px-6">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src={tab.icon}
                  alt={`${tab.name} Icon`}
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-3"
                />
                {tab.name}
              </Link>
            ))}
            {/* Profile in Mobile Menu */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center px-3 mb-3">
                <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-200">
                  <Image
                    src="/images/userprofile.png"
                    alt="User Profile"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                </div>
                <span className="ml-3 text-base font-medium text-gray-700">
                  Demo User
                </span>
              </div>
              <div className="space-y-1">
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  href="/logout"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
