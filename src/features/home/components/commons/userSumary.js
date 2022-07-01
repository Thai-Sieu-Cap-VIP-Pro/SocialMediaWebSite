import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../../user/profileSlice";

const UserSumary = ({ user }) => {
  const { posts, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(async () => {
    //get list post by user id
    const action = getPostsByUserId(user._id);
    await dispatch(action).unwrap();
  }, []);

  //hàm xử lý khi nhấn follow

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
      <Row className="sumary_image text-center">
        {isLoading ? (
          <Spinner animation="grow" variant="success" />
        ) : (
          <>
            {posts.map((item, index) => {
              if (index < 3) {
                return (
                  <Col>
                    <img src={item.images[0]} alt="" />
                  </Col>
                );
              }
            })}
          </>
        )}
      </Row>
    </div>
  );
};

export default UserSumary;
