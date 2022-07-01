import React, { useState } from "react";
import { Row, Col, Button, Toast } from "react-bootstrap";

const ErrToast = ({ message }) => {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <Row>
      <Col md={6} className="mb-2">
        <Button onClick={toggleShowA} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Thôn báo</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default ErrToast;
