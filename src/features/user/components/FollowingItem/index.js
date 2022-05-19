import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { unFollow } from '../../profileSlice';
import './styles.scss';

const FollowingItem = ({ user }) => {
    const {_id, name, avatar} = user
    const dispatch = useDispatch()

    const handleUnFollow = async () => {
        const action = unFollow(_id)
        await dispatch(action)
    }

  return (
    <Container>
      <Row className='flex justify-content-center align-items-center'>
        <Col sm={3}>
          <img className="avatar" src={avatar} alt="avatar" />
        </Col>
        <Col sm={6}>
          <p>{name}</p>
        </Col>
        <Col sm={3}>
          <Button onClick={handleUnFollow}>UnFollow</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FollowingItem;
