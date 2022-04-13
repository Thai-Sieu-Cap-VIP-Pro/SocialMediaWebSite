import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/AuthApi";
import postAPI from "../../api/PostApi";

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (params, thunkAPI) => {
    console.log("dô hàm login");

    const currentUser = await authAPI.getAccount(params);
    console.log("chạy xong api");

    return currentUser;
  }
);

export const Logout = createAsyncThunk("auth/logout", async () => {
  console.log("dô trong create async logout");
  await authAPI.logout();
  return 0;
});

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  console.log("Lấy post của thái");
  await postAPI.getPosts();
  return 0;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    current: {},
    loading: false,
    error: "",
    isLogin: false,
  },
  reducers: {},
  extraReducers: {
    [LoginUser.pending]: (state) => {
      state.loading = true;
      console.log("Đang load");
    },

    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      console.log("Đăng nhập thất bại");
      state.error = "Đăng nhập thất bại !";
    },

    [LoginUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      console.log(action.payload.tokens.accessToken);
      localStorage.setItem("authTokens", JSON.stringify(action.payload.tokens));
      state.current = action.payload;
      state.isLogin = true;
      console.log("Đăng nhập thành công");
    },

    [Logout.fulfilled]: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("authTokens");
    },
    [getPosts.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer: AuthReducer } = AuthSlice;

export default AuthReducer;
