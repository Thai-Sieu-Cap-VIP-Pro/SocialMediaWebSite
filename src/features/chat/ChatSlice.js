import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChatAPI from '../../api/ChatApi';

export const getAllConversations = createAsyncThunk('conversation/getAll', async (args, thunkAPI) => {
    try {
        const response = await ChatAPI.getAllConversations();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});

export const createConversation = createAsyncThunk('conversation/create', async (args, thunkAPI) => {
    try {
        const response = await ChatAPI.createConversation(args);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});

export const getUserContact = createAsyncThunk('user/getContact', async (args, thunkAPI) => {
    try {
        const response = await ChatAPI.getUserContact();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        conversations: [],
        loading: false,
        error: false,
        userFollowing: [],
    },
    reducers: {},
    extraReducers: {
        [getAllConversations.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getAllConversations.fulfilled]: (state, action) => {
            state.loading = false;
            state.conversations = action.payload.conversation;
            state.error = false;
        },
        [getAllConversations.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [createConversation.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [createConversation.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.conversations.push(action.payload.newConversation);
        },
        [createConversation.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [getUserContact.pending]: (state, action) => {
            state.loading = false;
            state.error = false;
        },
        [getUserContact.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.userFollowing = action.payload.contactUsers;
        },
        [getUserContact.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export default chatSlice;
