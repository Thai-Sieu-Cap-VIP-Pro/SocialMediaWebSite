import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import NotificationAPI from "../../api/NotificationApi";
import postAPI from "../../api/PostApi";

//hàm lấy tất cả bài post khi vào trang chủ
export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const listPosts = await postAPI.getPosts();
  return listPosts;
});

//hàm lấy tất cả comment của bài post
export const getCommentsByPostID = createAsyncThunk(
  "post/getComments",
  async (params) => {
    const listComment = await postAPI.getCommentByPostID(params);
    return listComment;
  }
);

//hàm xử lý like hay bỏ like bài post

export const handleLike = createAsyncThunk("post/Like", async (params) => {
  const listComment = await postAPI.likePost(params);
  return params;
});

export const handleUnLike = createAsyncThunk("post/UnLike", async (params) => {
  const listComment = await postAPI.unLikePost(params);
});

//hàm lấy danh sách gợi ý kết bạn
export const getListRecommendFriends = createAsyncThunk(
  "home/getListRecommendFriends",
  async () => {
    const listRecommend = await postAPI.recommendFriends();
    return listRecommend;
  }
);

//hàm add comment
export const addNewComment = createAsyncThunk(
  "home/addNewComments",
  async (params) => {
    const listRecommend = await postAPI.addComment(params);
    return listRecommend;
  }
);

//like or unlike comment
export const likeOrUnlikeCmt = createAsyncThunk(
  "comment/likeOrUnlikeCmt",
  async (params) => {
    const listRecommend = await postAPI.handleLikeCmt(params);
    return listRecommend;
  }
);

//editcomment
export const editComment = createAsyncThunk("comment/edit", async (params) => {
  const listRecommend = await postAPI.editCmt(params);
  return listRecommend;
});

//delete comment
export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (params) => {
    const listRecommend = await postAPI.deleteCmt(params);
    return listRecommend;
  }
);

//unfollow
export const unFollow = createAsyncThunk("user/unfollow", async (params) => {
  const listRecommend = await postAPI.unnFollowFriends(params);
});
//unfollow
export const follow = createAsyncThunk("user/follow", async (params) => {
  const listRecommend = await postAPI.followFriends(params);
});

//getListLike
export const getListUser = createAsyncThunk(
  "user/getlistLike",
  async (params) => {
    const listRecommend = await postAPI.getlistLike(params);
    return listRecommend;
  }
);

export const createPost = createAsyncThunk(
  "post/createNew",
  async (args, thunkAPI) => {
    try {
      const response = await postAPI.createNewPost(args);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (params) => {
    const post = await postAPI.getPostById(params);
    console.log(post);
    return post;
  }
);

export const getNotification = createAsyncThunk(
  "notification/get",
  async () => {
    const listNotification = await NotificationAPI.getNotification();
    return listNotification;
  }
);

export const createNotification = createAsyncThunk(
  "notification/create",
  async (params) => {
    const listNotification = await NotificationAPI.createNotification(params);
  }
);

const HomeSlice = createSlice({
  name: "home",
  initialState: {
    replingCmt: {
      CmtID: null,
      CmtUserName: "",
      CmtUserId: "",
    },
    editingCmt: {},
    post: {},
    listLikeCmt: {
      isShowAlllikeModal: false,
      isLoad: true,
      listUsers: [],
    },
    listNotification: [],
    isLoadingAddCmt: false,
    likepost: false,
    listPosts: [],
    listComment: [],
    listRecommend: [],
    activePostId: "",
    isShowDetail: false,
    isShowReportModal: false,

    isLoading: false,
    isLoadCmt: false,
    loadListPostFail: false,
  },
  reducers: {
    ShowDetail: (state, action) => {
      state.isShowDetail = true;
      state.activePostId = action.payload;
    },
    HideDetailReducer: (state, action) => {
      state.isShowDetail = false;
      state.activePostId = "";
      state.post = {};
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
      state.listLikeCmt = {
        isShowAlllikeModal: false,
        listUsers: [],
      };
    },
    SetReplyCmd: (state, action) => {
      state.replingCmt.CmtID = action.payload.cmtId;
      state.replingCmt.CmtUserName = action.payload.userName;
      state.replingCmt.CmtUserId = action.payload.userId;
    },
    CancelReplyCmd: (state, action) => {
      state.replingCmt = {
        CmtID: null,
        CmtUserName: "",
        CmtUserId: "",
      };
    },

    editCmt: (state, action) => {
      state.editingCmt = action.payload;
    },
  },
  extraReducers: {
    //get all post when login successful
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.rejected]: (state) => {
      console.log("Lỗi không lấy được post");
      state.isLoading = false;
      state.loadListPostFail = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.listPosts = action.payload.posts;
      state.isLoading = false;
      state.loadListPostFail = false;
      console.log(action.payload);
    },
    //get all comment of post
    [getCommentsByPostID.pending]: (state, action) => {
      state.isLoadCmt = true;
    },
    [getCommentsByPostID.rejected]: (state, action) => {
      state.isLoadCmt = false;
    },
    [getCommentsByPostID.fulfilled]: (state, action) => {
      state.listComment = action.payload.cmts;
      state.isLoadCmt = false;
    },

    //handlelike
    [handleLike.pending]: (state, action) => {
      console.log("Đang like");
    },
    [handleLike.rejected]: (state, action) => {
      console.log("like thất bại");
    },
    [handleLike.fulfilled]: (state, action) => {
      const loginId = JSON.parse(localStorage.getItem("LoginUser"));
      const index = current(state).listPosts.find(
        (item) => item._id == action.payload
      );

      current(state).listPosts.forEach((item) => {
        if (item._id === index._id) {
          //  item.likes = [...item.likes, loginId._id];
          item.likes.push(loginId._id);
          console.log(item.likes);
        }
      });

      console.log(current(state).listPosts.likes);
    },

    //get list recommend frieds
    [getListRecommendFriends.pending]: (state, action) => {},
    [getListRecommendFriends.rejected]: (state, action) => {},
    [getListRecommendFriends.fulfilled]: (state, action) => {
      state.listRecommend = action.payload.relateUser;
    },

    //create comment
    [addNewComment.pending]: (state, action) => {
      state.isLoadingAddCmt = true;
    },
    [addNewComment.rejected]: (state, action) => {
      state.isLoadingAddCmt = false;
    },
    [addNewComment.fulfilled]: (state, action) => {
      state.isLoadingAddCmt = false;
      state.replingCmt = {
        CmtID: null,
        CmtUserName: "",
      };
      // state.listComment = action.payload.newComment;
    },

    [likeOrUnlikeCmt.pending]: (state, action) => {},
    [likeOrUnlikeCmt.rejected]: (state, action) => {},
    [likeOrUnlikeCmt.fulfilled]: (state, action) => {},

    //edit comment
    [editComment.pending]: (state, action) => {},
    [editComment.rejected]: (state, action) => {},
    [editComment.fulfilled]: (state, action) => {},

    [deleteComment.pending]: (state, action) => {},
    [deleteComment.rejected]: (state, action) => {
      console.log("xóa thất bại");
    },
    [deleteComment.fulfilled]: (state, action) => {
      console.log("Xóa thành công");
    },

    //unfollow
    //delete comment
    [unFollow.pending]: (state, action) => {},
    [unFollow.rejected]: (state, action) => {
      console.log("unfollow thất bại");
    },
    [unFollow.fulfilled]: (state, action) => {
      console.log("Unfollow thành công");
      state.isShowReportModal = false;
    },
    //get post by id

    [getPostById.pending]: (state, action) => {},
    [getPostById.rejected]: (state, action) => {},
    [getPostById.fulfilled]: (state, action) => {
      state.post = action.payload.post[0];
    },

    //get list notification
    [getNotification.pending]: (state, action) => {},
    [getNotification.rejected]: (state, action) => {},
    [getNotification.fulfilled]: (state, action) => {
      state.listNotification = action.payload.notifications;
    },

    //create notification
    [createNotification.pending]: (state, action) => {},
    [createNotification.rejected]: (state, action) => {},
    [createNotification.fulfilled]: (state, action) => {
      //state.listNotification = action.payload;
      console.log("Tạo notification thành công");
    },

    [follow.fulfilled]: (state, action) => {
      //state.isShowReportModal = false;
    },
    [getListUser.pending]: (state, action) => {
      state.listLikeCmt = {
        isShowAlllikeModal: true,
        isLoad: true,
        listUsers: [],
      };
    },
    [getListUser.fulfilled]: (state, action) => {
      state.listLikeCmt = {
        isShowAlllikeModal: true,
        listUsers: action.payload.users,
      };
    },

    [getListUser.fulfilled]: (state, action) => {
      state.listLikeCmt = {
        isShowAlllikeModal: true,
        isLoad: false,
        listUsers: action.payload.users,
      };
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
  editCmt,
} = actions;

export default HomeReducer;
