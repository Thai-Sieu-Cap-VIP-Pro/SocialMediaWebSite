import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../../shareComponents/header/Header';
import Category from '../components/category';
import PostItem from '../components/postItem';

const HomePage = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Header></Header>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 1 }}>
                        <PostItem />
                    </Col>
                    <Col md={{ span: 4 }}>
                        <Category />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
