import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../../api/UserApi';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (params) => {
  const userInfo = await userAPI.getUserInfo(params)
  return userInfo
})

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (params) => {
    const updatedUser = await userAPI.updateUser(params);
    return updatedUser;
  }
);

export const unFollow = createAsyncThunk('user/unFollow', async (params) => {
  const unFollowUser = await userAPI.unFollow(params)
  return unFollowUser
})

export const getAllPost = createAsyncThunk('user/getAllPost', async (params) => {
  const posts = await userAPI.getAllPost(params)
  console.log(posts)
  return posts
})

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    posts: [],
    isLoading: false,
  },
  extraReducers: {
    [getUserInfo.pending]: (state) => {
      state.isLoading = true
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload.userInfo
    },
    [getUserInfo.rejected]: (state, action) => {
      state.isLoading = false
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [unFollow.pending]: (state) => {
      state.isLoading = true
    },
    [unFollow.fulfilled]: (state, action) => {
      state.userInfo.following = action.payload.unfollowUser?.following
    },
    [unFollow.rejected]: (state, action) => {
      state.isLoading = false
    },
    [getAllPost.pending]: (state) => {
      state.isLoading = true
    },
    [getAllPost.fulfilled]: (state, action) => {
      state.posts = action.payload.listPost
    },
    [getAllPost.rejected]: (state, action) => {
      state.isLoading = false
    }
  },
});

const { reducer: userReducer, actions } = UserSlice;

export const {} = actions;

export default userReducer
