import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
    name: "books",
    initialState: {
        value: [],
    },
    reducers: {
        syncData: (state, action) => {
        state.value = action.payload;
        },
    },
});


export const { syncData } = bookSlice.actions;

export default bookSlice.reducer;