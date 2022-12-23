import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/AuthApi";
import postAPI from "../../api/PostApi";
import userAPI from "../../api/UserApi";
import storage from "redux-persist/lib/storage";

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const response = await authAPI.getAccount(params);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const Logout = createAsyncThunk(
  "auth/logout",
  async (params, thunkAPI) => {
    try {
      const response = await authAPI.logout(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  console.log("Lấy post của thái");
  const listPosts = await postAPI.getPosts();
  return listPosts;
});
export const Register = createAsyncThunk(
  "auth/Register",
  async (args, thunkAPI) => {
    try {
      const response = await authAPI.createAccount(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAll",
  async (args, thunkAPI) => {
    try {
      const response = await userAPI.getAllUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    current: {},
    listUser: [],
    loading: false,
    error: "",
    isLogin: false,
  },
  reducers: {
    updateCurrentUser: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: {
    [LoginUser.pending]: (state) => {
      state.loading = true;
      console.log("Đang load");
    },

    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.isLogin = true;
      console.log("Đăng nhập thất bại");
      state.error = "Đăng nhập thất bại !";
    },

    [LoginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLogin = true;
      state.error = "";
      localStorage.setItem("authTokens", JSON.stringify(action.payload.tokens));
      state.current = action.payload.currentUser;
      localStorage.setItem(
        "LoginUser",
        JSON.stringify(action.payload.currentUser)
      );
    },

    [getPosts.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [getAllUsers.pending]: (state, action) => {
      state.isLogin = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLogin = false;

      state.listUser = action.payload.listUser;
    },
    [getAllUsers.rejected]: (state, action) => {},
    [Register.pending]: (state) => {
      state.loading = true;
      console.log("Đang load");
    },

    [Register.rejected]: (state, action) => {
      state.loading = false;
      console.log("Đăng ký thất bại");
      state.error = "Đăng ký thất bại !";
    },

    [Register.fulfilled]: (state, action) => {
      state.loading = false;
    },

    [Logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLogin = false;
      state.current = {};
      state.listUser = [];
      state.error = "";
      localStorage.removeItem("authTokens");
      localStorage.removeItem("LoginUser");
      storage.removeItem("persist:root");
    },

    [Logout.rejected]: (state, action) => {
      state.isLogin = true;
      // localStorage.removeItem('authTokens');
      // localStorage.removeItem('LoginUser');
    },
    [getPosts.fulfilled]: (state, action) => {},
  },
});

export const { reducer: AuthReducer, actions } = AuthSlice;
export const { updateCurrentUser } = AuthSlice.actions;
// export const { Logout } = actions;
export default AuthReducer;
