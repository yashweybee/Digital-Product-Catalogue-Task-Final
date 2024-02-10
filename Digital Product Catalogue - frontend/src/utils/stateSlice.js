import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "state",
    initialState: {
        showWishlistModel: false
    },
    reducers: {
        setShowWishlistModel: (state, action) => {
            state.showWishlistModel = action.payload;
        }
    }
})


export const { setShowWishlistModel } = stateSlice.actions
export default stateSlice.reducer //stateReducer