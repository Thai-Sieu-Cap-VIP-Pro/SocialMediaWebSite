import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/authSlice";
import HomeReducer from "../features/home/homeSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    home: HomeReducer,
  },
});
