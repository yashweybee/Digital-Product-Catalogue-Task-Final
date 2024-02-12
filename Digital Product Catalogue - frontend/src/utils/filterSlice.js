import { createSlice } from "@reduxjs/toolkit";



const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filterTags: [],
        searchText: "",
        sortBy: "Latest" //Oldest, Latest, Price
    },
    reducers: {
        setFilterTags: (state, action) => {
            const copyArray = [...action.payload];
            // console.log(copyArray);
            return {
                ...state,
                filterTags: copyArray
            }
        },
        setSearchText: (state, action) => {
            // console.log(action.payload);
            state.searchText = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        }
    }
})


export const { setSearchText, setSortBy, setFilterTags } = filterSlice.actions
export default filterSlice.reducer //filterReducer