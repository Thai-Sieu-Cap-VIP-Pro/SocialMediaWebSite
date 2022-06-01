import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../../api/UserApi';

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (params) => {
    const userInfo = await userAPI.getUserInfo(params);
    return userInfo;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (params) => {
    const updatedUser = await userAPI.updateUser(params);
    return updatedUser;
  }
);

export const unFollow = createAsyncThunk('user/unFollow', async (params) => {
  const unFollowUser = await userAPI.unFollow(params);
  return unFollowUser;
});

export const removeFollow = createAsyncThunk('user/removeFollow', async (params) => {
  const unFollowUser = await userAPI.removeFollow(params);
  console.log(unFollowUser);
  return unFollowUser;
});

export const getPostsByUserId = createAsyncThunk(
  'user/getPostsByUserId',
  async (params) => {
    const posts = await userAPI.getPostsByUserId(params);
    return posts;
  }
);

export const changePassword = createAsyncThunk('user/changePassword', async (params) => {
  console.log(params);
  const changePasswordUser = await userAPI.changePassword(params);
  return changePasswordUser;
})

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    activeId: '',
    userInfo: {},
    posts: [],
    isLoading: false,
  },
  reducers: {
    addActiveId: (state, action) => {
      state.activeId = action.payload;
    },
  },
  extraReducers: {
    [getUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },
    [getUserById.rejected]: (state, action) => {
      state.isLoading = false;
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
      state.isLoading = true;
    },
    [unFollow.fulfilled]: (state, action) => {
      state.userInfo.following = action.payload.unfollowUser?.following;
    },
    [unFollow.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [removeFollow.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFollow.fulfilled]: (state, action) => {
      state.userInfo.followers = action.payload.unfollowUser?.followers;
    },
    [removeFollow.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getPostsByUserId.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostsByUserId.fulfilled]: (state, action) => {
      state.posts = action.payload.listPost;
      state.isLoading = false;
    },
    [getPostsByUserId.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [changePassword.pending]: (state) => {},
    [changePassword.rejected]: (state) => {},
    [changePassword.fulfilled]: (state) => {},
  },
});

const { reducer: userReducer, actions } = UserSlice;

export const { addActiveId } = actions;

export default userReducer;
