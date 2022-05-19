import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../api/UserApi';

export const changeAvatar = createAsyncThunk('user/avtChange', async (args, thunkAPI) => {
    try {
        const response = await UserApi.changeAvatar(args);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});

export const getUserPosts = createAsyncThunk('user/getUserPosts', async (args, thunkAPI) => {
    try {
        const response = await UserApi.getUserPosts(args);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: false,
        //currentUser: null,

    },
    reducers: {},
    extraReducers: {
        [changeAvatar.pending]: (state, action)=>{
            state.loading = true;
            state.error = false;
        },
        [changeAvatar.fulfilled]: (state, action)=>{
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload.user;

        },
        [changeAvatar.rejected]: (state, action)=>{
            state.loading = false;
            state.error = true;
        },
        [getUserPosts.pending]: (state, action)=>{
            state.loading = true;
            state.error = false;
        },
        [getUserPosts.fulfilled]: (state, action)=>{
            state.loading = false;
            state.error = false;
            state.userPosts = action.payload.userPosts;
        },
        [getUserPosts.rejected]: (state, action)=>{
            state.loading = false;
            state.error = true;
        }
    }
})

export default userSlice;