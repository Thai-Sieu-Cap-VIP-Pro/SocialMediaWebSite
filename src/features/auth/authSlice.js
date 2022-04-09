import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/AuthApi";

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (params, thunkAPI) => {
    console.log("Bạn dô hàm login rồi nha, yên tâm");
    const currentUser = await authAPI.getAccount(params);
    return currentUser;
  }
);

export const Logout = createAsyncThunk("auth/logout", async () => {
  console.log("dô trong create async logout");
  //await authAPI.logout();
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
    },

    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Đăng nhập thất bại !";
    },

    [LoginUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload.tokens.accessToken);
      localStorage.setItem("authTokens", JSON.stringify(action.payload.tokens));
      state.current = action.payload;
      state.isLogin = true;
    },

    [Logout.fulfilled]: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("authTokens");
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer: AuthReducer } = AuthSlice;

export default AuthReducer;
