import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from './Constants';

const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

export const userSlice = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['users'],
    endpoints: (builder) => ({
        // User Login
        loginUser: builder.mutation({
            query: (body) => ({
                url: '/Login',
                method: 'POST',
                body: body
            }),

            invalidatesTags: ['users']
        }),

        // User registratioin 
        registerUser: builder.mutation({
            query: (body) => ({
                url: '/Login/Register',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['users']
        }),

    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation
} = userSlice;