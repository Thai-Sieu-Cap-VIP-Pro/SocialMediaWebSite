import React, { useEffect } from "react";
import CommentItem from "./commons/commentItem";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./postItem";
import { getCommentsByPostID } from "../homeSlice";

const ListComment = () => {
  const dispach = useDispatch();
  const { listComment, activePostId } = useSelector((state) => state.home);
  console.log(activePostId);
  console.log(listComment);

  useEffect(async () => {
    console.log("chạy useeffect");
    socket.off("receiveCmt").on("receiveCmt", (data) => {
      console.log("Start");
      console.log(data);
      console.log("end");

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
