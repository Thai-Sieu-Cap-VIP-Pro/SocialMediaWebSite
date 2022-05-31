import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { InsertEmoticonOutlined } from '@material-ui/icons';

import '../components/style.scss';

import UserProfile from '../components/UserProfile';
import Header from '../../../shareComponents/header/Header';

const UserPage = () => {
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
