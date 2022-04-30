import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/AuthApi";
import postAPI from "../../api/PostApi";

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (params, thunkAPI) => {
    const currentUser = await authAPI.getAccount(params);
    return currentUser;
  }
);

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
    },

    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Đăng nhập thất bại !";
    },

    [LoginUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("authTokens", JSON.stringify(action.payload.tokens));
      state.current = action.payload;
      state.isLogin = true;
    },
  },
});

export const { reducer: AuthReducer, actions } = AuthSlice;
export const { Logout } = actions;
export default AuthReducer;
