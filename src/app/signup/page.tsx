// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const Signup: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 px-6 py-12 relative overflow-hidden">
//       <Image src="/bglogo.svg" alt="Logo" width={800} height={650} className='absolute -top-60 -right-60' />
//       {/* Left Side - Illustration */}
//       <div className="hidden lg:block relative">
//         <h1 className='text-3xl text-white absolute top-7 left-7 w-76'>Manage Projects, Payments & Teams, All in One Place</h1>
//         <Image
//           src="/signup.png"
//           alt="Signup illustration"
//           width={550}
//           height={600}
//           priority
//           className="object-contain"
//         />
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-full max-w-2xl  rounded-2xl  p-8 lg:p-5 space-y-2 ">
//         {/* Logo */}
//         <div className="flex  mb-4">
//           <Image
//             src="/images/logo.png"
//             alt="Logo"
//             width={160}
//             height={160}
//             className="object-contain"
//           />
//         </div>

//         {/* Title */}
//         <h1 className="text-lg  text-gray-900 mb-3">
//           Your Studio, Your Workflow
//         </h1>

//         {/* Form Fields */}
//         <form className="space-y-3">
//           <div>
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//               First Name
//             </label>
//             <input
//               id="firstName"
//               type="text"
//               placeholder="Enter your first name"
//               className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border  text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4  text-gray-500 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
//             />
//           </div>

//           {/* Terms & Privacy */}
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               id="agree"
//               name="agree"
//               className="w-4 h-4 cursor-pointer text-[#01B0E9] border-gray-300 rounded focus:ring-[#01B0E9]"
//             />
//             <label htmlFor="agree" className="text-sm text-gray-600">
//               I agree to{' '}
//               <Link href="/terms" className="text-[#01B0E9] hover:underline">
//                 terms
//               </Link>{' '}
//               and{' '}
//               <Link href="/privacy" className="text-[#01B0E9] hover:underline">
//                 privacy policy
//               </Link>
//             </label>
//           </div>

//           {/* Sign Up Button */}
//           <button
//             type="submit"
//             className="w-full cursor-pointer rounded-full bg-[#01B0E9] text-whitefont-semibold py-2  hover:bg-[#019cc7] transition duration-200"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center justify-center gap-3 text-gray-500">
//           <div className="flex-1 h-px bg-gray-300"></div>
//           <span className="text-sm">or</span>
//           <div className="flex-1 h-px bg-gray-300"></div>
//         </div>

//         {/* Social Login */}
//         <div className="space-y-3">
//           <button className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 border border-gray-600 rounded-full hover:bg-gray-50 transition">
//             <Image src="/google.png" alt="Google" width={20} height={20} />
//             <span className="text-gray-700 font-medium">Sign in with Google</span>
//           </button>
//           <button className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 border border-gray-600 rounded-full hover:bg-gray-50 transition">
//             <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
//             <span className="text-gray-700 font-medium">Sign in with Facebook</span>
//           </button>
//         </div>

//         {/* Sign In Link */}
//         <p className="text-center text-sm text-gray-600">
//           Already a member?{' '}
//           <Link href="/signin" className="text-[#01B0E9] font-medium hover:underline cursor-pointer">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
/** @format */
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 px-2 py-12 relative overflow-hidden">
      {/* Background Logo */}
      <Image
        src="/bglogo.svg"
        alt="Background logo"
        width={800}
        height={650}
        className="absolute -top-60 -right-60 opacity-70"
      />

      {/* Left Side - Illustration */}
      <div className="hidden lg:block relative">
        <h1 className="text-3xl text-white absolute top-7 left-7 w-76 drop-shadow-lg">
          Manage Projects, Payments & Teams, All in One Place
        </h1>
        <Image
          src="/signup.png"
          alt="Signup illustration"
          width={540}
          height={540}
          priority
          className="object-contain "
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full max-w-2xl  rounded-2xl p-8 lg:p-10 space-y-4">
        {/* Logo */}
        <div className="flex mb-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={160}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-lg text-gray-900 mb-3">
          Your Studio, Your Workflow
        </h1>

        {/* Form Fields */}
        <form className="space-y-3">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 text-gray-500 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
            />
          </div>

          {/* Terms & Privacy */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="w-4 h-4 cursor-pointer text-[#01B0E9] border-gray-300 rounded focus:ring-[#01B0E9]"
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I agree to{" "}
              <Link href="/terms" className="text-[#01B0E9] hover:underline">
                terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#01B0E9] hover:underline">
                privacy policy
              </Link>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-[#01B0E9] text-white font-semibold py-2 hover:bg-[#019cc7] transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 text-gray-500 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-2 sm:py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
            <Image src="/google.png" alt="Google" width={20} height={20} />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>
          {/* <button className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
            <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
            <span className="text-gray-700 font-medium">
              Sign in with Facebook
            </span>
          </button> */}
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600">
          Already a member?{" "}
          <Link
            href="/"
            className="text-[#01B0E9] font-medium hover:underline cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
