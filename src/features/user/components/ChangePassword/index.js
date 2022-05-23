import React from 'react';

import Form from 'react-bootstrap/Form';
import { Row, Col, Container, Button } from 'react-bootstrap';

import './styles.scss'

const ChangePassword = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Container>
          <Row>
            <Col sm={3} className="text-right">
              <Form.Label>Old Password</Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                className="w-100"
                type="password"
                placeholder="Enter your old password"
              />
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Container>
          <Row>
            <Col sm={3} className="text-right">
              <Form.Label>New Password</Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                className="w-100"
                type="text"
                placeholder="Enter new password"
              />
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Container>
          <Row>
            <Col sm={3} className="text-right">
              <Form.Label>Confirm New Password</Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                className="w-100"
                type="text"
                placeholder="Confirm new password"
              />
            </Col>
          </Row>
        </Container>
      </Form.Group>
      <Button variant='primary' className='submit-btn' type='submit'>Save</Button>
    </Form>
  );
};

export default ChangePassword;
