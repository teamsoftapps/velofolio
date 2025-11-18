import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const Common = createApi({
    reducerPath: 'Common',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
    }),
    endpoints: (builder) => ({
        createOrganization: builder.mutation({
            query: (body) => ({
                url: '/superAdmin/organization',
                method: 'POST',
                body,
            }),
        }),
        
    }),
});