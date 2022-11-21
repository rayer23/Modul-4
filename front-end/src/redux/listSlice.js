import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncData } = listSlice.actions;

export default listSlice.reducer;