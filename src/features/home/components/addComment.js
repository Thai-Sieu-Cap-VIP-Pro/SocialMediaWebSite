import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { InsertEmoticonOutlined } from "@material-ui/icons";

const AddComment = () => {
  return (
    <Row className="addComment">
      <Col md={1}>
        <InsertEmoticonOutlined />
      </Col>
      <Col md={9}>
        <input type="text" placeholder="Thêm bình luận..."></input>
      </Col>
      <Col md={2}>
        <p style={{ textAlign: "right" }}>Đăng</p>
      </Col>
    </Row>
  );
};

export default AddComment;
