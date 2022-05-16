import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/authSlice';
import chatSlice from '../features/chat/ChatSlice';
import HomeReducer from '../features/home/homeSlice';
import userReducer from '../features/user/profileSlice';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        home: HomeReducer,
        chat: chatSlice.reducer,
        user: userReducer,
    },
});
