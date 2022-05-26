import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes, useParams } from 'react-router-dom';
import Header from '../../../shareComponents/header/Header';
import ChatContent from '../components/ChatContent';
import DefaultContent from '../components/DefaultContent';
import ListChat from '../components/ListChat';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../../App';
import { getNotification } from '../../home/homeSlice';

const ChatPage = () => {
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    console.log(currentUser._id);
    const dispatch = useDispatch();
    useEffect(() => {
        socket.emit('joinMessenger', currentUser._id);
    }, [params]);

    useEffect(() => {
        document.title = 'Inbox • Chats';
    }, []);

    useEffect(async () => {
        let action2 = getNotification();
        await dispatch(action2).unwrap();
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
                        <ListChat
                            setIsOpenSetting={setIsOpenSetting}
                            isShowPopup={isShowPopup}
                            setIsShowPopup={setIsShowPopup}
                        />
                    </Col>
                    <Col md={{ span: 6 }} style={{ paddingRight: 0, paddingLeft: 0 }}>
                        {/* <DefaultContent /> */}
                        <Routes>
                            <Route index path="/" element={<DefaultContent />} />
                            <Route
                                path="/:id"
                                element={
                                    <ChatContent
                                        setIsOpenSetting={setIsOpenSetting}
                                        isOpenSetting={isOpenSetting}
                                        isShowPopup={isShowPopup}
                                        setIsShowPopup={setIsShowPopup}
                                    />
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
