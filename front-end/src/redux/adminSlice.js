import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    email: "",
    isValid: "",
  },
};

export const adminSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
        state.value.username = action.payload.username;
        state.value.email = action.payload.email;
        state.value.isValid = action.payload.isValid;    },
    logout: (state) => {
      state.value.username = "";
      state.value.email = "";
      state.value.isValid = "";
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
