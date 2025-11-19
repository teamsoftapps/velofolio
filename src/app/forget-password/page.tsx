"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForgetPasswordMutation } from "@/store/apis/Auth"; // create this API
import Image from "next/image";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [sendEmail] = useForgetPasswordMutation();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values: { email: string }, { setSubmitting }: any) => {
    try {
      await sendEmail(values).unwrap();
      toast.success("Password reset email sent!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md space-y-6">
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
                  className="w-full px-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#01B0E9] text-white py-3 rounded-full font-semibold hover:bg-[#019cc7] transition"
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
