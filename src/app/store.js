import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/auth/authSlice"

export const store = configureStore({
    reducer:{
        auth:  counterReducer,
      
    },
})