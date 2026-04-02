import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { Base_url } from "../../utils/Url";

export const JobApi = createApi({
  reducerPath: 'JobApi',
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
  tagTypes: ["Job", "Task"],
  endpoints: (builder) => ({
    // Jobs
    getJobs: builder.query({
      query: (params) => ({ url: '/job', method: 'GET', params }),
      providesTags: ["Job"],
    }),
    createJob: builder.mutation({
      query: (body) => ({ url: '/job', method: 'POST', body }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/job/${id}`, method: 'PUT', body }),
      invalidatesTags: ["Job"],
    }),
    deleteJob: builder.mutation({
      query: (id: string) => ({ url: `/job/${id}`, method: 'DELETE' }),
      invalidatesTags: ["Job"],
    }),
    
    // Tasks
    getTasks: builder.query({
      query: (params) => ({ url: '/task', method: 'GET', params }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: (body) => ({ url: '/task', method: 'POST', body }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/task/${id}`, method: 'PUT', body }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id: string) => ({ url: `/task/${id}`, method: 'DELETE' }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = JobApi;
