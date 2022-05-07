import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import IMAGES from "../../../../assets/images/imageStore";
import "./common.scss";

const AccountItem = () => {
  return (
    <Row className="accountItem">
      <Col md={{ span: 1 }}>
        <img src={IMAGES.logo} alt="" />
      </Col>
      <Col md={{ span: 9 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">__giathai1505</p>
          <p className="accountItem_name_realname">Gia Thái</p>
        </div>
      </Col>
      <Col md={{ span: 2 }}>
        <Button size="sm">Follow</Button>
      </Col>
    </Row>
  );
};

export default AccountItem;
