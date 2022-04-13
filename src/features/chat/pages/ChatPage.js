import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../../shareComponents/header/Header";
import ChatContent from "../components/ChatContent";
import ListChat from "../components/ListChat";

const ChatPage = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col
            md={{ span: 4, offset: 1 }}
            style={{ paddingRight: 0, paddingLeft: 0 }}
          >
            <ListChat />
          </Col>
          <Col md={{ span: 6 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
            <ChatContent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatPage;
