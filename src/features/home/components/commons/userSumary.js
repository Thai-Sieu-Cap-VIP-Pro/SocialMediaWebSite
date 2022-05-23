import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import IMAGES from "../../../../assets/images/imageStore";
import { follow } from "../../homeSlice";
import { socket } from "../../pages/homePage";

const UserSumary = ({ user }) => {
  const dispatch = useDispatch();
  const [IsFollow, setIsFollow] = useState(false);
  const current = JSON.parse(localStorage.getItem("LoginUser"));

  //hàm xử lý khi nhấn follow
  const handleFollow = (id) => {
    console.log(id);
    const action = follow(id);
    // dispatch(action);
    setIsFollow(true);

    let notification = {
      userId: id, // cái này là id của thằng cần gửi thông báo tới
      type: "3",
      senderName: current.name,
    };
    socket.emit("send_notificaton", notification);
  };
  return (
    <div className="sumary">
      <Row className="sumary_header">
        <Col md={3}>
          <img src={user.avatar} alt="" />
        </Col>
        <Col md={9}>{user.name}</Col>
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
        <Button size="sm" onClick={() => handleFollow(user._id)}>
          {IsFollow === true ? "UnFollow" : "Follow"}
        </Button>
      </Row>
    </div>
  );
};

export default UserSumary;
