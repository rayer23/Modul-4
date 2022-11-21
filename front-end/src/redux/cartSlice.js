import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "carts",
        initialState: {
            value: [],
        },
    reducers: {
        syncData: (state, action) => {
        state.value = action.payload;
        },
        delData: (state) => {
            state.value = []
        },
    },
});

// Action creators are generated for each case reducer function
export const { syncData, delData } = cartSlice.actions;

export default cartSlice.reducer;
