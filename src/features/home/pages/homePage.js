import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Toast } from 'react-bootstrap';
import Header from '../../../shareComponents/header/Header';
import Category from '../components/category';
import PostItem from '../components/postItem';
import { useDispatch, useSelector } from 'react-redux';
import { getListRecommendFriends, getNotification, getPosts } from '../homeSlice';
import './homePage.scss';
import ErrorFetch from '../../../shareComponents/fetchfail/error';
import AlllikesPopup from '../components/commons/allLikesPopup';
import { socket } from '../../../App';
import HomeSkeleton from '../../../shareComponents/skeletonLoading/HomeSkeleton';

const HomePage = () => {
    const [showB, setShowB] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);

    const toggleShowB = () => setShowB(!showB);
    const current = JSON.parse(localStorage.getItem('LoginUser'));
    const dispatch = useDispatch();
    const { listPosts, isLoading, loadListPostFail } = useSelector((state) => state.home);

    useEffect(async () => {
        document.title = 'Midori';
        let action = getPosts();
        await dispatch(action).unwrap();

        let action2 = getNotification();
        await dispatch(action2).unwrap();

        let action1 = getListRecommendFriends();
        await dispatch(action1).unwrap();

        setRefresh(!refresh);

        socket.emit('joinNotificationRoom', current._id);
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Header></Header>
                </Row>
            </Container>
            <div className="toastMessage">
                <Toast onClose={toggleShowB} show={showB}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thông báo</strong>
                        <small>11s ago</small>
                    </Toast.Header>
                    <Toast.Body>Có ai đó mới comment bài viết của bạn</Toast.Body>
                </Toast>
            </div>
            <Container style={{ marginTop: '100px' }}>
                {loadListPostFail ? (
                    <Row>
                        <ErrorFetch />
                    </Row>
                ) : (
                    <Row>
                        {isLoading == true ? (
                            <HomeSkeleton />
                        ) : (
                            <>
                                <Col md={{ span: 7 }}>
                                    {listPosts.map((post) => {
                                        return (
                                            <PostItem
                                                key={post._id}
                                                postId={post._id}
                                                content={post}
                                                isShowPopup={isShowPopup}
                                                setIsShowPopup={setIsShowPopup}
                                            />
                                        );
                                    })}
                                </Col>
                                <Col md={{ span: 4, offset: 1 }}>
                                    <Category />
                                </Col>
                            </>
                        )}
                    </Row>
                )}
            </Container>
            <AlllikesPopup />
        </>
    );
};

export default HomePage;
