import {
  FavoriteBorderOutlined,
  SendOutlined,
  AddCommentOutlined,
  Favorite,
  BookmarkBorderOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { handleLike, handleUnLike, ShowDetail } from "../homeSlice";

const ReactIcon = ({ postId }) => {
  const { listPosts } = useSelector((state) => state.home);
  const { loginUser } = useSelector((state) => state.auth);

  //get list like of the post
  const activePost = listPosts.find((post) => post._id == postId);
  const likes = activePost.likes;

  const [isLike, setisLike] = useState(likes.includes(loginUser));

  const dispatch = useDispatch();

  //hàm xử lý show phần comment khi show tất cả phần comment
  const showDetail = (id) => {
    const action = ShowDetail(id);
    dispatch(action);
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
          <Favorite
            style={{ color: "#ed4956" }}
            onClick={() => HandleLikePost(postId)}
          />
        ) : (
          <FavoriteBorderOutlined onClick={() => HandleLikePost(postId)} />
        )}

        <AddCommentOutlined onClick={() => showDetail(postId)} />

        <SendOutlined />
      </Col>
      <Col md={3} style={{ textAlign: "right" }}>
        <BookmarkBorderOutlined />
      </Col>
    </Row>
  );
};

export default ReactIcon;
