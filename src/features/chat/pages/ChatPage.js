import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from '../../../shareComponents/header/Header';
import ChatContent from '../components/ChatContent';
import DefaultContent from '../components/DefaultContent';
import ListChat from '../components/ListChat';
import io from 'socket.io-client';
import ChatSetting from '../components/ChatSetting';

export const socket = io.connect('http://localhost:3002');

const ChatPage = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Header></Header>
                </Row>
            </Container>
            <Container style={{ marginTop: '100px' }}>
                <Row>
                    <Col md={{ span: 4, offset: 1 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <ListChat />
                    </Col>
                    <Col md={{ span: 6 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
                        {/* <DefaultContent /> */}
                        <Routes>
                            <Route index path="/" element={<DefaultContent />} />
                            <Route path="/:id" element={<ChatContent />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatPage;
