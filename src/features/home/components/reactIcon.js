import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import {
  getCommentsByPostID,
  handleLike,
  handleUnLike,
  ShowDetail,
} from "../homeSlice";
import { socket } from "../../../App";
import { MdFavorite, MdOutlineAddComment } from "react-icons/md";
import { AiOutlineSend, AiOutlineShareAlt } from "react-icons/ai";

const ReactIcon = ({ postId }) => {
  const { listPosts } = useSelector((state) => state.home);
  const current = JSON.parse(localStorage.getItem("LoginUser"));

  //get list like of the post
  const activePost = listPosts.find((post) => post._id == postId);
  const likes = activePost.likes;

  const [isLike, setisLike] = useState(likes.includes(current._id));

  const dispatch = useDispatch();

  //hàm xử lý show phần comment khi show tất cả phần comment
  const showDetail = (a) => {
    const action1 = getCommentsByPostID(postId);
    dispatch(action1);

    const action = ShowDetail(postId);
    dispatch(action);

    const message = { room: a };
    socket.emit("joinRoom", message);
  };

  //hàm xử lý like hay không like bài post
  const HandleLikePost = async (id) => {
    if (isLike) {
      const action1 = handleUnLike(id);
      dispatch(action1);
    } else {
      const action1 = handleLike(id);
      dispatch(action1);

      // //xử lý phần hiển thị lên giao diện
      // console.log("sơn");

      // listPosts.map((post) =>
      // {
      //   // if (post._id == id)
      //   // {
      //   //   console.log(post.likes);
      //   //   // post.likes.push(loginUser);
      //   //   // console.log(post.likes);
      //   //   return post;
      //   // }
      //   //  else
      //   // {
      //   //   return post;
      //   // }
      // }
    }

    setisLike(!isLike);
  };

  return (
    <Row className="reactIcon">
      <Col md={9}>
        {isLike === true ? (
          <MdFavorite
            style={{ color: "#ed4956" }}
            onClick={() => HandleLikePost(postId)}
          />
        ) : (
          <MdFavoriteBorder onClick={() => HandleLikePost(postId)} />
        )}

        <MdOutlineAddComment onClick={() => showDetail(postId)} />

        <AiOutlineSend />
      </Col>
      <Col md={3} style={{ textAlign: "right" }}>
        <AiOutlineShareAlt />
      </Col>
    </Row>
  );
};

export default ReactIcon;
