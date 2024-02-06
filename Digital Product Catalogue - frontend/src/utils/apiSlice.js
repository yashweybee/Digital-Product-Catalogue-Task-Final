import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from './Constants';


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/product`,
            providesTags: ['products']
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/product',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['products']
        })
    })
})

export const {
    useGetProductsQuery,
    useAddProductMutation
} = apiSlice;