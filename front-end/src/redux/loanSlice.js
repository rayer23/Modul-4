import { createSlice } from "@reduxjs/toolkit";

export const loanSlice = createSlice({
    name: "loans",
        initialState: {
            value: [],
        },
    reducers: {
        loanData: (state, action) => {
        state.value = action.payload;
        },
        delLoan: (state) => {
            state.value = []
        },
    },
});

// Action creators are generated for each case reducer function
export const { loanData, delLoan } = loanSlice.actions;

export default loanSlice.reducer;
