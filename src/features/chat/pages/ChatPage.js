import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../../shareComponents/header/Header";

const ChatPage = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container>
        <Row>
          <div className="">Đây là trang chat</div>
        </Row>
      </Container>
    </>
  );
};

export default ChatPage;
