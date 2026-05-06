
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { logInWithEmail, continueWithGoogle } from "@/firebase_Routes/routes";
import { toast } from "react-toastify"
import { setCredientials } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { Base_url } from "@/utils/Url";
import { getFriendlyErrorMessage } from "@/utils/firebaseErrors";
// import { u } from "@/store/apis/Auth";
const SignIn: React.FC = () => {
  // ✅ Validation Schema
  const signInSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);

const handleGoogleLogin = async () => {
    const response = await continueWithGoogle();
    if (response.error) {
      toast.error(getFriendlyErrorMessage(response.error));
    } else {
      toast.success("Google Login Successful");
      router.push(redirectPath);
    }
}
const dispatch=useDispatch()
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
onSubmit={async (values, { setSubmitting }) => {
  try {
    const response = await logInWithEmail(values.email, values.password);
    
    if (response.error) {
      toast.error(getFriendlyErrorMessage(response.error));
    } else {
      toast.success("Login Successful");
      // Optional: dispatch Redux state here if needed
      // dispatch(setCredientials({ user: response.user }));
      router.push(redirectPath);
    }
  } catch (error: any) {
    console.error("Login Error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
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
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition"
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
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
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
                    className="w-4 h-4 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]"
                  />
                  <span className="text-sm text-gray-600">
                    Stay signed in for 7 days
                  </span>
                </label>

                <Link
                  href="/forget-password"
                  className="text-[var(--primary-color)] text-sm font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[var(--primary-color)] text-white font-semibold py-3 hover:bg-[#019cc7] transition duration-200"
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
          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
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
            className="text-[var(--primary-color)] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
