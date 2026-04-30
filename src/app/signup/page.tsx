
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUpWithEmail, continueWithGoogle } from "@/firebase_Routes/routes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RouteGuard from "@/app/components/layouts/RouteGuard";
import { useDispatch } from "react-redux";
import { setCredientials } from "@/store/slices/authSlice";
import { useInvitationLogic } from "@/hooks/useInvitationLogic";
import { Base_url } from "@/utils/Url";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getFriendlyErrorMessage } from "@/utils/firebaseErrors";
// Validation schema
const SignupSchema = Yup.object({
  full_name: Yup.string().min(2, "Too short!").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  agree: Yup.boolean().oneOf([true], "You must accept the terms"),
});
interface SignupPayload {
  full_name: string;
  email: string;
  password: string;
  token?: string;
  role?: string;
  agree: boolean;
}


const Signup: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);


  // URL token handling moved to custom hook
  const { invitationToken, inviteEmail, inviteRole, loadingInvite } = useInvitationLogic();

  //---------------------------------------
  //  GOOGLE LOGIN
  //---------------------------------------
  const handleGoogleLogin = async () => {
    const response = await continueWithGoogle();
    if (response.error) {
      toast.error(getFriendlyErrorMessage(response.error));
    } else {
      toast.success("Google Signup Successful");
      router.push("/dashboard");
    }
  };

  //---------------------------------------
  //  LOADER WHILE VERIFYING INVITATION
  //---------------------------------------
  if (loadingInvite) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Verifying invitation...</p>
      </div>
    );
  }

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 px-2 py-12 relative overflow-hidden">
        {/* Background Logo */}
        <Image
          src="/bglogo.svg"
          alt="Background logo"
          width={800}
          height={650}
          className="absolute -top-60 -right-60 opacity-70"
        />

        {/* Left Section */}
        <div className="hidden lg:block relative">
          <h1 className="text-3xl text-white absolute top-7 left-7 drop-shadow-lg">
            Manage Projects, Payments & Teams, All in One Place
          </h1>
          <Image
            src="/signup.png"
            alt="Signup illustration"
            width={540}
            height={540}
            priority
            className="object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="w-full max-w-2xl rounded-2xl p-8 lg:p-10 space-y-4">
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

          <h1 className="text-lg text-gray-900 mb-3">
            {invitationToken ? "Complete Your Invitation" : "Your Studio, Your Workflow"}
          </h1>

          {/* Formik Form */}
          <Formik
            enableReinitialize
            initialValues={{
              full_name: "",
              email: inviteEmail || "",
              password: "",
              agree: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await signUpWithEmail(values.email, values.password, values.full_name);
                if (response.error) {
                  toast.error(getFriendlyErrorMessage(response.error));
                  return;
                }

                // Success flow
                toast.success("Signup successful!");
                resetForm();
                router.push("/signin");
              } catch (err: any) {
                console.error("Signup error:", err);
                toast.error("Signup failed: " + err.message);
              } finally {
                setSubmitting(false);
              }
            }}




          >
            {({ isSubmitting }) => (
              <Form className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Field
                    name="full_name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg"
                  />
                  <ErrorMessage name="full_name" className="text-red-500 text-sm" component="div" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    disabled={!!invitationToken}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg ${invitationToken ? "bg-gray-100 cursor-not-allowed" : "text-gray-700"
                      }`}
                  />
                  <ErrorMessage name="email" className="text-red-500 text-sm" component="div" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 border text-gray-500 border-gray-300 rounded-lg"
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
                  <ErrorMessage name="password" className="text-red-500 text-sm" component="div" />
                </div>

                {/* Terms */}
                <div className="flex items-center gap-2">
                  <Field type="checkbox" id="agree" name="agree" className="w-4 h-4 cursor-pointer" />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    I agree to{" "}
                    <Link href="/terms" className="text-[#01B0E9]">
                      terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#01B0E9]">
                      privacy policy
                    </Link>
                  </label>
                </div>
                <ErrorMessage name="agree" className="text-red-500 text-sm" component="div" />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#01B0E9] text-white font-semibold py-2"
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>

                {/* Invitation Role */}
                {invitationToken && inviteRole && (
                  <p className="text-center text-sm text-green-600">
                    You are invited as: <b>{inviteRole}</b>
                  </p>
                )}
              </Form>
            )}
          </Formik>

          {/* Google Login + Divider */}
          {!invitationToken && (
            <>
              <div className="flex items-center justify-center gap-3 text-gray-500 my-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 border text-black border-gray-300 rounded-full"
                >
                  <Image src="/google.png" alt="Google" width={20} height={20} />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </>
          )}

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already a member?{" "}
            <Link href="/" className="text-[#01B0E9] font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </RouteGuard>
  );
};

export default Signup;


