import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    NIM: 0,
    username: "",
    email: "",
    isVerified: "",
    cart: 0,
    loan: 0,
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
      state.value.cart = action.payload.cart;
      state.value.loan = action.payload.loan;
    },
    logout: (state) => {
      state.value.NIM = 0;
      state.value.username = "";
      state.value.email = "";
      state.value.isVerified = "";
      state.value.cart = 0;
      state.value.loan = 0;
    },
    addCart: (state) => {
      state.value.cart += 1
    },
    delCart: (state) => {
      state.value.cart -= 1
    },
    CartLoan: (state) => {
      state.value.cart = 0
    },
    addLoan: (state) => {
      state.value.loan = 1
    },
    delLoan: (state) => {
      state.value.loan = 0
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, addCart, delCart, CartLoan, addLoan, delLoan } = userSlice.actions;

export default userSlice.reducer;
