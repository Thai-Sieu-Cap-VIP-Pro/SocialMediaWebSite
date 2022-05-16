
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from '../../../shareComponents/header/Header';
import ChatContent from '../components/ChatContent';
import DefaultContent from '../components/DefaultContent';
import ListChat from '../components/ListChat';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';


export const socket = io.connect("http://localhost:3003");

const ChatPage = () => {

    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const currentUser = useSelector((state) => state.auth.current);
    useEffect(() => {
        socket.emit('joinMessenger', currentUser._id);
    }, []);
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
                        <ListChat setIsOpenSetting={setIsOpenSetting} />
                    </Col>
                    <Col md={{ span: 6 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
                        {/* <DefaultContent /> */}
                        <Routes>
                            <Route index path="/" element={<DefaultContent />} />
                            <Route
                                path="/:id"
                                element={
                                    <ChatContent setIsOpenSetting={setIsOpenSetting} isOpenSetting={isOpenSetting} />
                                }
                            />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </>
    );

};

export default ChatPage;
