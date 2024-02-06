import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const appStore = configureStore(
    {
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    })

export default appStore