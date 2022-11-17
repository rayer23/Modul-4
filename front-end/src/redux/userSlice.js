import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    NIM: 0,
    username: "",
    email: "",
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
    },
    logout: (state) => {
      state.value.NIM = 0;
      state.value.username = "";
      state.value.email = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
