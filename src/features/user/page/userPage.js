import React from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import { Col, Container, Row } from "react-bootstrap";
import { InsertEmoticonOutlined } from "@material-ui/icons";

import '../components/style.scss'

import Header from '../../../shareComponents/header/Header';
import UserHeader from '../components/userHeader'
import Postnav from '../components/postNav'
import PostComment from '../../home/components/postComment';

const Userpage = () => {
  return (
    <div>
        <Container fluid>
            <Row>
                <Header></Header>
            </Row>
        </Container>
      


        <UserHeader />

        <Postnav />

        {/* <PostComment /> */}
  



        <footer> &copy;2022 from IE213.M22</footer>
    </div>
  )
}

export default Userpage