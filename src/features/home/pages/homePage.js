
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../../shareComponents/header/Header";
import Category from "../components/category";
import PostComment from "../components/postComment";
import PostItem from "../components/postItem";
import ReportModal from "../components/reportModal";

const HomePage = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Header></Header>
        </Row>
      </Container>
      <Container style={{ marginTop: "80px" }}>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </Col>
          <Col md={{ span: 4 }}>
            <Category />
          </Col>
        </Row>
        <PostComment></PostComment>
        <ReportModal />
      </Container>
    </>
  );

};

export default HomePage;
