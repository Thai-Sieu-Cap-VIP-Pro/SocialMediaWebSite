import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { removeFollow } from '../../profileSlice';
import './styles.scss';

const FollowerItem = ({ user }) => {
  const { _id, name, avatar, email } = user;
  const dispatch = useDispatch();

  const authUserId = useSelector((state) => state.auth.current._id);
  const currentUserId = useSelector((state) => state.user.userInfo._id);

  const handleRemoveFollow = async () => {
    console.log(_id);
    const action = removeFollow(_id);
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
          <Button onClick={() => handleRemoveFollow()} size="sm">
            Remove
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default FollowerItem;
