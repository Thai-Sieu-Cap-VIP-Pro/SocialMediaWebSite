import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
  name: "home",
  initialState: {
    isShowDetail: false,
    isShowReportModal: false,
  },
  reducers: {
    ShowDetail: (state, action) => {
      state.isShowDetail = true;
    },
    HideDetailReducer: (state, action) => {
      state.isShowDetail = false;
    },
    ShowReportModal: (state, action) => {
      state.isShowReportModal = true;
    },
    HideReportModal: (state, action) => {
      state.isShowReportModal = false;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
const { reducer: HomeReducer, actions } = HomeSlice;
export const {
  ShowDetail,
  HideDetailReducer,
  ShowReportModal,
  HideReportModal,
} = actions;

export default HomeReducer;
