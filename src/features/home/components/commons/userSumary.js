import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../../App";
import IMAGES from "../../../../assets/images/imageStore";
import { getPostsByUserId } from "../../../user/profileSlice";
import { createNotification, follow } from "../../homeSlice";

const UserSumary = ({ user }) => {
  const { posts } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [IsFollow, setIsFollow] = useState(false);
  const current = JSON.parse(localStorage.getItem("LoginUser"));
  useEffect(async () => {
    //get list post by user id
    const action = getPostsByUserId(user._id);
    await dispatch(action);
  }, []);

  //hàm xử lý khi nhấn follow
  const handleFollow = (id) => {
    console.log("Dô hàm handle follow");
    let notification = {
      userId: id, // cái này là id của thằng cần gửi thông báo tới
      type: 3,
      senderName: current.name,
    };
    socket.emit("send_notificaton", notification);

    let paramsCreate = {
      receiver: id,
      notiType: 3,
      desId: current._id,
    };

    console.log("params của thông báo");
    console.log(paramsCreate);
    const actionCreateNoti = createNotification(paramsCreate);
    dispatch(actionCreateNoti);

    console.log(id);
    const action = follow(id);
    dispatch(action);
    setIsFollow(true);
  };

  return (
    <div className="sumary">
      <Row className="sumary_header">
        <Col md={3}>
          <img src={user.avatar} alt="" />
        </Col>
        <Col md={9} className="name">
          {user.name}
        </Col>
      </Row>
      <Row className="sumary_breif">
        <Col>
          <p className="num">{posts.length}</p>
          <p>Bài viết</p>
        </Col>
        <Col>
          <p className="num">{user.followers.length}</p>
          <p>Người theo dõi</p>
        </Col>
        <Col>
          <p>Đang theo dõi</p>
          <p className="num">{user.following.length}</p>
        </Col>
      </Row>
      <Row className="sumary_image">
        {posts.map((item, index) => {
          if (index < 3) {
            return (
              <Col>
                <img src={item.images[0]} alt="" />
              </Col>
            );
          }
        })}
      </Row>
      <Row className="sumary_button">
        <Button size="sm" onClick={() => handleFollow(user._id)}>
          {IsFollow === true ? "UnFollow" : "Follow"}
        </Button>
      </Row>
    </div>
  );
};

export default UserSumary;
