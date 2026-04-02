import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { Base_url } from "../../utils/Url";

export const ProductionApi = createApi({
  reducerPath: 'ProductionApi',
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
  tagTypes: ["ProductionBoard", "ProductionCard"],
  endpoints: (builder) => ({
    // Fetch all production lists/lanes for Kanban board
    getProductionBoard: builder.query({
      query: (params) => ({ url: '/production', method: 'GET', params }),
      providesTags: ["ProductionBoard"],
    }),
    
    // Add new production card
    createProductionCard: builder.mutation({
      query: (body) => ({ url: '/production/card', method: 'POST', body }),
      invalidatesTags: ["ProductionBoard", "ProductionCard"],
    }),
    
    // Move card between lists/lanes (Kanban Drag & Drop)
    moveProductionCard: builder.mutation({
      query: ({ cardId, sourceListId, destinationListId, newIndex }) => ({
        url: `/production/card/${cardId}/move`,
        method: 'PUT',
        body: { sourceListId, destinationListId, newIndex }
      }),
      // Optimistic updates are usually used here, but we'll invalidate tags to rely on server state
      invalidatesTags: ["ProductionBoard"],
    }),
    
    // Update card specifics (Cover, Title, Members)
    updateProductionCard: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/production/card/${id}`, method: 'PUT', body }),
      invalidatesTags: ["ProductionBoard", "ProductionCard"],
    }),
    
    // Delete a production card
    deleteProductionCard: builder.mutation({
      query: (id: string) => ({ url: `/production/card/${id}`, method: 'DELETE' }),
      invalidatesTags: ["ProductionBoard", "ProductionCard"],
    }),
  }),
});

export const {
  useGetProductionBoardQuery,
  useCreateProductionCardMutation,
  useMoveProductionCardMutation,
  useUpdateProductionCardMutation,
  useDeleteProductionCardMutation,
} = ProductionApi;
