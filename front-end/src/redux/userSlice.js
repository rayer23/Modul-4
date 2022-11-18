import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        NIM: 0,
        username: "",
        email: "",
        isVerified: "",
    },
    };

    export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        login: (state, action) => {
        state.value.NIM = action.payload.NIM;
        state.value.username = action.payload.username;
        state.value.email = action.payload.email;
        state.value.isVerified = action.payload.isVerified;
        },
        logout: (state) => {
        state.value.NIM = 0;
        state.value.username = "";
        state.value.email = "";
        state.value.isVerified = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const { login , logout} = userSlice.actions;

export default userSlice.reducer;