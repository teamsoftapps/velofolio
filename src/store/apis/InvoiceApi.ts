import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { Base_url } from "../../utils/Url";

export const InvoiceApi = createApi({
  reducerPath: 'InvoiceApi',
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
  tagTypes: ["Invoice", "Quote", "Payment"],
  endpoints: (builder) => ({
    // Invoices
    getInvoices: builder.query({
      query: (params) => ({ url: '/invoice', method: 'GET', params }),
      providesTags: ["Invoice"],
    }),
    getInvoiceById: builder.query({
      query: (id: string) => ({ url: `/invoice/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: "Invoice", id }],
    }),
    createInvoice: builder.mutation({
      query: (body) => ({ url: '/invoice', method: 'POST', body }),
      invalidatesTags: ["Invoice"],
    }),
    updateInvoice: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/invoice/${id}`, method: 'PUT', body }),
      invalidatesTags: ["Invoice"],
    }),
    
    // Quotes
    getQuotes: builder.query({
      query: (params) => ({ url: '/quote', method: 'GET', params }),
      providesTags: ["Quote"],
    }),
    createQuote: builder.mutation({
      query: (body) => ({ url: '/quote', method: 'POST', body }),
      invalidatesTags: ["Quote"],
    }),
    
    // Payments
    recordPayment: builder.mutation({
      query: (body) => ({ url: '/payment', method: 'POST', body }),
      invalidatesTags: ["Payment", "Invoice"], // Marking as paid affects invoices
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useGetQuotesQuery,
  useCreateQuoteMutation,
  useRecordPaymentMutation,
} = InvoiceApi;
