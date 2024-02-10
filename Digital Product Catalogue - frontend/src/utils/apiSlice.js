import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from './Constants';
const token = localStorage.getItem('token');
console.log(token);
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL, headers: headers, }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/product`,
            method: 'GET',
            providesTags: ['products']
        }),
        getProductTags: builder.query({
            query: () => `/ProductTag`,
            method: 'GET',
            providesTags: ['products']
        }),
        getWishlistProducts: builder.query({
            query: (userId) => `/WishList/${userId}`,
            method: 'GET',
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
    useGetWishlistProductsQuery,
    useAddProductMutation
} = apiSlice;