/** @format */

import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
// import { BaseUrl } from '../../config/Services';
export const Auth = createApi({
  reducerPath: 'Authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: '/superAdmin/signup',
        method: 'POST',
        body,
      }),
    }),
 signInWithGoogle: builder.mutation({
      query: (body) => ({
        url: '/auth/google',
        method: 'GET',
        // body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: '/Auth/forgetPassword',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ email,password, confirmPassword }) => ({
        url: `/Auth/resetPassword`,
        method: 'POST',
        body: { email,password, confirmPassword},
      }),
    }),
signOut: builder.mutation({
  query: () => ({
    url: `/Auth/signOut`,
    method: 'POST',
  }),
}),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/Auth/verifyOtp`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useSignInWithGoogleMutation,
  useSignOutMutation

} = Auth;
