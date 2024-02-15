import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from './Constants';
const token = localStorage.getItem('token');
// console.log(localStorage.getItem("userId"));
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['products', 'wishlist', 'tags'],
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
            query: () => `/WishList/${localStorage.getItem('userId')}`,
            method: 'GET',
            providesTags: ['wishlist']
        }),

        generatePDF: builder.mutation({
            query: () => `/PDF/${localStorage.getItem("userId")}`,
            method: 'POST',
            invalidatesTags: ['products']
        }),


        addProduct: builder.mutation({
            query: (body) => ({
                url: '/Product',
                method: 'POST',
                // headers: {
                //     // 'Content-Type': `multipart/form-data;`,
                //     'Authorization': `Bearer ${token}`,
                // },
                body: body
            }),
            invalidatesTags: ['products']
        }),
        addWishlistItem: builder.mutation({
            query: (body) => ({
                url: '/WishList',
                method: 'POST',
                headers: headers,
                body: body
            }),
            invalidatesTags: ['wishlist']
        }),
        addTag: builder.mutation({
            query: (body) => ({
                url: '/ProductTag',
                method: 'POST',
                // headers: headers,
                body: body
            }),
            invalidatesTags: ['wishlist']
        }),
        addFeaturedImage: builder.mutation({
            query: (body) => ({
                url: '/ProductImage/FeaturedImage',
                method: 'POST',
                // headers: headers,
                body: body
            }),
            invalidatesTags: ['products']
        }),
        addOtherImages: builder.mutation({
            query: (body) => ({
                url: '/ProductImage/OtherImages',
                method: 'POST',
                // headers: headers,
                body: body
            }),
            invalidatesTags: ['products']
        }),
        editProduct: builder.mutation({
            query: (body) => ({
                url: `/Product/${body.productId}`,
                method: 'PUT',
                // headers: headers,
                body: body.formData
            }),
            invalidatesTags: ['products']
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/Product/${productId}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['products']
        }),
        deleteWishlistItem: builder.mutation({
            query: (productId) => ({
                url: `/WishList/${localStorage.getItem('userId')}/${productId}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['wishlist']
        }),
        deleteImage: builder.mutation({
            query: (imgId) => ({
                url: `/ProductImage/${imgId}`,
                method: 'DELETE',
                // headers: headers,
            }),
            invalidatesTags: ['products']
        }),
        deleteTag: builder.mutation({
            query: (tagId) => ({
                url: `/ProductTag/${tagId}`,
                method: 'DELETE',
                // headers: headers,
            }),
            invalidatesTags: ['tags']
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductTagsQuery,
    useGetWishlistProductsQuery,


    useGeneratePDFMutation,

    useAddProductMutation,
    useAddWishlistItemMutation,
    useAddTagMutation,
    useAddFeaturedImageMutation,
    useAddOtherImagesMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useDeleteWishlistItemMutation,
    useDeleteImageMutation,
    useDeleteTagMutation
} = apiSlice;