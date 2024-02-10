import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import filterReducer from "../utils/filterSlice"
import stateReducer from "../utils/stateSlice"
import { userSlice } from "./userSllice";

const appStore = configureStore(
    {
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            [userSlice.reducerPath]: userSlice.reducer,
            filter: filterReducer,
            state: stateReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware, userSlice.middleware)
    })

export default appStore