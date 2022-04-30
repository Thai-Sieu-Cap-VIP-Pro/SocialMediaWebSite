import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import IMAGES from "../../../../assets/images/imageStore";

const UserSumary = ({ user }) => {
  return (
    <div className="sumary">
      <Row className="sumary_header">
        <Col md={3}>
          <img src={IMAGES.honme.jisoo} alt="" />
        </Col>
        <Col md={9}>{user.email}</Col>
      </Row>
      <Row className="sumary_breif">
        <Col>
          <p className="num">1000</p>
          <p>Bài viết</p>
        </Col>
        <Col>
          <p className="num">23</p>
          <p>Người theo dõi</p>
        </Col>
        <Col>
          <p>Đang theo dõi</p>
          <p className="num">30</p>
        </Col>
      </Row>
      <Row className="sumary_image">
        <Col>
          <img src={IMAGES.honme.jenni} alt="" />
        </Col>
        <Col>
          <img src={IMAGES.honme.jisoo} alt="" />
        </Col>
        <Col>
          <img src={IMAGES.honme.rose} alt="" />
        </Col>
      </Row>
      <Row className="sumary_button">
        <Button size="sm">Follow</Button>
      </Row>
    </div>
  );
};

export default UserSumary;
