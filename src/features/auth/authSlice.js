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

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    current: {},
    loading: false,
    error: "",
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
      console.log(action.payload);

      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer: AuthReducer } = AuthSlice;

export default AuthReducer;
