import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

export const Common = createApi({
  reducerPath: 'Common',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers, { getState }) => {
      const authString: any = (getState() as RootState).persisted.auth;
      let token;

      try {
        const auth = typeof authString === 'string' ? JSON.parse(authString) : authString;
        token = auth.token;
        console.log('[Common API] Parsed auth token:', token);
      } catch (err) {
        console.error('[Common API] Failed to parse auth:', err);
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Organization"],   // <-- IMPORTANT

  endpoints: (builder) => ({
    
    // POST
    createOrganization: builder.mutation({
      query: (body: { name: string }) => ({
        url: '/superAdmin/organization',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Organization"],  // <-- CORRECT PLACE
    }),
     inviteMember: builder.mutation({
      query: (body: { email: string , role: string}) => ({
        url: '/superAdmin/invite',
        method: 'POST',
        body,
      }),
      // invalidatesTags: ["Organization"],  // <-- CORRECT PLACE
    }),


    // GET
    getOrganizations: builder.query({
      query: () => ({
        url: '/superAdmin/organization',
        method: 'GET',
      }),
      providesTags: ["Organization"],     // <-- CORRECT PLACE
    }),
    validateInvite: builder.query({
      query: (token: string) => ({
        url: `/editor/validate-invitation?token=${token}`,
        method: 'GET',
      }),
    })

  }),
});

export const {
  useCreateOrganizationMutation,
  useGetOrganizationsQuery,
  useInviteMemberMutation,
  useValidateInviteQuery
} = Common;
