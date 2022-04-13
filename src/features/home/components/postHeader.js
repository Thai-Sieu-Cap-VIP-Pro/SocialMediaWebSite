import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import IMAGES from "../../../assets/images/imageStore";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { HideDetailReducer, ShowReportModal } from "../homeSlice";

const PostHeader = () => {
  const dispatch = useDispatch();

  const HideDetail = () => {
    console.log("HIde đi các popup");
    const action = HideDetailReducer();
    dispatch(action);
  };

  const showModal = () => {
    const action = ShowReportModal();
    dispatch(action);
  };

  return (
    <Row>
      <Col md={1}>
        <img src={IMAGES.avatar} alt="" />
      </Col>
      <Col md={10}>
        <h6>Ngô Gia Thái</h6>
      </Col>
      <Col md={1}>
        <FontAwesomeIcon icon={faEllipsis} id="more" onClick={showModal} />
      </Col>
    </Row>
  );
};

export default PostHeader;
