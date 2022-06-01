import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { socket } from "../../../../App";
import { createNotification, follow, unFollow } from "../../homeSlice";
import "./common.scss";

const AccountItem = ({ user }) => {
  const dispatch = useDispatch();
  const current = JSON.parse(localStorage.getItem("LoginUser"));

  var isfollow = user[0].followers.includes(current._id);

  const [IsFollow, setIsFollow] = useState(isfollow);

  const handleFollow = async (id) => {
    console.log(id);
    if (IsFollow) {
      const action = unFollow(id);
      await dispatch(action).unwrap();
      setIsFollow(false);
    } else {
      const action1 = follow(id);
      await dispatch(action1).unwrap();
      setIsFollow(true);
      let notification = {
        postId: current._id,
        userId: user._id,
        type: 3,
        senderName: current.name,
        img: current.avatar,
      };
      socket.emit("send_notificaton", notification);
      let paramsCreate = {
        receiver: id,
        notiType: 3,
        desId: current._id,
      };
      const actionCreateNoti = createNotification(paramsCreate);
      await dispatch(actionCreateNoti).unwrap();
    }
  };

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
          <Button size="sm" onClick={() => handleFollow(user[0]._id)}>
            {IsFollow ? "Bỏ theo dõi" : "Theo dõi"}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default AccountItem;
