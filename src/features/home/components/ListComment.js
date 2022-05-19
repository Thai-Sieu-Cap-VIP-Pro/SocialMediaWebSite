import React, { useEffect } from "react";
import CommentItem from "./commons/commentItem";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./postItem";
import { getCommentsByPostID } from "../homeSlice";

const ListComment = () => {
  const dispach = useDispatch();
  const { listComment, activePostId } = useSelector((state) => state.home);

  useEffect(async () => {
    socket.off("receive_message").on("receive_message", (data) => {
      console.log("Đang chạy vào hàm load tất cả cmt by id");

      try {
        const action1 = getCommentsByPostID(activePostId);
        dispach(action1);
      } catch (err) {
        console.log(err);
      }
    });
  }, [socket]);

  return (
    <>
      {listComment.map((commentItem) => {
        return <CommentItem key={commentItem._id} CmtItem={commentItem} />;
      })}
    </>
  );
};

export default ListComment;
