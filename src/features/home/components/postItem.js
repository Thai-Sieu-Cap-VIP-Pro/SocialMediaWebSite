import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./post.scss";
import IMAGES from "../../../assets/images/imageStore";
import {
  faEllipsis,
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";

const PostItem = () => {
  const showClick = () => {
    console.log("Vợ my");
  };

  return (
    <Row className="postItem">
      <Col md={12} className="postItem__header">
        <Row>
          <Col md={1}>
            <img src={IMAGES.avatar} alt="" />
          </Col>
          <Col md={10}>
            <h6>Ngô Gia Thái</h6>
          </Col>
          <Col md={1}>
            <FontAwesomeIcon icon={faEllipsis} id="more" onClick={showClick} />
          </Col>
        </Row>
      </Col>
      <Col md={12} className="postItem__slide">
        <img src={IMAGES.avatar} alt="" />
      </Col>
      <Col md={12} className="postItem__react">
        <Row className="postItem__react__left">
          <Col md={{ span: 11 }}>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faPaperPlane} />
          </Col>
          <Col md={{ span: 1 }}>
            <FontAwesomeIcon icon={faBookmark} />
          </Col>
        </Row>
        <div className="postItem__react__right"></div>
      </Col>
      <Col md={12} className="postItem__content">
        <div className="postItem__content__likes">123,457 lượt thích</div>
        <div className="postItem__content__caption">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
        </div>
        <div className="postItem__content__allCmt">
          Xem tất cả 100 bình luận
        </div>
        <div className="postItem__content__time">1 ngày trước</div>
      </Col>
      <Col md={12} className="postItem__comment">
        <Row>
          <Col md={1}>
            <FontAwesomeIcon icon={faSmile} />
          </Col>
          <Col md={9}>
            <input type="text" placeholder="Thêm bình luận..."></input>
          </Col>
          <Col md={2}>
            <p>Đăng</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PostItem;
