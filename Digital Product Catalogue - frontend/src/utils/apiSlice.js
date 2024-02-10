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
        getProductTags: builder.query({
            query: () => `/ProductTag`,
            providesTags: ['products']
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/product',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['products']
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/Product/${productId}`,
                method: 'DELETE',
                invalidatesTags: ['products']
            })
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductTagsQuery,
    useAddProductMutation
} = apiSlice;