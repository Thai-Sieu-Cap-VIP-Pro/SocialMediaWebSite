import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import "./post.scss";
import IMAGES from "../../../assets/images/imageStore";
import { useDispatch } from "react-redux";
import { getCommentsByPostID, ShowDetail } from "../homeSlice";
import ReactIcon from "./reactIcon";
import AddComment from "./addComment";
import PostHeader from "./postHeader";
import { format } from "timeago.js";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import io from "socket.io-client";
export const socket = io.connect("http://localhost:3002");

const PostItem = ({ postId, content }) => {
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

  return (
    <Row className="postItem">
      <Col md={12} className="postItem__header">
        <PostHeader postId={postId} postUser={content.user} />
      </Col>
      <Col md={12} className="postItem__slide">
        <Carousel
          prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
          nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}
        >
          {content.images.map((contenItem, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={contenItem}
                  alt="First slide"
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Col>
      <Col className="postItem__react">
        <ReactIcon postId={postId} />
      </Col>

      <Col md={12} className="postItem__content">
        <div className="postItem__content__likes">
          {content.likes.length} lượt thích
        </div>
        <div className="postItem__content__caption">{content.content}</div>
        <div
          className="postItem__content__allCmt"
          onClick={() => showDetail(postId)}
        >
          Xem tất cả 100 bình luận
        </div>
        <div className="postItem__content__time">
          {format(content.createdAt)}
        </div>
      </Col>
      <Col md={12} style={{ padding: "0" }}>
        <AddComment postId={postId} />
      </Col>
    </Row>
  );
};

export default PostItem;
