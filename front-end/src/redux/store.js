import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookSlice from "./bookSlice";

export default configureStore({
    reducer: {
        userSlice, bookSlice
    },
});