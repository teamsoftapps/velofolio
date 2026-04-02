import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { Base_url } from "../../utils/Url";

export const ClientApi = createApi({
  reducerPath: 'ClientApi',
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
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: (params) => ({
        url: '/client',
        method: 'GET',
        params,
      }),
      providesTags: ["Client"],
    }),
    getClientById: builder.query({
      query: (id: string) => ({
        url: `/client/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: "Client", id }],
    }),
    updateClient: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/client/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ["Client"],
    }),
    deleteClient: builder.mutation({
      query: (id: string) => ({
        url: `/client/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = ClientApi;
