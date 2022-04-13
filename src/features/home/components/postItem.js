import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./post.scss";
import IMAGES from "../../../assets/images/imageStore";
import { useDispatch } from "react-redux";
import { ShowDetail, ShowReportModal } from "../homeSlice";
import ReactIcon from "./reactIcon";
import AddComment from "./addComment";
import PostHeader from "./postHeader";

const PostItem = () => {
  const dispatch = useDispatch();

  //hàm xử lý show phần comment khi show tất cả phần comment
  const showDetail = () => {
    console.log("Vào hàm Show chi tiết comment");
    const action = ShowDetail();
    dispatch(action);
  };

  return (
    <Row className="postItem">
      <Col md={12} className="postItem__header">
        <PostHeader />
      </Col>
      <Col md={12} className="postItem__slide">
        <img src={IMAGES.avatar} alt="" />
      </Col>
      <Col className="postItem__react">
        <ReactIcon />
      </Col>

      <Col md={12} className="postItem__content">
        <div className="postItem__content__likes">123,457 lượt thích</div>
        <div className="postItem__content__caption">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
        </div>
        <div className="postItem__content__allCmt" onClick={showDetail}>
          Xem tất cả 100 bình luận
        </div>
        <div className="postItem__content__time">1 ngày trước</div>
      </Col>
      <Col md={12} style={{ padding: "0" }}>
        <AddComment />
      </Col>
    </Row>
  );
};

export default PostItem;
