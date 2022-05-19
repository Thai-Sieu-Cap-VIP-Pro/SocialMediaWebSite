import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { InsertEmoticonOutlined } from '@material-ui/icons';

import '../components/style.scss';

import UserProfile from '../components/UserProfile';
import UserPost from '../components/UserPost';

const UserPage = () => {
  return (
    <div className="">
      <UserProfile />
      <UserPost />
    </div>
  );
};

export default UserPage;
