import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import filterReducer from "../utils/filterSlice"

const appStore = configureStore(
    {
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            filter: filterReducer
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    })

export default appStore