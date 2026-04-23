"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/store/apis/Auth"; // create this API
import Image from "next/image";
import Link from "next/link";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // token from the reset link
  const [resetPassword] = useResetPasswordMutation();

  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Password too short").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });


  const handleSubmit = async (values: { password: string; confirmPassword: string }, { setSubmitting }: any) => {
    if (!token) {
      toast.error("Invalid reset link");
      setSubmitting(false);
      return;
    }

    try {
      await resetPassword({ token, password: values.password }).unwrap();
      toast.success("Password reset successful!");
      router.push("/signin"); // go to login page
    } catch (err: any) {
      // Correctly display backend message
      if ("data" in err && err.data?.msg) {
        toast.error(err.data.msg);
      } else {
        toast.error("Something went wrong!");
      }
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
          Reset Password
        </h1>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent outline-none"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#01B0E9] text-white py-3 rounded-full font-semibold hover:bg-[#019cc7] transition"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
