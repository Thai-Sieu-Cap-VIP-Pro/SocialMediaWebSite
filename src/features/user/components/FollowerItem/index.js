import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles.scss';

const FollowerItem = ({ user }) => {
  const {_id, name, avatar} = user
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
          <Button>Remove</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FollowerItem;
