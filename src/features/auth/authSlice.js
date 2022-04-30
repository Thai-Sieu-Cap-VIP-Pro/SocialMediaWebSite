import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../api/AuthApi';
import postAPI from '../../api/PostApi';

export const LoginUser = createAsyncThunk('auth/LoginUser', async (params, thunkAPI) => {
    const currentUser = await authAPI.getAccount(params);
    return currentUser;
});

<<<<<<< HEAD
// export const Logout = createAsyncThunk("auth/logout", async () => {
//   console.log("dô trong create async logout");
//   await authAPI.logout();
//   return 0;
// });

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loginUser: "625283db28644968034d08a3",
    current: {},
    loading: false,
    error: "",
    isLogin: false,
  },
  reducers: {
    Logout: (state, action) => {
      localStorage.removeItem("authTokens");
    },
  },
  extraReducers: {
    [LoginUser.pending]: (state) => {
      state.loading = true;
=======
export const Logout = createAsyncThunk('auth/logout', async () => {
    console.log('dô trong create async logout');
    await authAPI.logout();
    return 0;
});

export const getPosts = createAsyncThunk('post/getPosts', async () => {
    console.log('Lấy post của thái');
    const listPosts = await postAPI.getPosts();
    return listPosts;
});

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        current: {},
        loading: false,
        error: '',
        isLogin: false,
>>>>>>> 8f29ce9fd42b7ba62f0962dd719ecf30afd4e1b1
    },
    reducers: {},
    extraReducers: {
        [LoginUser.pending]: (state) => {
            state.loading = true;
            console.log('Đang load');
        },

<<<<<<< HEAD
    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Đăng nhập thất bại !";
    },

    [LoginUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("authTokens", JSON.stringify(action.payload.tokens));
      state.current = action.payload;
      state.isLogin = true;
=======
        [LoginUser.rejected]: (state, action) => {
            state.loading = false;
            console.log('Đăng nhập thất bại');
            state.error = 'Đăng nhập thất bại !';
        },

        [LoginUser.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            console.log(action.payload.tokens.accessToken);
            localStorage.setItem('authTokens', JSON.stringify(action.payload.tokens));
            state.current = action.payload.currentUser;
            state.isLogin = true;
            console.log('Đăng nhập thành công');
        },

        [Logout.fulfilled]: (state, action) => {
            state.isLogin = false;
            localStorage.removeItem('authTokens');
        },
        [getPosts.fulfilled]: (state, action) => {
            console.log(action.payload);
        },
>>>>>>> 8f29ce9fd42b7ba62f0962dd719ecf30afd4e1b1
    },
});

export const { reducer: AuthReducer, actions } = AuthSlice;
export const { Logout } = actions;
export default AuthReducer;
