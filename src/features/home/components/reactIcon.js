import {
  FavoriteBorderOutlined,
  SendOutlined,
  AddCommentOutlined,
  Favorite,
  BookmarkBorderOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { ShowDetail } from "../homeSlice";

const ReactIcon = () => {
  const [isLike, setisLike] = useState(false);

  const dispatch = useDispatch();

  //hàm xử lý show phần comment khi show tất cả phần comment
  const showDetail = () => {
    const action = ShowDetail();
    dispatch(action);
  };

  return (
    <Row className="reactIcon">
      <Col md={9}>
        {isLike === true ? (
          <Favorite
            style={{ color: "#ed4956" }}
            onClick={() => setisLike(!isLike)}
          />
        ) : (
          <FavoriteBorderOutlined onClick={() => setisLike(!isLike)} />
        )}

        <AddCommentOutlined onClick={showDetail} />

        <SendOutlined />
      </Col>
      <Col md={3} style={{ textAlign: "right" }}>
        <BookmarkBorderOutlined />
      </Col>
    </Row>
  );
};

export default ReactIcon;
