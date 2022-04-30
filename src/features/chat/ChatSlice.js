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

export const createMessage = createAsyncThunk('message/create', async (args, thunkAPI) => {
    try {
        const response = await ChatAPI.createMessage(args);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});

export const getMessageInCons = createAsyncThunk('message/get', async (args, thunkAPI) => {
    try {
        const response = await ChatAPI.getMessageInCon(args);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});

export const getMembersInCon = createAsyncThunk('members/get', async (args, thunkAPI) => {
    try {
        const response = await ChatAPI.getMembersInCon(args);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(`${error}`);
    }
});

export const deleteCon = createAsyncThunk('conversation/delete', async (args, thunkAPI) => {
    try {
        const response = await ChatAPI.deleteCon(args);
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
        tags: [],
    },
    reducers: {
        createTag: (state, action) => {
            state.tags.push(action.payload);
        },
        deleteTag: (state, action) => {
            state.tags = state.tags.filter((tag) => {
                if (tag._id !== action.payload) {
                    return tag;
                }
                return;
            });
        },
        resetTag: (state, action) => {
            state.tags = [];
        },
    },
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
        [createMessage.pending]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [createMessage.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
        },
        [createMessage.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [getMessageInCons.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getMessageInCons.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
        },
        [getMessageInCons.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export default chatSlice;
export const { createTag, deleteTag, resetTag } = chatSlice.actions;
