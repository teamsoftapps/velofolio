// "useclient"
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// const SignIn: React.FC = () => {
// const signInSchema=Yup.object({
//   email:Yup.string().email("Invalid email").required("Email is required"),
//   password:Yup.string().required("Password is required"),
  
// })

//   return (
//     <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 px-4 sm:px-8 py-10 sm:py-16 relative overflow-hidden">
//       {/* Background Logo */}
//       <Image
//         src="/bglogo.svg"
//         alt="Background Logo"
//         width={800}
//         height={650}
//         className="absolute -top-60 -right-60 hidden lg:block opacity-70 pointer-events-none"
//       />

//       {/* Left Side - Illustration */}
//       <div className="hidden lg:block relative">
//         <h1 className="text-xl sm:text-3xl text-white absolute top-7 left-7 w-60  leading-snug">
//           Stay on Track. Stay Creative.
//         </h1>
//         <Image
//           src="/signIn.png"
//           alt="Sign In illustration"
//           width={550}
//           height={600}
//           priority
//           className="object-contain"
//         />
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-full sm:w-3/4 lg:w-[700px] xl:w-[700px] rounded-2xl p-6 sm:p-10 space-y-6">
//         {/* Logo */}
//         <div className="flex mb-4">
//           <Image
//             src="/images/logo.png"
//             alt="Logo"
//             width={150}
//             height={150}
//             className="object-contain"
//           />
//         </div>

//         {/* Title */}
//         <h1 className="text-lg sm:text-xl text-gray-900 mb-3 font-semibold">
//           Already Member? Welcome Back!
//         </h1>
// <Formik
//   initialValues={{
//     email: "",
//     password: "",
//   }}
//   validationSchema={signInSchema}
//   onSubmit={(values) => {
//     console.log(values);
//   }}
// >
//   ({isSubmitting})=>{
//     return(
//       <Form>
//         <div className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email
//             </label>
//             <Field
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
//             />
//           </div>
//         </div>
//       </Form>
//     )
//   }
//         {/* Form */}
//         <form className="space-y-4">
//           {/* Email Field */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
//             />
//           </div>

//           {/* Remember Me + Forgot Password */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 text-[#01B0E9] border-gray-300 rounded focus:ring-[#01B0E9]"
//               />
//               <span className="text-sm text-gray-600">
//                 Stay signed in for 7 days
//               </span>
//             </label>

//             <Link
//               href="/forgot-password"
//               className="text-[#01B0E9] text-sm font-medium hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Sign In Button */}
//           <Link
//             type="submit"
//             href={"/dashboard"}
//             className="w-full block text-center rounded-full bg-[#01B0E9] text-white font-semibold py-3 hover:bg-[#019cc7] transition duration-200"
//           >
//             Sign In
//           </Link>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center justify-center gap-3 text-gray-500">
//           <div className="flex-1 h-px bg-gray-300"></div>
//           <span className="text-sm">or</span>
//           <div className="flex-1 h-px bg-gray-300"></div>
//         </div>

//         {/* Social Logins */}
//         <div className="space-y-3">
//           <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
//             <Image src="/google.png" alt="Google" width={20} height={20} />
//             <span className="text-gray-700 font-medium">
//               Continue with Google
//             </span>
//           </button>

//           {/* <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
//             <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
//             <span className="text-gray-700 font-medium">
//               Continue with Facebook
//             </span>
//           </button> */}
//         </div>

//         {/* Sign Up Redirect */}
//         <p className="text-center text-sm text-gray-600">
//           Not a member?{" "}
//           <Link
//             href="/signup"
//             className="text-[#01B0E9] font-medium hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSigninMutation } from "@/store/apis/Auth";

const SignIn: React.FC = () => {
  // ✅ Validation Schema
  const signInSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const router=useRouter()

  const [signin] = useSigninMutation();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 px-4 sm:px-8 py-10 sm:py-16 relative overflow-hidden inter">
      {/* Background Logo */}
      <Image
        src="/bglogo.svg"
        alt="Background Logo"
        width={800}
        height={650}
        className="absolute -top-60 -right-60 hidden lg:block opacity-70 pointer-events-none"
      />

      {/* Left Illustration */}
      <div className="hidden lg:block relative">
        <h1 className="text-xl sm:text-3xl text-white absolute top-7 left-7 w-60 leading-snug">
          Stay on Track. Stay Creative.
        </h1>
        <Image
          src="/signIn.png"
          alt="Sign In illustration"
          width={550}
          height={600}
          priority
          className="object-contain"
        />
      </div>

    
      <div className="w-full sm:w-3/4 lg:w-[700px] xl:w-[700px] rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="flex mb-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        <h1 className="text-lg sm:text-xl text-gray-900 mb-3 font-semibold inter">
          Already a Member? Welcome Back!
        </h1>


        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={(values, { setSubmitting }) => {
            signin(values);
            router.push('/dashboard')
            setTimeout(() => {
              setSubmitting(false); 
            }, 1000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                   autoComplete="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                   autoComplete="email"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Remember + Forgot Password */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#01B0E9] border-gray-300 rounded focus:ring-[#01B0E9]"
                  />
                  <span className="text-sm text-gray-600">
                    Stay signed in for 7 days
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-[#01B0E9] text-sm font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#01B0E9] text-white font-semibold py-3 hover:bg-[#019cc7] transition duration-200"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 text-gray-500">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
            <Image src="/google.png" alt="Google" width={20} height={20} />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Sign Up Redirect */}
        <p className="text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link
            href="/signup"
            className="text-[#01B0E9] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
