import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../api/PostApi';

//hàm lấy tất cả bài post khi vào trang chủ
export const getPosts = createAsyncThunk('post/getPosts', async () => {
    const listPosts = await postAPI.getPosts();
    return listPosts;
});

//hàm lấy tất cả comment của bài post
export const getCommentsByPostID = createAsyncThunk('post/getComments', async (params) => {
    const listComment = await postAPI.getCommentByPostID(params);
    return listComment;
});

//hàm xử lý like hay bỏ like bài post
export const handleLike = createAsyncThunk('post/Like', async (params) => {
    console.log('Đang like bài ' + params);
    const listComment = await postAPI.likePost(params);
});

export const handleUnLike = createAsyncThunk('post/UnLike', async (params) => {
    const listComment = await postAPI.unLikePost(params);
});

//hàm lấy danh sách gợi ý kết bạn
export const getListRecommendFriends = createAsyncThunk('home/getListRecommendFriends', async () => {
    const listRecommend = await postAPI.recommendFriends();
    return listRecommend;
});

//hàm add comment
export const addNewComment = createAsyncThunk('home/addNewComments', async (params) => {
    const listRecommend = await postAPI.addComment(params);
    return listRecommend;
});

const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        replingCmt: {
            CmtID: null,
            CmtUserName: '',
        },
        listPosts: [],
        listComment: [],
        listRecommend: [],
        activePostId: '',
        isShowDetail: false,
        isShowReportModal: false,
        isShowAlllikeModal: false,
        isLoading: false,
        isLoadCmt: false,
        loadListPostFail: false,
    },
    reducers: {
        ShowDetail: (state, action) => {
            state.isShowDetail = true;
            state.activePostId = action.payload;
            console.log('xong hàm show detail');
        },
        HideDetailReducer: (state, action) => {
            state.isShowDetail = false;
            state.activePostId = '';
        },
        ShowReportModal: (state, action) => {
            state.isShowReportModal = true;
        },
        HideReportModal: (state, action) => {
            state.isShowReportModal = false;
        },
        ShowAllLikesModal: (state, action) => {
            state.isShowAlllikeModal = true;
        },
        HideAllLikesModal: (state, action) => {
            state.isShowAlllikeModal = false;
        },
        SetReplyCmd: (state, action) => {
            state.replingCmt.CmtID = action.payload.cmtId;
            state.replingCmt.CmtUserName = action.payload.userName;
        },
        CancelReplyCmd: (state, action) => {
            state.replingCmt = {
                CmtID: null,
                CmtUserName: '',
            };
        },
    },
    extraReducers: {
        //get all post when login successful
        [getPosts.pending]: (state) => {
            state.isLoading = true;
        },
        [getPosts.rejected]: (state) => {
            console.log('Lỗi không lấy được post');
            state.isLoading = false;
            state.loadListPostFail = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.listPosts = action.payload.posts;
            state.isLoading = false;
            state.loadListPostFail = false;
        },
        //get all comment of post
        [getCommentsByPostID.pending]: (state, action) => {
            state.isLoadCmt = true;
        },
        [getCommentsByPostID.rejected]: (state, action) => {
            console.log('Lấy comment thất bại');
            state.isLoadCmt = false;
        },
        [getCommentsByPostID.fulfilled]: (state, action) => {
            state.listComment = action.payload.cmts;
            state.isLoadCmt = false;
        },

        //handlelike
        [handleLike.pending]: (state, action) => {
            console.log('Đang like');
        },
        [handleLike.rejected]: (state, action) => {
            console.log('like thất bại');
        },
        [handleLike.fulfilled]: (state, action) => {
            console.log('like thành công');
            console.log(state.listPosts);
        },

        //get list recommend frieds
        [getListRecommendFriends.pending]: (state, action) => {},
        [getListRecommendFriends.rejected]: (state, action) => {},
        [getListRecommendFriends.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.listRecommend = action.payload.relateUser;
        },

        //create comment
        [addNewComment.pending]: (state, action) => {},
        [addNewComment.rejected]: (state, action) => {},
        [addNewComment.fulfilled]: (state, action) => {
            console.log('thành công');
            state.replingCmt = {
                CmtID: null,
                CmtUserName: '',
            };
            //state.listComment = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
const { reducer: HomeReducer, actions } = HomeSlice;
export const {
    ShowDetail,
    HideDetailReducer,
    ShowReportModal,
    HideReportModal,
    ShowAllLikesModal,
    HideAllLikesModal,
    SetReplyCmd,
    CancelReplyCmd,
} = actions;

export default HomeReducer;
