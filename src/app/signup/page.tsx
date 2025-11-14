
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "@/store/apis/Auth";
import { toast } from "react-toastify";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

// ✅ Validation schema
const SignupSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too short!")
    .required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  agree: Yup.boolean().oneOf([true], "You must accept the terms"),
});
const {success}=toast
const Signup: React.FC = () => {
  const router=useRouter()
  const [signup] = useSignupMutation();
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

      {/* Left Side */}
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

      
      <div className="w-full max-w-2xl rounded-2xl p-8 lg:p-10 space-y-4">
        <div className="flex mb-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={160}
            className="object-contain"
          />
        </div>

        <h1 className="text-lg text-gray-900 mb-3">Your Studio, Your Workflow</h1>

       
        <Formik
          initialValues={{
            firstName: "",
            email: "",
            password: "",
            agree: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values,{ setSubmitting, resetForm }) => {
            signup(values);
              success("User Registered Successfully")
            console.log("Form Submitted:", values);

            resetForm();
            router.push("/")
            setSubmitting(false)
            values={
              firstName: "",
              email: "",
              password: "",
              agree: false
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none transition"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <Field
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
              <ErrorMessage
                name="agree"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-full bg-[#01B0E9] text-white font-semibold py-2 hover:bg-[#019cc7] transition duration-200"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

      
        <div className="flex items-center justify-center gap-3 text-gray-500 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        
        <div className="space-y-3">
          <button className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-2 sm:py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
            <Image src="/google.png" alt="Google" width={20} height={20} />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>
        </div>

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
