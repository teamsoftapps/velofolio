"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { resetPassword } from "@/firebase_Routes/routes";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values: { email: string }, { setSubmitting }: any) => {
    try {
      const response = await resetPassword(values.email);
      if (response.success) {
        setSubmittedEmail(values.email);
        setIsSent(true);
        toast.success("Password reset email sent!");
      } else {
        toast.error(response.error || "Failed to send reset email");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 text-black">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md space-y-8 text-center border border-gray-100">
          <div className="flex justify-center flex-col items-center gap-4">
             <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
             </div>
             <h1 className="text-2xl font-bold text-gray-900">Email Sent!</h1>
          </div>
          
          <p className="text-gray-600 text-base leading-relaxed">
            We've sent a password reset link to <br/>
            <span className="font-semibold text-gray-900">{submittedEmail}</span>
          </p>

          <div className="space-y-4 pt-4">
            <button
               onClick={() => router.push("/")}
               className="w-full bg-[#01B0E9] text-white py-4 rounded-full font-semibold hover:bg-[#019cc7] transition shadow-md cursor-pointer"
            >
              Back to Login
            </button>
            <p className="text-sm text-gray-500">
              Didn't receive it? {" "}
              <button 
                onClick={() => setIsSent(false)} 
                className="text-[#01B0E9] font-medium hover:underline cursor-pointer"
              >
                Try another email
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 text-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md space-y-6 border border-gray-100">
        <div className="flex justify-center mb-4">
          <Image src="/images/logo.png" alt="Logo" width={150} height={150} />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Forgot Password
        </h1>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#01B0E9]/50 focus:border-[#01B0E9] outline-none transition-all placeholder:text-gray-400 bg-white"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#01B0E9] text-white py-3 rounded-full font-semibold hover:bg-[#019cc7] transition shadow-md disabled:bg-gray-300 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Reset Email"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link href="/" className="text-[#01B0E9] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
