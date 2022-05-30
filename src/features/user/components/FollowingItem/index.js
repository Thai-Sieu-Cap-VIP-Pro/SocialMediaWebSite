import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { unFollow } from '../../profileSlice';
import './styles.scss';

const FollowingItem = ({ user }) => {
  const { _id, name, avatar, email } = user;
  const dispatch = useDispatch();

  const authUserId = useSelector((state) => state.auth.current._id);
  const currentUserId = useSelector((state) => state.user.userInfo._id);

  const handleUnFollow = async () => {
    console.log(_id);
    const action = unFollow(_id);
    await dispatch(action);
  };

  return (
    <Row className="accountItem">
      <Col md={{ span: 1 }}>
        <img src={avatar} alt="" />
      </Col>
      <Col md={{ span: 7 }}>
        <div className="accountItem_name">
          <p className="accountItem_name_username">{name}</p>
          <p className="accountItem_name_realname">{email}</p>
        </div>
      </Col>
      <Col md={{ span: 4 }}>
        {authUserId === currentUserId && (
          <Button onClick={() => handleUnFollow} size="sm">
            UnFollow
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default FollowingItem;
