/** @format */

import { Base_url } from '@/utils/Url';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
// import { BaseUrl } from '../../config/Services';
export const Auth = createApi({
  reducerPath: 'Authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: Base_url,
     credentials: "include", 
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        // credentials: 'include',
      }),
    }),
   signup: builder.mutation({
  query: (body: { role?: string; [key: string]: any }) => {
    let endpoint = '/superAdmin/signup';
    if (body.role === 'superAdmin') endpoint = '/superAdmin/signup';
    else if (body.role === 'editor') endpoint = '/editor/signup';
    else if (body.role === 'admin') endpoint = '/admin/signup';

    return {
      url: endpoint,
      method: 'POST',
      body,
    };
  },
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
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<{ msg: string }, { token: string; password: string }>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
 

signOut: builder.mutation({
 query: () => ({
    url: "/auth/logout",
    method: "POST",
    credentials: "include"
  })
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
