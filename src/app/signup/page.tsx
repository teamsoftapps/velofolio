
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "@/store/apis/Auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RouteGuard from "../components/RouteGuard";
import { useDispatch } from "react-redux";
import { setCredientials } from "@/store/slices/authSlice";
import { useValidateInviteQuery } from "@/store/apis/Common";
// Validation schema
const SignupSchema = Yup.object({
  full_name: Yup.string().min(2, "Too short!").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
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
  const [signup] = useSignupMutation();

  // URL token handling
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [loadingInvite, setLoadingInvite] = useState(false);
const { data, isLoading, error } = useValidateInviteQuery(invitationToken as string, {
  skip: !invitationToken, // only run when token exists
});
  //---------------------------------------
  //  GET TOKEN FROM URL
  //---------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    setInvitationToken(token);
  }, []);

  //---------------------------------------
  //  FETCH INVITATION DETAILS
  //---------------------------------------
useEffect(() => {
  if (!data) return;

  if (!data.success) {
    toast.error(data.message || "Invalid or expired invitation");
    return;
  }

  setInviteEmail(data.email);
  setInviteRole(data.role);
}, [data]);

  //---------------------------------------
  //  GOOGLE LOGIN
  //---------------------------------------
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
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
    if (inviteRole === "editor" && invitationToken) {
      // Only send what backend expects
    const response=  await signup({
        token: invitationToken,
        password: values.password,
          full_name: values.full_name,  // <-- add this
        role: "editor", // optional for RTK Query endpoint selection
      }).unwrap();
      dispatch(setCredientials(response));

      
    } else {
      // Normal signup for other roles
      const { agree, ...dataToSend }: SignupPayload = values;
      if (invitationToken) dataToSend.token = invitationToken;
      if (inviteRole) dataToSend.role = inviteRole;

      const response = await signup(dataToSend).unwrap();
      //  dispatch(setCredientials(response));
    }

    toast.success("Signup successful!");
    resetForm();
    router.push("/"); // redirect
  } catch (err: any) {
    console.error("Signup error:", err);
    toast.error("Signup failed: " + (err?.data?.msg || err.message));
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
                    className={`w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg ${
                      invitationToken ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  <ErrorMessage name="email" className="text-red-500 text-sm" component="div" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg"
                  />
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
