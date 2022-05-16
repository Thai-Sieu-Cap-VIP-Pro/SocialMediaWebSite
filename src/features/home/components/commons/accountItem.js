import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import IMAGES from "../../../../assets/images/imageStore";
import "./common.scss";

const AccountItem = ({ user }) => {
  return (
    <Row className="accountItem">
      <Col md={{ span: 1 }}>
        <img src={user[0].avatar} alt="" />
      </Col>
      <Col md={{ span: 9 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{user[0].name}</p>
          <p className="accountItem_name_realname">{user[0].email}</p>
        </div>
      </Col>
      <Col md={{ span: 2 }}>
        <Button size="sm">Follow</Button>
      </Col>
    </Row>
  );
};

export default AccountItem;
