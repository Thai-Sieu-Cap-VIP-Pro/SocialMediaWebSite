import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./common.scss";

const AccountItem = ({ user }) => {
  const current = JSON.parse(localStorage.getItem("LoginUser"));
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    current.following.forEach((item) => {
      if (item._id === user[0]._id) {
        setIsFollow(true);
      }
    });
  }, []);

  return (
    <Row className="accountItem">
      <Col md={{ span: 1 }}>
        <img src={user[0].avatar} alt="" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{user[0].name}</p>
          <p className="accountItem_name_realname">{user[0].email}</p>
        </div>
      </Col>
      {current._id == user[0]._id ? (
        <></>
      ) : (
        <Col md={{ span: 4 }}>
          <Button size="sm">{isFollow ? "Bỏ theo dõi" : "Theo dõi"}</Button>
        </Col>
      )}
    </Row>
  );
};

export default AccountItem;
