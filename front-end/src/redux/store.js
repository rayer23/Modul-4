import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookSlice from "./bookSlice";
import adminSlice from "./adminSlice";
import listSlice from "./listSlice";
import nameSlice from "./nameSlice";
import cartSlice from "./cartSlice";
import loanSlice from "./loanSlice";

export default configureStore({
  reducer: {
    userSlice,
    bookSlice,
    adminSlice,
    listSlice,
    nameSlice,
    cartSlice,
    loanSlice,
  },
});
