import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from '../../../shareComponents/header/Header';
import { getNotification, HideDetailEdit, HideDetailReducer } from '../../home/homeSlice';
import NewpostContent from '../components/newPostContent';
import NewpostHeader from '../components/newPostHeader';
import NewpostImage from '../components/newPostImage';
import './newpage.scss';

const NewPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const post = location.state?.post;
    const postImages = post?.images.map((item, index) => {
        return item.split('.')[item.split('.').length - 1] === 'mp4'
            ? {
                  url: item,
                  type: 'video',
              }
            : {
                  url: item,
                  type: 'image',
              };
    });

    const [listImg, setlistImg] = useState(postImages || []);
    const [valueInput, setValueInput] = useState(post?.content || '');

    useEffect(async () => {
        document.title = 'Midori • New Post';
        let action2 = getNotification();
        await dispatch(action2).unwrap();
        dispatch(HideDetailReducer());
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Header></Header>
                </Row>
            </Container>
            <Container style={{ marginTop: '115px' }}>
                <Row>
                    <Col md={{ span: 8, offset: 2 }} className="newWrapper">
                        <Row>
                            <NewpostHeader
                                listImg={listImg}
                                content={valueInput}
                                isUpdate={post ? true : false}
                                postId={post?._id}
                            />
                        </Row>
                        <Row>
                            <Col md={7} className="newImgWrapper">
                                <NewpostImage listImg={listImg} setlistImg={setlistImg} />
                            </Col>
                            <Col md={5}>
                                <NewpostContent valueInput={valueInput} setValueInput={setValueInput} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default NewPage;
