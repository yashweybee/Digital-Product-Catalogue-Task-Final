import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "state",
    initialState: {
        showWishlistModel: false,
        priceRangeValues: {},
        productEditData: []
    },
    reducers: {
        setShowWishlistModel: (state, action) => {
            state.showWishlistModel = action.payload;
        },
        setProductEditData: (state, action) => {
            state.productEditData = action.payload
        },
        setPriceRangeValues: (state, action) => {
            // console.log(action.payload);
            state.priceRangeValues = action.payload
        }
    }
})


export const { setShowWishlistModel, setProductEditData, setPriceRangeValues } = stateSlice.actions
export default stateSlice.reducer //stateReducer