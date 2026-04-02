import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { Base_url } from "../../utils/Url";

export const TeamApi = createApi({
  reducerPath: 'TeamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Base_url,
    prepareHeaders: (headers, { getState }) => {
      const authString: any = (getState() as RootState).persisted.auth;
      let token;
      try {
        const auth = typeof authString === 'string' ? JSON.parse(authString) : authString;
        token = auth?.token;
      } catch (err) {}
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["TeamMember", "TimeOff"],
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: () => ({ url: '/team', method: 'GET' }),
      providesTags: ["TeamMember"],
    }),
    getTeamMemberById: builder.query({
      query: (id: string) => ({ url: `/team/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: "TeamMember", id }],
    }),
    updateTeamMember: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/team/${id}`, method: 'PUT', body }),
      invalidatesTags: ["TeamMember"],
    }),
    deleteTeamMember: builder.mutation({
      query: (id: string) => ({ url: `/team/${id}`, method: 'DELETE' }),
      invalidatesTags: ["TeamMember"],
    }),
    
    // Time Offs
    requestTimeOff: builder.mutation({
      query: (body) => ({ url: '/team/timeoff', method: 'POST', body }),
      invalidatesTags: ["TimeOff"],
    }),
    getTimeOffs: builder.query({
      query: () => ({ url: '/team/timeoff', method: 'GET' }),
      providesTags: ["TimeOff"],
    })
  }),
});

export const {
  useGetTeamMembersQuery,
  useGetTeamMemberByIdQuery,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useRequestTimeOffMutation,
  useGetTimeOffsQuery,
} = TeamApi;
