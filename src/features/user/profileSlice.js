import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../../api/UserApi';

export const getUserById = createAsyncThunk('user/getUserInfo', async (params) => {
  const userInfo = await userAPI.getUserById(params)
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

export const getPostsByUserId = createAsyncThunk('user/getPostsById', async (params) => {
  const posts = await userAPI.getPostsByUserId(params)
  console.log(posts)
  return posts
})

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    activeId: "62794b3efab692cd57d1428c",
    userInfo: {},
    posts: [],
    isLoading: false,
  },
  extraReducers: {
    [getUserById.pending]: (state) => {
      state.isLoading = true
    },
    [getUserById.fulfilled]: (state, action) => {
      state.userInfo = action.payload.userInfo
    },
    [getUserById.rejected]: (state, action) => {
      state.isLoading = false
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
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
    [getPostsByUserId.pending]: (state) => {
      state.isLoading = true
    },
    [getPostsByUserId.fulfilled]: (state, action) => {
      state.posts = action.payload.listPost
    },
    [getPostsByUserId.rejected]: (state, action) => {
      state.isLoading = false
    }
  },
});

const { reducer: userReducer, actions } = UserSlice;

export const {} = actions;

export default userReducer
