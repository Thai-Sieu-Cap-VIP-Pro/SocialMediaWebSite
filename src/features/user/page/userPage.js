import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import "../components/style.scss";

import UserProfile from "../components/UserProfile";
import Header from "../../../shareComponents/header/Header";

const UserPage = () => {
  useEffect(() => {
    document.title = "Midori • Profile";
  });
  return (
    <>
      <Container fluid>
        <Row>
          <Header />
        </Row>
      </Container>
      <UserProfile />
    </>
  );
};

export default UserPage;
